using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    public enum MealType { Meat, Fish, Vegetarian, Vegan }

    public record Dish(int Id, string Name, decimal Price, MealType MealType)
    {
        public virtual CuisineType CuisineType { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
