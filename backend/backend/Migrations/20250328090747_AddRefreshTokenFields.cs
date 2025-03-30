using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddRefreshTokenFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "053d32b6-ccad-4567-a75e-85919623d925");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "72b345f5-d3f8-4b4d-b8ce-2ff3e1700a5b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "182f321b-a2d7-4503-80b9-93a80fa966c4");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "afe298a9-d3de-484c-bb0d-954fd1a221e8");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f20080f8-1386-4c99-9b2f-b612905d66b1");

            migrationBuilder.AlterColumn<string>(
                name: "TCNo",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "27a0f7fa-a806-4a76-9de7-f41091c4652e", "e2b93989-3135-4443-b375-0b589e0d8f0d", "Admin", "ADMIN" },
                    { "d155755e-33d7-4749-a83b-665711d06245", "79439b89-ed61-4ec4-ae30-0682d06e4f81", "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RefreshToken", "RefreshTokenExpiryTime", "SecurityStamp", "TCNo", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "1b6b8585-d2e2-4918-b3fe-b753324f9cd3", 0, "6901cdf4-3775-4756-8fb7-9a361de7d5d1", null, false, "Furkan", "Kara", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "3f8f0e26-a79a-4474-8f83-4a448317be02", "12312312313", false, null },
                    { "5c7a9a85-3151-4c88-88e6-62e9a0d35bde", 0, "31f06855-fa83-4587-9fc9-03de6d0a6156", null, false, "Ahmet", "Sayan", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "34962c4b-aeb9-4ade-822a-e8c377edfa4e", "12312312311", false, null },
                    { "f30322b5-ef03-412c-813f-617044ef8c77", 0, "4f7d2a48-3eb7-4f93-9361-4cd9393f7355", null, false, "Ceyda", "Sayan", false, null, null, null, null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "3eb09a69-29db-4a28-87f9-17961974c31b", "12312312312", false, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "27a0f7fa-a806-4a76-9de7-f41091c4652e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d155755e-33d7-4749-a83b-665711d06245");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1b6b8585-d2e2-4918-b3fe-b753324f9cd3");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5c7a9a85-3151-4c88-88e6-62e9a0d35bde");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f30322b5-ef03-412c-813f-617044ef8c77");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "TCNo",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "053d32b6-ccad-4567-a75e-85919623d925", "645e4103-b95f-481e-ab7e-35d616010de1", "Admin", "ADMIN" },
                    { "72b345f5-d3f8-4b4d-b8ce-2ff3e1700a5b", "fefdcc76-d5e9-4869-b67c-3354328bd8bd", "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TCNo", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "182f321b-a2d7-4503-80b9-93a80fa966c4", 0, "6a9544ec-056f-4b5e-ad76-12a3331bd4a8", null, false, "Ceyda", "Sayan", false, null, null, null, null, null, false, "645e0f2a-bb7e-4bc3-9417-6d5f930a0316", "12312312312", false, null },
                    { "afe298a9-d3de-484c-bb0d-954fd1a221e8", 0, "859c800b-2575-411a-a761-8eb04df5734a", null, false, "Ahmet", "Sayan", false, null, null, null, null, null, false, "06de496b-1066-45e7-8f77-cb4b1cb981a9", "12312312311", false, null },
                    { "f20080f8-1386-4c99-9b2f-b612905d66b1", 0, "cc31e4be-5cfd-49db-a263-aa15d3627114", null, false, "Furkan", "Kara", false, null, null, null, null, null, false, "264b78c1-0e7a-4f83-b46c-cd03be55e33c", "12312312313", false, null }
                });
        }
    }
}
