using AutoMapper;
using Net5_React_DiningTemplate.Application.Mapping;
using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Application.ViewModels
{
    public record RestaurantForListVM(int Id, string Name, string Address) : IMapFrom<Restaurant>
    {
        /// <summary>
        /// For AutoMapper
        /// </summary>
        private RestaurantForListVM(): this(0,"","") { }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Restaurant, RestaurantForListVM>();
        }
    }
}