using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        // تحديد العلاقة بين Enrollment و Student
        builder.HasOne(e => e.Student)
               .WithMany(s => s.Enrollments)
               .HasForeignKey(e => e.StudentId)
               .OnDelete(DeleteBehavior.Cascade);

        // تحديد العلاقة بين Enrollment و Course
        builder.HasOne(e => e.Course)
               .WithMany(c => c.Enrollments)
               .HasForeignKey(e => e.CourseId)
               .OnDelete(DeleteBehavior.Cascade);

        // تحديد دقة الحقل Progress
        builder.Property(e => e.Progress)
               .HasColumnType("decimal(5,2)"); // 5 أرقام كحد أقصى، 2 بعد الفاصلة العشرية
    }
}
