using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    public record CuisineType(int Id, string Name, string? CountryOfOrigin)
    {
        public virtual Dish Dish { get; set; }
    }
}
