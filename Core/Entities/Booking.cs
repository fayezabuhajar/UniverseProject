namespace Core.Entities
{
    public class Booking : BaseEntity
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public int SlotId { get; set; }

        public string? MeetingLink { get; set; } // ✅ الحقل الجديد

        public DateTime BookedAt { get; set; } = DateTime.UtcNow;

        public Student? Student { get; set; }
        public Course? Course { get; set; }
        public InstructorAvailableSlot? Slot { get; set; }
    }
}
