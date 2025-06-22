namespace API.DTOs;
public class CreateInstructorAvailableSlotDto
{
    public int CourseId { get; set; }
    public DateOnly Date { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
}