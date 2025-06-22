namespace Core.Entities;

public class Notification : BaseEntity
{
    public int InstructorId { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
}
