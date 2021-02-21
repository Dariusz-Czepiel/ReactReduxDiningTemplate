using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Interfaces
{
    public interface IRestaurantManagementRepository
    {
        IQueryable<Restaurant> GetAllRestaurants();
        int AddRestaurant(Restaurant restaurant);
        IQueryable<Dish> GetAllDishes();
        IQueryable<RestaurantManager> GetAllManagers();
        IQueryable<DiscountType> GetAllDiscountTypes();
    }
}
