using Net5_React_DiningTemplate.Domain.Interfaces;
using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Infrastructure.Repositories
{
    public class RestaurantManagementRepository : IRestaurantManagementRepository
    {
        private readonly Context _context;

        public RestaurantManagementRepository(Context context)
        {
            _context = context;
        }

        public IQueryable<Restaurant> GetAllRestaurants()
        {
            //should be to list to actually download data?
            return _context.Restaurants.AsQueryable();
        }
    }
}
