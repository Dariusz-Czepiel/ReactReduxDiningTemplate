using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    public record RestaurantManager(int Id, string FirstName, string LastName, int Age)
    {
        public virtual Restaurant Restaurant { get; set; }
    }
}
