using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    [Table("CuisineTypes", Schema = "dining")]
    public record CuisineType(int Id, string Name, string? CountryOfOrigin = null)
    {
        public virtual ICollection<Dish> Dishes { get; set; }
    }
}
