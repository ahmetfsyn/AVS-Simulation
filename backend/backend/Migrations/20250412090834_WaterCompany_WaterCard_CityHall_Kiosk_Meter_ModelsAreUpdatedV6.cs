using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class WaterCompany_WaterCard_CityHall_Kiosk_Meter_ModelsAreUpdatedV6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Address",
                table: "Meters",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "053f7be2-014c-47cb-9595-c2e0049d0839", "2b28602e-5e2c-4e52-867f-2d7119510c66", "Admin", "ADMIN" },
                    { "1d427053-655e-4746-a495-b5c63bb42cdc", "16fa73f6-46d6-4a71-8b96-9650189526c0", "User", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "053f7be2-014c-47cb-9595-c2e0049d0839");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1d427053-655e-4746-a495-b5c63bb42cdc");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Meters");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "db4e4c3b-5b61-4bc9-beba-47878d593c00", "4cd6d497-deb3-4565-add3-f953d22cfb65", "Admin", "ADMIN" },
                    { "ffc662ab-8af5-4630-a61a-dc0c8c1cee1b", "cd5fc4cb-26ee-46be-a5d0-9bf7d75e2d83", "User", "USER" }
                });
        }
    }
}
