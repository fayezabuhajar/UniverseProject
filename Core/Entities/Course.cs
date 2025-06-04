namespace Core.Entities
{
    /// <summary>
    /// Represents a course offered by an instructor, including its content, price, and status.
    /// </summary>
    public class Course : BaseEntity
    {
        /// <summary>
        /// Gets or sets the title of the course.
        /// </summary>
        public required string Title { get; set; }

        /// <summary>
        /// Gets or sets the detailed description of the course.
        /// </summary>
        public required string Description { get; set; }

        /// <summary>
        /// Gets or sets the price of the course.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Gets or sets the duration of the course in hours.
        /// </summary>
        public int Duration { get; set; }

        /// <summary>
        /// Gets or sets the foreign key of the instructor who created the course.
        /// </summary>
        public int InstructorId { get; set; }

        /// <summary>
        /// Gets or sets the URL of the course thumbnail or image.
        /// </summary>
        public required string PictureUrl { get; set; }

        /// <summary>
        /// Gets or sets the URL of the course's video preview.
        /// </summary>
        public required string VideoPreviewUrl { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the course is published and visible to students.
        /// </summary>
        public bool IsPublished { get; set; }

        /// <summary>
        /// Gets or sets the total number of students enrolled in the course.
        /// </summary>
        public int EnrollmentCount { get; set; }

        /// <summary>
        /// Gets or sets the average rating of the course given by students.
        /// </summary>
        public float Rating { get; set; }

        /// <summary>
        /// Gets or sets the instructor who owns the course.
        /// </summary>
        public Instructor? Instructor { get; set; }

        /// <summary>
        /// Gets or sets the list of enrollments associated with this course.
        /// </summary>
        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
