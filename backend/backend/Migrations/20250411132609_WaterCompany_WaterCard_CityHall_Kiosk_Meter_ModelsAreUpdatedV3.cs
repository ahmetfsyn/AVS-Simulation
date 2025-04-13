using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class WaterCompany_WaterCard_CityHall_Kiosk_Meter_ModelsAreUpdatedV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter");

            migrationBuilder.DropForeignKey(
                name: "FK_WaterCards_AspNetUsers_UserId",
                table: "WaterCards");

            migrationBuilder.DropIndex(
                name: "IX_WaterCards_UserId",
                table: "WaterCards");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "45938651-f387-4ab7-bb2d-0f500b5ced37");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a0e8c2fe-6f73-486e-b4ba-2833e9d3591b");

            migrationBuilder.DeleteData(
                table: "WaterCards",
                keyColumn: "Id",
                keyValue: "923680d8-365d-46a4-bf8f-b26572cb5353");

            migrationBuilder.AddColumn<string>(
                name: "CityHallId",
                table: "WaterCompany",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SubscriberNo",
                table: "Meter",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CityHall",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    MinCredit = table.Column<long>(type: "bigint", nullable: false),
                    MaxCredit = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CityHall", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kiosk",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<string>(type: "text", nullable: true),
                    Longitude = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CityHallId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kiosk", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kiosk_CityHall_CityHallId",
                        column: x => x.CityHallId,
                        principalTable: "CityHall",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "333c1811-deb7-4670-90a9-860ddb36e65b", "de3a63d4-79db-4633-bc13-8956fbe00d22", "User", "USER" },
                    { "a6e1600f-730a-421c-956e-5a217445fb74", "118d3953-ca5a-4b6b-83c8-725a0535366f", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WaterCompany_CityHallId",
                table: "WaterCompany",
                column: "CityHallId");

            migrationBuilder.CreateIndex(
                name: "IX_WaterCards_SubscriberNo",
                table: "WaterCards",
                column: "SubscriberNo");

            migrationBuilder.CreateIndex(
                name: "IX_Kiosk_CityHallId",
                table: "Kiosk",
                column: "CityHallId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter",
                column: "SubscriberNo",
                principalTable: "AspNetUsers",
                principalColumn: "SubscriberNo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WaterCards_AspNetUsers_SubscriberNo",
                table: "WaterCards",
                column: "SubscriberNo",
                principalTable: "AspNetUsers",
                principalColumn: "SubscriberNo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WaterCompany_CityHall_CityHallId",
                table: "WaterCompany",
                column: "CityHallId",
                principalTable: "CityHall",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter");

            migrationBuilder.DropForeignKey(
                name: "FK_WaterCards_AspNetUsers_SubscriberNo",
                table: "WaterCards");

            migrationBuilder.DropForeignKey(
                name: "FK_WaterCompany_CityHall_CityHallId",
                table: "WaterCompany");

            migrationBuilder.DropTable(
                name: "Kiosk");

            migrationBuilder.DropTable(
                name: "CityHall");

            migrationBuilder.DropIndex(
                name: "IX_WaterCompany_CityHallId",
                table: "WaterCompany");

            migrationBuilder.DropIndex(
                name: "IX_WaterCards_SubscriberNo",
                table: "WaterCards");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "333c1811-deb7-4670-90a9-860ddb36e65b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a6e1600f-730a-421c-956e-5a217445fb74");

            migrationBuilder.DropColumn(
                name: "CityHallId",
                table: "WaterCompany");

            migrationBuilder.AlterColumn<string>(
                name: "SubscriberNo",
                table: "Meter",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "45938651-f387-4ab7-bb2d-0f500b5ced37", "2e04e91c-2c87-435c-9367-226ce1d5b2f3", "Admin", "ADMIN" },
                    { "a0e8c2fe-6f73-486e-b4ba-2833e9d3591b", "61c8251d-c96f-4540-a1f0-53608b000bb9", "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "WaterCards",
                columns: new[] { "Id", "Credit", "MeterNo", "SubscriberNo", "UserId" },
                values: new object[] { "923680d8-365d-46a4-bf8f-b26572cb5353", 10, "1054805", "1234567", null });

            migrationBuilder.CreateIndex(
                name: "IX_WaterCards_UserId",
                table: "WaterCards",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter",
                column: "SubscriberNo",
                principalTable: "AspNetUsers",
                principalColumn: "SubscriberNo");

            migrationBuilder.AddForeignKey(
                name: "FK_WaterCards_AspNetUsers_UserId",
                table: "WaterCards",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
