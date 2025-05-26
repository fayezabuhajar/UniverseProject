using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : BaseApiController
    {
        private readonly UniverseContext _context;

        public CourseController(UniverseContext context)
        {
            _context = context;
        }

        // Get All Courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            var courses = await _context.Courses.ToListAsync();
            return Ok(courses);
        }

        // Create
        [HttpPost("create")]
public async Task<ActionResult<CourseDto>> CreateCourse(CourseDto dto)
{
    var instructor = await _context.Instructors.FindAsync(dto.InstructorId);
    if (instructor == null) return BadRequest("Instructor not found.");

    var course = new Course
    {
        Title = dto.Title,
        Description = dto.Description,
        Price = dto.Price,
        Duration = dto.Duration,
        InstructorId = dto.InstructorId,
        PictureUrl = dto.PictureUrl,
        VideoPreviewUrl = dto.VideoPreviewUrl,
        IsPublished = false,
        EnrollmentCount = 0,
        Rating = 0
    };

    _context.Courses.Add(course);
    await _context.SaveChangesAsync();

    // 👇 نرجّع نسخة من dto بدل كائن Entity فيه علاقة دورية
    return Ok(dto);
}



        // Read
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, Course updatedCourse)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            course.Title = updatedCourse.Title;
            course.Description = updatedCourse.Description;
            course.Price = updatedCourse.Price;
            course.Duration = updatedCourse.Duration;
            course.InstructorId = updatedCourse.InstructorId;
            course.PictureUrl = updatedCourse.PictureUrl;
            course.VideoPreviewUrl = updatedCourse.VideoPreviewUrl;
            course.IsPublished = updatedCourse.IsPublished;
            course.EnrollmentCount = updatedCourse.EnrollmentCount;
            course.Rating = updatedCourse.Rating;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
