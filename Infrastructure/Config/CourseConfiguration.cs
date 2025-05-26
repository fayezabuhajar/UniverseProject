using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        // تحديد العلاقة One-to-Many بين Course و Instructor
        builder.HasOne(c => c.Instructor)
               .WithMany(i => i.Courses)
               .HasForeignKey(c => c.InstructorId)
               .OnDelete(DeleteBehavior.Cascade);

        // تحديد نوع الحقل Price لمنع فقدان الدقة
        builder.Property(c => c.Price)
               .HasColumnType("decimal(18,2)"); // يسمح بـ 18 رقمًا، 2 منها بعد الفاصلة العشرية
    }
}
