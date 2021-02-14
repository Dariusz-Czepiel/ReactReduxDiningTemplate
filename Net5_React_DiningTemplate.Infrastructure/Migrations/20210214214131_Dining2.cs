using Microsoft.EntityFrameworkCore.Migrations;

namespace Net5_React_DiningTemplate.Infrastructure.Migrations
{
    public partial class Dining2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dining");

            migrationBuilder.RenameTable(
                name: "Restaurants",
                newName: "Restaurants",
                newSchema: "dining");

            migrationBuilder.RenameTable(
                name: "RestaurantManagers",
                newName: "RestaurantManagers",
                newSchema: "dining");

            migrationBuilder.RenameTable(
                name: "Dishes",
                newName: "Dishes",
                newSchema: "dining");

            migrationBuilder.RenameTable(
                name: "CuisineTypes",
                newName: "CuisineTypes",
                newSchema: "dining");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Restaurants",
                schema: "dining",
                newName: "Restaurants");

            migrationBuilder.RenameTable(
                name: "RestaurantManagers",
                schema: "dining",
                newName: "RestaurantManagers");

            migrationBuilder.RenameTable(
                name: "Dishes",
                schema: "dining",
                newName: "Dishes");

            migrationBuilder.RenameTable(
                name: "CuisineTypes",
                schema: "dining",
                newName: "CuisineTypes");
        }
    }
}
