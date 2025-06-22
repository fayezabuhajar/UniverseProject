namespace Core.Entities
{
    public class InstructorAvailableSlot : BaseEntity
    {
        public int InstructorId { get; set; }
        public int CourseId { get; set; }

        public DateOnly Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }

        public bool IsBooked { get; set; } = false;


        public Instructor? Instructor { get; set; }
        public Course? Course { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
