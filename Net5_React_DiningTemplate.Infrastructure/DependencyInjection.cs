using Microsoft.Extensions.DependencyInjection;
using Net5_React_DiningTemplate.Domain.Interfaces;
using Net5_React_DiningTemplate.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<IRestaurantManagementRepository, RestaurantManagementRepository>();

            return services;
        }
    }
}
