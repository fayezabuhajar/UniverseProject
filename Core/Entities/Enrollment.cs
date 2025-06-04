using Core.Entities;

namespace Core.Entities
{
    /// <summary>
    /// Represents a student's enrollment in a course, including enrollment date, progress, and completion status.
    /// </summary>
    public class Enrollment : BaseEntity
    {
        /// <summary>
        /// Gets or sets the ID of the student who enrolled in the course.
        /// </summary>
        public int StudentId { get; set; }

        /// <summary>
        /// Gets or sets the ID of the course in which the student is enrolled.
        /// </summary>
        public int CourseId { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the student enrolled in the course.
        /// </summary>
        public DateTime EnrollmentDate { get; set; }

        /// <summary>
        /// Gets or sets the student's progress in the course as a percentage.
        /// </summary>
        public decimal Progress { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the student has completed the course.
        /// </summary>
        public bool IsCompleted { get; set; }

        /// <summary>
        /// Gets or sets the student associated with this enrollment.
        /// </summary>
        public Student? Student { get; set; }

        /// <summary>
        /// Gets or sets the course associated with this enrollment.
        /// </summary>
        public Course? Course { get; set; }
    }
}
