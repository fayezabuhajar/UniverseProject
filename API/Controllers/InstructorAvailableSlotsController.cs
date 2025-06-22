using API.Controllers;
using API.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/instructor/availableSlots")]
public class InstructorAvailableSlotsController : BaseApiController
{
    private readonly UniverseContext _context;

    public InstructorAvailableSlotsController(UniverseContext context)
    {
        _context = context;
    }

    // GET مع دعم Paging (pageNumber و pageSize)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstructorAvailableSlotDto>>> GetAvailableSlots(
        int pageNumber = 1, int pageSize = 10)
    {
        var instructorIdClaim = User.FindFirst("Id")?.Value;
        if (instructorIdClaim == null)
            return Unauthorized("Instructor ID not found in token");

        int instructorId = int.Parse(instructorIdClaim);

        var query = _context.InstructorAvailableSlots
            .Where(s => s.InstructorId == instructorId)
            .OrderBy(s => s.Date).ThenBy(s => s.StartTime)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize);

        var slots = await query.ToListAsync();

        var result = slots.Select(s => new InstructorAvailableSlotDto
        {
            Id = s.Id,
            InstructorId = s.InstructorId,
            CourseId = s.CourseId,
            Date = s.Date,
            StartTime = s.StartTime,
            EndTime = s.EndTime,
            IsBooked = s.IsBooked
        });

        return Ok(result);
    }

    

    // POST لإنشاء فترة متاحة جديدة
    [HttpPost]
    [Authorize(Roles = "Instructor")]
    public async Task<ActionResult<InstructorAvailableSlotDto>> CreateAvailableSlot(
        CreateInstructorAvailableSlotDto dto)
    {
        var instructorIdClaim = User.FindFirst("Id")?.Value;
        if (instructorIdClaim == null)
            return Unauthorized("Instructor ID not found in token");

        int instructorId = int.Parse(instructorIdClaim);

        if (dto.EndTime <= dto.StartTime)
            return BadRequest("EndTime must be after StartTime.");

        if (dto.Date < DateOnly.FromDateTime(DateTime.UtcNow))
            return BadRequest("Date cannot be in the past.");

        var slot = new InstructorAvailableSlot
        {
            InstructorId = instructorId,
            CourseId = dto.CourseId,
            Date = dto.Date,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            IsBooked = false
        };

        _context.InstructorAvailableSlots.Add(slot);
        await _context.SaveChangesAsync();

        var result = new InstructorAvailableSlotDto
        {
            Id = slot.Id,
            InstructorId = instructorId,
            CourseId = slot.CourseId,
            Date = slot.Date,
            StartTime = slot.StartTime,
            EndTime = slot.EndTime,
            IsBooked = slot.IsBooked
        };

        return CreatedAtAction(nameof(GetAvailableSlotById), new { id = slot.Id }, result);
    }

    // GET لفترة متاحة حسب الـ id
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetAvailableSlotById(int id)
    {
        var instructorIdClaim = User.FindFirst("Id")?.Value;
        if (instructorIdClaim == null)
            return Unauthorized("Instructor ID not found in token");

        int instructorId = int.Parse(instructorIdClaim);

        var slot = await _context.InstructorAvailableSlots
            .Include(s => s.Bookings) // ✅ إضافة هذا السطر مهم جدًا
            .FirstOrDefaultAsync(s => s.Id == id && s.InstructorId == instructorId);

        if (slot == null)
            return NotFound();

        var result = new
        {
            Id = slot.Id,
            InstructorId = slot.InstructorId,
            CourseId = slot.CourseId,
            Date = slot.Date,
            StartTime = slot.StartTime,
            EndTime = slot.EndTime,
            IsBooked = slot.IsBooked,
            Bookings = slot.Bookings.Select(b => new
            {
                b.Id,
                b.StudentId,
                b.MeetingLink,
                b.BookedAt
            })
        };

        return Ok(result);
    }

    [HttpGet("public/{courseId}")]
[AllowAnonymous]
public async Task<ActionResult<IEnumerable<InstructorAvailableSlotDto>>> GetPublicAvailableSlots(int courseId)
{
    var slots = await _context.InstructorAvailableSlots
        .Where(s => s.CourseId == courseId && !s.IsBooked)
        .OrderBy(s => s.Date)
        .ThenBy(s => s.StartTime)
        .ToListAsync();

    var result = slots.Select(s => new InstructorAvailableSlotDto
    {
        Id = s.Id,
        InstructorId = s.InstructorId,
        CourseId = s.CourseId,
        Date = s.Date,
        StartTime = s.StartTime,
        EndTime = s.EndTime,
        IsBooked = s.IsBooked
    });

    return Ok(result);
}






    // PUT لتحديث فترة متاحة
    [HttpPut("{id}")]
    [Authorize(Roles = "Instructor")]

    public async Task<IActionResult> UpdateAvailableSlot(int id, CreateInstructorAvailableSlotDto dto)
    {
        var instructorIdClaim = User.FindFirst("Id")?.Value;
        if (instructorIdClaim == null)
            return Unauthorized("Instructor ID not found in token");

        int instructorId = int.Parse(instructorIdClaim);

        var slot = await _context.InstructorAvailableSlots
            .FirstOrDefaultAsync(s => s.Id == id && s.InstructorId == instructorId);

        if (slot == null)
            return NotFound();

        if (dto.EndTime <= dto.StartTime)
            return BadRequest("EndTime must be after StartTime.");

        if (dto.Date < DateOnly.FromDateTime(DateTime.UtcNow))
            return BadRequest("Date cannot be in the past.");

        slot.CourseId = dto.CourseId;
        slot.Date = dto.Date;
        slot.StartTime = dto.StartTime;
        slot.EndTime = dto.EndTime;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE لفترة متاحة
    [HttpDelete("{id}")]
    [Authorize(Roles = "Instructor")]

    public async Task<IActionResult> DeleteAvailableSlot(int id)
    {
        var instructorIdClaim = User.FindFirst("Id")?.Value;
        if (instructorIdClaim == null)
            return Unauthorized("Instructor ID not found in token");

        int instructorId = int.Parse(instructorIdClaim);

        var slot = await _context.InstructorAvailableSlots
            .FirstOrDefaultAsync(s => s.Id == id && s.InstructorId == instructorId);

        if (slot == null)
            return NotFound();

        _context.InstructorAvailableSlots.Remove(slot);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
