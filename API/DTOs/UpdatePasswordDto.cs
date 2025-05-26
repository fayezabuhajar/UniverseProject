using System;

namespace API.DTOs
{
    public class UpdatePasswordDto
    {
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
