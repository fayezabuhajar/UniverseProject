using System;
using API.Interfaces;
using API.Services;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
    IConfiguration config)
    {
        services.AddControllers();

        services.AddDbContext<UniverseContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();

        return services;
        }
}
