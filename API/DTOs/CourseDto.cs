using System;

namespace API.DTOs;
public class CourseDto
{
    public required string  Title { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int Duration { get; set; }
    public int InstructorId { get; set; }
    public required string PictureUrl { get; set; }
    public required string VideoPreviewUrl { get; set; }
}

