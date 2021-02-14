using Net5_React_DiningTemplate.Application.Interfaces;
using Net5_React_DiningTemplate.Domain.Interfaces;
using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Application.Services
{
    public class RestaurantManagementService : IRestaurantManagementService
    {
        private IRestaurantManagementRepository _restaurantManagementRepo;

        public RestaurantManagementService(IRestaurantManagementRepository restaurantManagementRepository)
        {
            _restaurantManagementRepo = restaurantManagementRepository;
        }

        public IQueryable<Restaurant> GetAllRestaurants()
        {
            return _restaurantManagementRepo.GetAllRestaurants();
        }
    }
}
