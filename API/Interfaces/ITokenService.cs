using System;

namespace API.Interfaces;

public interface ITokenService
{
    string CreateStudentToken(Student student);
    string CreateInstructorToken(Instructor instructor);
}
