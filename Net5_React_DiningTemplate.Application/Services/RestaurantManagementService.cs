using AutoMapper;
using Net5_React_DiningTemplate.Application.Interfaces;
using Net5_React_DiningTemplate.Application.ViewModels;
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
        private IMapper _mapper;

        public RestaurantManagementService(IRestaurantManagementRepository restaurantManagementRepository, IMapper mapper)
        {
            _restaurantManagementRepo = restaurantManagementRepository;
            _mapper = mapper;
        }

        public List<DiscountType> GetAllDiscountTypes()
        {
            return _restaurantManagementRepo.GetAllDiscountTypes().ToList();
        }

        public List<Dish> GetAllDishes()
        {
            return _restaurantManagementRepo.GetAllDishes().ToList();
        }

        public List<RestaurantManager> GetAllRestaurantManagers()
        {
            return _restaurantManagementRepo.GetAllManagers().ToList();
        }

        public List<RestaurantForListVM> GetAllRestaurants()
        {
            return _restaurantManagementRepo.GetAllRestaurants().Select(r => _mapper.Map<RestaurantForListVM>(r)).ToList();
        }
    }
}
