using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    [Table("RestaurantManagers", Schema = "dining")]
    public record RestaurantManager(int Id, string FirstName, string LastName, int Age)
    {
        public virtual Restaurant Restaurant { get; set; }
    }
}
