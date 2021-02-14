using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    public enum MealType { Meat, Fish, Vegetarian, Vegan }

    [Table("Dishes", Schema = "dining")]
    public record Dish(
        int Id,
        string Name,
        MealType MealType)
    {
        //annotations don't seem to work in positional records
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        public virtual CuisineType CuisineType { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
