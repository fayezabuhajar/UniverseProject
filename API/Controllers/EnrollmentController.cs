using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : BaseApiController
    {
        private readonly UniverseContext _context;

        public EnrollmentController(UniverseContext context)
        {
            _context = context;
        }

        // Get All Enrollments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetAllEnrollments()
        {
            var enrollments = await _context.Enrollments.ToListAsync();
            return Ok(enrollments);
        }

        // Create
        [HttpPost]
        public async Task<ActionResult<Enrollment>> CreateEnrollment(Enrollment enrollment)
        {
            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok(enrollment);
        }

        // Read
        [HttpGet("{id}")]
        public async Task<ActionResult<Enrollment>> GetEnrollment(int id)
        {
            var enrollment = await _context.Enrollments.FindAsync(id);

            if (enrollment == null)
            {
                return NotFound();
            }

            return Ok(enrollment);
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnrollment(int id, Enrollment updatedEnrollment)
        {
            var enrollment = await _context.Enrollments.FindAsync(id);

            if (enrollment == null)
            {
                return NotFound();
            }

            enrollment.StudentId = updatedEnrollment.StudentId;
            enrollment.CourseId = updatedEnrollment.CourseId;
            enrollment.EnrollmentDate = updatedEnrollment.EnrollmentDate;
            enrollment.Progress = updatedEnrollment.Progress;
            enrollment.IsCompleted = updatedEnrollment.IsCompleted;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnrollment(int id)
        {
            var enrollment = await _context.Enrollments.FindAsync(id);

            if (enrollment == null)
            {
                return NotFound();
            }

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
