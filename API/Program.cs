
using API.Extensions;
using System.Text.Json.Serialization;
using Stripe;
using API.Helpers;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });



builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")  // React frontend addresses
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("ReactAppPolicy"); // Use the CORS policy

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
