using Core.Entities;

public class Enrollment : BaseEntity
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public decimal Progress { get; set; } // نسبة التقدم
    public bool IsCompleted { get; set; }

    public Student? Student { get; set; }
    public Course? Course { get; set; }
}
