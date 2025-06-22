using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Infrastructure.Data;
using System.Security.Claims;
using API.DTOs;
using Microsoft.Data.SqlClient;

namespace API.Controllers
{



    public class BookingsController : BaseApiController
    {
        private readonly UniverseContext _context;

        public BookingsController(UniverseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CreateBooking([FromBody] BookingDto bookingDto)
        {
            var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (studentIdClaim == null)
                return Unauthorized("Student ID not found in token.");

            int studentId = int.Parse(studentIdClaim);

            using var transaction = await _context.Database.BeginTransactionAsync();

            // تحقق التكرار أولاً في قاعدة البيانات
            var existingBooking = await _context.Bookings
                .FirstOrDefaultAsync(b =>
                    b.StudentId == studentId &&
                    b.CourseId == bookingDto.CourseId &&
                    b.SlotId == bookingDto.SlotId);

            if (existingBooking != null)
            {
                // لو الحجز موجود، نرجع بيانات الحجز مباشرة كنجاح
                return Ok(new { existingBooking.Id, existingBooking.MeetingLink });
            }

            // جلب الـ slot والتأكد من عدم حجزه
            var slot = await _context.InstructorAvailableSlots
                .Where(s => s.Id == bookingDto.SlotId && !s.IsBooked)
                .FirstOrDefaultAsync();

            if (slot == null)
                return BadRequest("The selected slot is already booked or does not exist.");

            if (slot.CourseId != bookingDto.CourseId)
                return BadRequest("Slot does not belong to the selected course.");

            // توليد رابط الاجتماع
            string meetingLink = $"https://meet.jit.si/eduuni-{bookingDto.CourseId}-{bookingDto.SlotId}-{Guid.NewGuid().ToString().Substring(0, 6)}";

            var booking = new Booking
            {
                StudentId = studentId,
                CourseId = bookingDto.CourseId,
                SlotId = bookingDto.SlotId,
                BookedAt = DateTime.UtcNow,
                MeetingLink = meetingLink
            };

            slot.IsBooked = true;

            _context.Bookings.Add(booking);
            _context.InstructorAvailableSlots.Update(slot);

            var instructorId = slot.InstructorId;
            var course = await _context.Courses.FindAsync(bookingDto.CourseId);

            var notification = new Notification
            {
                InstructorId = instructorId,
                Message = $"A student has booked your course: {course?.Title}"
            };

            _context.Notifications.Add(notification);

            try
            {
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2601)
                {
                    // تكرار المفتاح الفريد، نرجع بيانات الحجز الموجود بدل الخطأ
                    var duplicateBooking = await _context.Bookings
                        .FirstOrDefaultAsync(b =>
                            b.StudentId == studentId &&
                            b.CourseId == bookingDto.CourseId &&
                            b.SlotId == bookingDto.SlotId);

                    if (duplicateBooking != null)
                        return Ok(new { duplicateBooking.Id, duplicateBooking.MeetingLink });

                    // لو لم نجد الحجز (نادراً)، نعيد رسالة عامة
                    return Ok(new { Message = "Booking already exists." });
                }
                else
                {
                    // خطأ آخر نعيده كما هو
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, new { booking.Id, booking.MeetingLink });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound("Booking not found.");

            // أعد تعيين حالة الحجز للـ Slot المرتبط (ليصبح متاحًا للحجز مجددًا)
            var slot = await _context.InstructorAvailableSlots.FindAsync(booking.SlotId);
            if (slot != null)
                slot.IsBooked = false;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Booking with ID {id} has been deleted successfully." });
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAllBookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.Course)
                .Include(b => b.Slot)
                .Include(b => b.Student)
                .OrderByDescending(b => b.BookedAt)
                .ToListAsync();

            var result = bookings.Select(b => new
            {
                BookingId = b.Id,
                StudentId = b.StudentId,
                StudentName = b.Student?.FirstName + b.Student?.LastName,
                CourseId = b.Course?.Id,
                CourseTitle = b.Course?.Title,
                Date = b.Slot?.Date.ToString("yyyy-MM-dd"),
                StartTime = b.Slot?.StartTime.ToString("hh\\:mm"),
                MeetingLink = b.MeetingLink,
                BookedAt = b.BookedAt.ToString("yyyy-MM-dd HH:mm")
            });

            return Ok(result);
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Slot)
                .Include(b => b.Course)
                .Include(b => b.Student)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (booking == null)
                return NotFound();

            return Ok(booking);
        }


        [HttpGet("my-bookings")]
        public async Task<ActionResult<List<Booking>>> GetMyBookings()
        {
            var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (studentIdClaim == null)
                return Unauthorized("Student ID not found in token.");

            int studentId = int.Parse(studentIdClaim);

            var bookings = await _context.Bookings
                .Include(b => b.Course)
                .Include(b => b.Slot) // مهم جدًا لجلب التاريخ والوقت
                .Where(b => b.StudentId == studentId)
                .ToListAsync();

            var result = bookings.Select(b => new
            {
                b.Id,
                b.MeetingLink,
                CourseId = b.Course?.Id,
                Title = b.Course?.Title,
                Description = b.Course?.Description,
                ImageUrl = b.Course?.PictureUrl, // تأكد أن هذا الحقل موجود
                // ⬅️ جلب التاريخ والوقت من Slot المرتبطة
                Date = b.Slot != null ? b.Slot.Date.ToString("yyyy-MM-dd") : null,
                StartTime = b.Slot != null ? b.Slot.StartTime.ToString("hh\\:mm") : null
            }

            );

            return Ok(result);
        }
        
        [HttpGet("{bookingId}/meeting-link")]
        public async Task<ActionResult<object>> GetMeetingLink(int bookingId)
        {
            var booking = await _context.Bookings
                .Where(b => b.Id == bookingId)
                .Select(b => new { b.MeetingLink })
                .FirstOrDefaultAsync();

            if (booking == null)
                return NotFound(new { message = "Booking not found." });

            return Ok(booking);
        }


    }

}
