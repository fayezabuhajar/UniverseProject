namespace Core.Entities
{
    /// <summary>
    /// Represents the base entity that provides common properties for all derived entities.
    /// </summary>
    public class BaseEntity
    {
        /// <summary>
        /// Gets or sets the primary key identifier for the entity.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the date and time the entity was created (in UTC).
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Gets or sets the date and time the entity was last updated (in UTC).
        /// </summary>
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
