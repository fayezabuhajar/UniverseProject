namespace API.DTOs;
public class InstructorAvailableSlotDto
{
    public int Id { get; set; }
    public int InstructorId { get; set; }
    public int CourseId { get; set; }
    public DateOnly Date { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public bool IsBooked { get; set; }
}