
namespace API.DTOs;

public class PaymentRequestDto
{
    public int Amount { get; set; }         // السعر بالسنت (مثلاً 1000 يعني 10.00 دولار)
        public required string ProductName { get; set; } // اسم المنتج الظاهر في الفاتورة
        public int CourseId { get; set; }       // معرف الدورة (لتمريره في رابط النجاح)
        public int SlotId { get; set; }         // معرف الفترة (لتمريره في رابط النجاح)
}
