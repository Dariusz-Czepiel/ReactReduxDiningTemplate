using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Domain.Model
{
    [Table("DiscountTypes", Schema = "dining")]
    public record DiscountType(int Id, int? HourStart, int? HourEnd)
    {
        //use fluent adnotations instead so I can put Amount in record?
        [Column(TypeName ="decimal(4,2)")]
        public decimal Amount { get; set; }

        public virtual ICollection<Dish> Dishes { get; set; }
    }
}
