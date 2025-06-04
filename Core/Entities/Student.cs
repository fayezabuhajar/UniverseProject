using Core.Entities;

namespace Core.Entities
{
    /// <summary>
    /// Represents a student who can enroll in courses and access educational content.
    /// </summary>
    public class Student : BaseEntity
    {
        /// <summary>
        /// Gets or sets the first name of the student.
        /// </summary>
        public required string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the last name of the student.
        /// </summary>
        public required string LastName { get; set; }

        /// <summary>
        /// Gets or sets the username used for student login.
        /// </summary>
        public required string UserName { get; set; }

        /// <summary>
        /// Gets or sets the email address of the student.
        /// </summary>
        public required string Email { get; set; }

        /// <summary>
        /// Gets or sets the hashed password of the student.
        /// </summary>
        public required byte[] PasswordHash { get; set; }

        /// <summary>
        /// Gets or sets the salt used for hashing the student's password.
        /// </summary>
        public required byte[] PasswordSalt { get; set; }

        /// <summary>
        /// Gets or sets the date of birth of the student.
        /// </summary>
        public DateOnly DateOfBirth { get; set; }

        /// <summary>
        /// Gets or sets the gender of the student.
        /// </summary>
        public required string Gender { get; set; }

        /// <summary>
        /// Gets or sets a short biography of the student.
        /// </summary>
        public string? Bio { get; set; }

        /// <summary>
        /// Gets or sets the URL of the student's profile image.
        /// </summary>
        public string? ProfileImageUrl { get; set; }

        /// <summary>
        /// Gets or sets the university the student is affiliated with.
        /// </summary>
        public required string University { get; set; }

        /// <summary>
        /// Gets or sets the student's field of specialization.
        /// </summary>
        public required string Specialization { get; set; }

        /// <summary>
        /// Gets or sets the list of course enrollments associated with the student.
        /// </summary>
        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
