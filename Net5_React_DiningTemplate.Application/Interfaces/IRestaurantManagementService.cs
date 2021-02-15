﻿using Net5_React_DiningTemplate.Application.ViewModels;
using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Application.Interfaces
{
    public interface IRestaurantManagementService
    {
        List<RestaurantForListVM> GetAllRestaurants();
        List<Dish> GetAllDishes();
        List<DiscountType> GetAllDiscountTypes();
        List<RestaurantManager> GetAllRestaurantManagers();
    }
}
