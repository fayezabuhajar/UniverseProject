using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class UniverseContext : DbContext
    {
        public UniverseContext(DbContextOptions<UniverseContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<InstructorAvailableSlot> InstructorAvailableSlots { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Notification> Notifications { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CourseConfiguration).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(EnrollmentConfiguration).Assembly);

            modelBuilder.Entity<InstructorAvailableSlot>()
               .HasOne(s => s.Instructor)
               .WithMany()
               .HasForeignKey(s => s.InstructorId)
               .OnDelete(DeleteBehavior.Restrict); // لتفادي Multiple Cascade Paths

            modelBuilder.Entity<InstructorAvailableSlot>()
                .HasOne(s => s.Course)
                .WithMany()
                .HasForeignKey(s => s.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Student)
                .WithMany()
                .HasForeignKey(b => b.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Course)
                .WithMany()
                .HasForeignKey(b => b.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Slot)
                .WithMany(s => s.Bookings)
                .HasForeignKey(b => b.SlotId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        
        
    }

    
}
