using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class WaterCompany_WaterCard_CityHall_Kiosk_Meter_ModelsAreUpdatedV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meter_AspNetUsers_UserId",
                table: "Meter");

            migrationBuilder.DropIndex(
                name: "IX_Meter_UserId",
                table: "Meter");

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

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Meter");

            migrationBuilder.AlterColumn<string>(
                name: "SubscriberNo",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_AspNetUsers_SubscriberNo",
                table: "AspNetUsers",
                column: "SubscriberNo");

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
                name: "IX_Meter_SubscriberNo",
                table: "Meter",
                column: "SubscriberNo");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_SubscriberNo",
                table: "AspNetUsers",
                column: "SubscriberNo",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter",
                column: "SubscriberNo",
                principalTable: "AspNetUsers",
                principalColumn: "SubscriberNo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter");

            migrationBuilder.DropIndex(
                name: "IX_Meter_SubscriberNo",
                table: "Meter");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_AspNetUsers_SubscriberNo",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_SubscriberNo",
                table: "AspNetUsers");

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
                name: "UserId",
                table: "Meter",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SubscriberNo",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Meter_AspNetUsers_UserId",
                table: "Meter",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
