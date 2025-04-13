using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class WaterCompany_WaterCard_CityHall_Kiosk_Meter_ModelsAreUpdatedV5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WaterCompanies_CityHalls_CityHallId",
                table: "WaterCompanies");

            migrationBuilder.DropIndex(
                name: "IX_WaterCompanies_CityHallId",
                table: "WaterCompanies");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a9d9b09b-acea-4963-a351-64b0d5717e95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b8b08198-c525-44cf-a2ae-bfc0118226d9");

            migrationBuilder.DropColumn(
                name: "CityHallId",
                table: "WaterCompanies");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "db4e4c3b-5b61-4bc9-beba-47878d593c00", "4cd6d497-deb3-4565-add3-f953d22cfb65", "Admin", "ADMIN" },
                    { "ffc662ab-8af5-4630-a61a-dc0c8c1cee1b", "cd5fc4cb-26ee-46be-a5d0-9bf7d75e2d83", "User", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "db4e4c3b-5b61-4bc9-beba-47878d593c00");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ffc662ab-8af5-4630-a61a-dc0c8c1cee1b");

            migrationBuilder.AddColumn<string>(
                name: "CityHallId",
                table: "WaterCompanies",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a9d9b09b-acea-4963-a351-64b0d5717e95", "a45222ce-30b4-4ae8-85e1-9cc7843f378c", "Admin", "ADMIN" },
                    { "b8b08198-c525-44cf-a2ae-bfc0118226d9", "70fb7659-a565-42c2-97be-d7eb94b48bb1", "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WaterCompanies_CityHallId",
                table: "WaterCompanies",
                column: "CityHallId");

            migrationBuilder.AddForeignKey(
                name: "FK_WaterCompanies_CityHalls_CityHallId",
                table: "WaterCompanies",
                column: "CityHallId",
                principalTable: "CityHalls",
                principalColumn: "Id");
        }
    }
}
