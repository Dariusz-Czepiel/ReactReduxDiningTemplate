﻿using Microsoft.Extensions.DependencyInjection;
using Net5_React_DiningTemplate.Application.Interfaces;
using Net5_React_DiningTemplate.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddTransient<IRestaurantManagementService, RestaurantManagementService>();

            return services;
        }
    }
}
