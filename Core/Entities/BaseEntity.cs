namespace Core.Entities;

public class BaseEntity
{
    public int Id { get; set; } // This Id property is the primary key for any inheriting entity.
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
