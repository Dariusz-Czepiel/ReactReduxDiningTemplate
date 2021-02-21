using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net5_React_DiningTemplate.Application.Interfaces;
using Net5_React_DiningTemplate.Application.ViewModels;
using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RestaurantManagementController : ControllerBase
    {
        private readonly IRestaurantManagementService _restaurantManagementService;

        public RestaurantManagementController(IRestaurantManagementService restaurantManagementService)
        {
            _restaurantManagementService = restaurantManagementService;
        }

        [Authorize]
        [HttpGet]
        public IEnumerable<RestaurantForListVM> GetRestaurants()
        {
            return _restaurantManagementService.GetAllRestaurants();
        }
        [HttpGet]
        public IEnumerable<RestaurantManager> GetManagers()
        {
            return _restaurantManagementService.GetAllRestaurantManagers();
        }
        [HttpGet]
        public IEnumerable<Dish> GetDishes()
        {
            return _restaurantManagementService.GetAllDishes();
        }
        [HttpGet]
        public IEnumerable<DiscountType> GetDiscountTypes()
        {
            return _restaurantManagementService.GetAllDiscountTypes();
        }

        //[Authorize]
        [HttpPost]
        public IActionResult AddRestaurant([FromForm]RestaurantForListVM newRestaurant)
        {
            int id = _restaurantManagementService.AddRestaurant(newRestaurant);
            return Ok(new {newId = id});
        }

        [HttpDelete]
        public void DeleteRestaurant([FromQuery]int id)
        {
            _restaurantManagementService.DeleteRestaurant(id);
        }

        [HttpPut]
        public void UpdateRestaurant([FromForm]RestaurantForListVM newRestaurant)
        {
            _restaurantManagementService.UpdateRestaurant(newRestaurant);
        }
    }
}
//choco upgrade chocolatey