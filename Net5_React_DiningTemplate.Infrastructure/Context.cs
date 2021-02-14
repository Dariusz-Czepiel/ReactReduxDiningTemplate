using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Net5_React_DiningTemplate.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Infrastructure
{
    public class Context : ApplicationDbContext
    {
        public DbSet<CuisineType> CuisineTypes { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantManager> RestaurantManagers { get; set; }

        public Context(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);



            //builder.Entity<Restaurant>()
            //    .HasOne(a => a.CustomerContactInformation).WithOne(b => b.Customer)
            //    .HasForeignKey<CustomerContactInformation>(e => e.CustomerRef);

            //builder.Entity<ItemTag>()
            //    .HasKey(it => new { it.ItemId, it.TagId });

            //builder.Entity<ItemTag>()
            //    .HasOne<Item>(it => it.Item)
            //    .WithMany(i => i.ItemTags)
            //    .HasForeignKey(it => it.ItemId);

            //builder.Entity<ItemTag>()
            //    .HasOne<Tag>(it => it.Tag)
            //    .WithMany(i => i.ItemTags)
            //    .HasForeignKey(it => it.TagId);
        }
    }
}
