using API.Controllers;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

[Route("api/payments")]
public class PaymentsController : BaseApiController
{

  
   [HttpPost("create-checkout-session")]
    public ActionResult CreateCheckoutSession([FromBody] PaymentRequestDto request)
    {
        // استخدم المبلغ كما هو (مضروب مسبقًا في ال Frontend)
        var amountInCents = request.Amount;

        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = new List<string> { "card" },
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = amountInCents, // المبلغ بالسنت
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = request.ProductName, // اسم المنتج الصحيح
                        },
                    },
                    Quantity = 1,
                },
            },
            Mode = "payment",
            SuccessUrl = $"http://localhost:3000/payment/payment-success?courseId={request.CourseId}&slotId={request.SlotId}",
            CancelUrl = "http://localhost:3000/payment/payment-cancel"
        };

        var service = new SessionService();
        Session session = service.Create(options);

        return Ok(new { sessionId = session.Id });
    }
}


