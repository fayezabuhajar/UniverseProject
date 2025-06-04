using Core.Entities;

namespace Core.Entities
{
    /// <summary>
    /// Represents an instructor who teaches courses and has a personal and professional profile.
    /// </summary>
    public class Instructor : BaseEntity
    {
        /// <summary>
        /// Gets or sets the first name of the instructor.
        /// </summary>
        public required string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the last name of the instructor.
        /// </summary>
        public required string LastName { get; set; }

        /// <summary>
        /// Gets or sets the unique username of the instructor.
        /// </summary>
        public required string UserName { get; set; }

        /// <summary>
        /// Gets or sets the email address of the instructor.
        /// </summary>
        public required string Email { get; set; }

        /// <summary>
        /// Gets or sets the hashed password of the instructor.
        /// </summary>
        public required byte[] PasswordHash { get; set; }

        /// <summary>
        /// Gets or sets the password salt used for hashing.
        /// </summary>
        public required byte[] PasswordSalt { get; set; }

        /// <summary>
        /// Gets or sets the date of birth of the instructor.
        /// </summary>
        public DateOnly DateOfBirth { get; set; }

        /// <summary>
        /// Gets or sets the gender of the instructor.
        /// </summary>
        public required string Gender { get; set; }

        /// <summary>
        /// Gets or sets a short biography about the instructor.
        /// </summary>
        public string? Bio { get; set; }

        /// <summary>
        /// Gets or sets the URL of the instructor's profile image.
        /// </summary>
        public string? ProfileImageUrl { get; set; }

        /// <summary>
        /// Gets or sets the university where the instructor studied or works.
        /// </summary>
        public required string University { get; set; }

        /// <summary>
        /// Gets or sets the field of specialization of the instructor.
        /// </summary>
        public required string Specialization { get; set; }

        /// <summary>
        /// Gets or sets the instructor's social media links (optionally stored as JSON).
        /// </summary>
        public string? SocialLinks { get; set; }

        /// <summary>
        /// Gets or sets the list of courses created or taught by the instructor.
        /// </summary>
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
