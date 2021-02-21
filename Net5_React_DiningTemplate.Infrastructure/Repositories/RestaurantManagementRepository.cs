using Net5_React_DiningTemplate.Domain.Interfaces;
using Net5_React_DiningTemplate.Domain.Model;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Net5_React_DiningTemplate.Infrastructure.Repositories
{
    public class RestaurantManagementRepository : IRestaurantManagementRepository
    {
        private readonly Context _context;

        public RestaurantManagementRepository(Context context)
        {
            _context = context;
        }

        public int AddRestaurant(Restaurant restaurant)
        {
            _context.Restaurants.Add(restaurant);
            _context.SaveChanges();
            return restaurant.Id;
        }

        public Restaurant UpdateRestaurant(Restaurant rest)
        {
            //var res = _context.Entry(rest);
            //if (!_context.Restaurants.Local.Any(r => r.Id == rest.Id))
            //    res.State = EntityState.Modified;

            var res = _context.Restaurants.First(r => r.Id == rest.Id);

            res.Name = rest.Name;
            res.Address = rest.Address;

            _context.SaveChanges();
            return rest;
        }

        public void DeleteRestaurant(int id)
        {
            var rest = _context.Restaurants.First(r => r.Id == id);
            _context.Restaurants.Remove(rest);
            _context.SaveChanges();
        }

        public IQueryable<DiscountType> GetAllDiscountTypes()
        {
            return _context.DiscountTypes.AsNoTracking().AsQueryable();
        }

        public IQueryable<Dish> GetAllDishes()
        {
            return _context.Dishes.AsNoTracking().AsQueryable();
        }

        public IQueryable<RestaurantManager> GetAllManagers()
        {
            return _context.RestaurantManagers.AsNoTracking().AsQueryable();
        }

        public IQueryable<Restaurant> GetAllRestaurants()
        {
            return _context.Restaurants.AsNoTracking().AsQueryable();
        }

    }
}
