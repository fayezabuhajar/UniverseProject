using System;

namespace API.DTOs;

public class RegisterDto
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public DateOnly DateOfBirth {get; set;}
    public required string Gender { get; set; }
    public string? Bio { get; set; } 
    public required string University { get; set; }
    public required string Specialization { get; set; }
}
