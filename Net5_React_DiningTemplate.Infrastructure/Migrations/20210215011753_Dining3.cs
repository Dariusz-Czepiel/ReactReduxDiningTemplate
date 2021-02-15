using Microsoft.EntityFrameworkCore.Migrations;

namespace Net5_React_DiningTemplate.Infrastructure.Migrations
{
    public partial class Dining3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DiscountTypeId",
                schema: "dining",
                table: "Dishes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DiscountTypes",
                schema: "dining",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HourStart = table.Column<int>(type: "int", nullable: true),
                    HourEnd = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(4,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_DiscountTypeId",
                schema: "dining",
                table: "Dishes",
                column: "DiscountTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_DiscountTypes_DiscountTypeId",
                schema: "dining",
                table: "Dishes",
                column: "DiscountTypeId",
                principalSchema: "dining",
                principalTable: "DiscountTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_DiscountTypes_DiscountTypeId",
                schema: "dining",
                table: "Dishes");

            migrationBuilder.DropTable(
                name: "DiscountTypes",
                schema: "dining");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_DiscountTypeId",
                schema: "dining",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "DiscountTypeId",
                schema: "dining",
                table: "Dishes");
        }
    }
}
