using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class WaterCompany_WaterCard_CityHall_Kiosk_Meter_ModelsAreUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "521047f6-a878-4a77-a389-cae1f2cf746a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c8a1a34-8a9e-4985-88f5-c8bd94cb690d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6f78623c-db10-432b-ab2d-66a916203c65");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8b6da7d2-9d13-4197-84e3-81dde14d9311");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e1b64b19-0ef5-40ec-926d-26dc76c8fc6a");

            migrationBuilder.DeleteData(
                table: "WaterCards",
                keyColumn: "Id",
                keyValue: "f49fd629-d6b0-404f-93ba-14eeec31b253");

            migrationBuilder.AlterColumn<int>(
                name: "Credit",
                table: "WaterCards",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "WaterCompany",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterCompany", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meter",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    MeterNo = table.Column<string>(type: "text", nullable: true),
                    WaterCompanyId = table.Column<string>(type: "text", nullable: true),
                    SubscriberNo = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meter", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meter_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Meter_WaterCompany_WaterCompanyId",
                        column: x => x.WaterCompanyId,
                        principalTable: "WaterCompany",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b073bb08-3a0e-453b-9880-7c21376235e7", "a84f9c61-8ec7-4492-94f6-2a607681e0c2", "User", "USER" },
                    { "d494f088-0667-4f5f-93b9-b9b322fcecff", "1b74ba5b-fde3-44c6-af97-8729fb4f3247", "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "IsBanned", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RefreshToken", "RefreshTokenExpiryTime", "SecurityStamp", "SubscriberNo", "TCNo", "TwoFactorEnabled", "UserName" },
                values: new object[] { "34d14ec9-e992-48c9-aa10-642a7cef6839", 0, "bab1074f-2a6e-46f8-b9c9-12d0f8e2d3a3", "ahmetsayan@gmail.com", false, "Ahmet", false, "Sayan", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "8260fe4f-8062-490e-bdc0-8460b2ba0cf1", "1234567", "12312312311", false, "ahmetsayan@gmail.com" });

            migrationBuilder.InsertData(
                table: "WaterCards",
                columns: new[] { "Id", "Credit", "MeterNo", "SubscriberNo", "UserId" },
                values: new object[] { "bff80724-22b5-4e21-bd7b-e4e86b9faf06", 10, "1054805", "1234567", null });

            migrationBuilder.CreateIndex(
                name: "IX_Meter_UserId",
                table: "Meter",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Meter_WaterCompanyId",
                table: "Meter",
                column: "WaterCompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Meter");

            migrationBuilder.DropTable(
                name: "WaterCompany");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b073bb08-3a0e-453b-9880-7c21376235e7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d494f088-0667-4f5f-93b9-b9b322fcecff");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "34d14ec9-e992-48c9-aa10-642a7cef6839");

            migrationBuilder.DeleteData(
                table: "WaterCards",
                keyColumn: "Id",
                keyValue: "bff80724-22b5-4e21-bd7b-e4e86b9faf06");

            migrationBuilder.AlterColumn<int>(
                name: "Credit",
                table: "WaterCards",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "521047f6-a878-4a77-a389-cae1f2cf746a", "43aa9753-7681-4305-8ef0-e67f733e7f54", "Admin", "ADMIN" },
                    { "7c8a1a34-8a9e-4985-88f5-c8bd94cb690d", "029f1f43-da9d-425c-9762-f66616e84869", "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "IsBanned", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RefreshToken", "RefreshTokenExpiryTime", "SecurityStamp", "SubscriberNo", "TCNo", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "6f78623c-db10-432b-ab2d-66a916203c65", 0, "b8ed1114-3fec-4faa-9cb7-435b351b60e6", null, false, "Ceyda", false, "Sayan", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "26b8c706-04b5-4350-9894-bf63bbd839a9", "5438463", "12312312312", false, null },
                    { "8b6da7d2-9d13-4197-84e3-81dde14d9311", 0, "6b973304-c8a4-4876-9127-ad3b23b79fa4", null, false, "Furkan", false, "Kara", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "d14c303a-93f7-4d09-a387-4a7a639cd69e", "3086816", "12312312313", false, null },
                    { "e1b64b19-0ef5-40ec-926d-26dc76c8fc6a", 0, "243fd4f1-775d-4ea1-8a5f-dd2b2c91af20", null, false, "Ahmet", false, "Sayan", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "51db393d-abf8-4340-81d6-6d309ec16b45", "2138875", "12312312311", false, null }
                });

            migrationBuilder.InsertData(
                table: "WaterCards",
                columns: new[] { "Id", "Credit", "MeterNo", "SubscriberNo", "UserId" },
                values: new object[] { "f49fd629-d6b0-404f-93ba-14eeec31b253", 10, "1054805", "1234567", null });
        }
    }
}
