using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    [Table("Restaurants", Schema = "dining")]
    public record Restaurant(int Id, string Name, string Address)
    {
        /// <summary>
        /// For automapper
        /// </summary>
        private Restaurant() : this(0,"","") { }

        public virtual ICollection<Dish> Dishes { get; set; }
        public virtual ICollection<RestaurantManager> Managers{ get; set; }
    }
}
