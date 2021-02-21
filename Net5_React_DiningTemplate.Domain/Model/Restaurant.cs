using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    #nullable disable
    [Table("Restaurants", Schema = "dining")]
    public record Restaurant
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; }
        public string Address { get; set; }

        public Restaurant(string name, string address)
        {
            Name = name;
            Address = address;
        }

        public virtual ICollection<Dish> Dishes { get; set; }
        public virtual ICollection<RestaurantManager> Managers{ get; set; }
    }
}
