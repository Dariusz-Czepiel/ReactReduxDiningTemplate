using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Net5_React_DiningTemplate.Domain.Model;
using Net5_React_DiningTemplate.Domain.Model.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Net5_React_DiningTemplate.Infrastructure
{
    public class Context : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<CuisineType> CuisineTypes { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantManager> RestaurantManagers { get; set; }

        public Context(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            Initialize();
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

        //made it a task to not hinder loading which is long enough as it is
        public async Task Initialize()
        {
            //init roles
            if(Roles.ToList().Count  == 0)
            {
                Roles.Add(new Microsoft.AspNetCore.Identity.IdentityRole("Admin") { Id="Admin", NormalizedName = "ADMIN" });
                Roles.Add(new Microsoft.AspNetCore.Identity.IdentityRole("Manager") { Id = "Manager", NormalizedName = "MANAGER" });
                Roles.Add(new Microsoft.AspNetCore.Identity.IdentityRole("User") { Id = "User", NormalizedName = "USER" });
            }
            //init user roles
            if(UserRoles.ToList().Count < 3)
            {
                if(Users.Any(u => u.Email == "admin@email.com"))
                {
                    var adminUser = Users.First(u => u.Email == "admin@email.com");
                    var adminRole = Roles.First(r => r.Name == "Admin");
                    UserRoles.Add(new Microsoft.AspNetCore.Identity.IdentityUserRole<string> { UserId = adminUser.Id, RoleId = adminRole.Id });
                }
                if (Users.Any(u => u.Email == "manager@email.com"))
                {
                    var managerUser = Users.First(u => u.Email == "manager@email.com");
                    var managerRole = Roles.First(r => r.Name == "Manager");
                    UserRoles.Add(new Microsoft.AspNetCore.Identity.IdentityUserRole<string> { UserId = managerUser.Id, RoleId = managerRole.Id });
                }
                if (Users.Any(u => u.Email == "user@email.com"))
                {
                    var userUser = Users.First(u => u.Email == "user@email.com");
                    var userRole = Roles.First(r => r.Name == "User");
                    UserRoles.Add(new Microsoft.AspNetCore.Identity.IdentityUserRole<string> { UserId = userUser.Id, RoleId = userRole.Id });
                }
            }
            //init some restaurants
            if(Restaurants.ToList().Count < 3)
            {
                Restaurants.Add(new Restaurant(0, "Pizzeria Italiano", "Szlak 34 Kraków"));
                Restaurants.Add(new Restaurant(0, "Hong bao", "Chinatown 120 Chicago"));
                Restaurants.Add(new Restaurant(0, "Wiejskie smaczki", "Wiejska 3 Warszawa"));
            }
            //init some disches

            //can we init users from here?
            SaveChanges();
        }
    }
}
