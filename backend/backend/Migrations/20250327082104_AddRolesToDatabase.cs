using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddRolesToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "055d7394-570a-471b-8665-677d9ac1710f");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c06cb4da-dbad-4d7d-8e07-5873ad2925e6");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fd2dc7df-1023-4009-877d-bf4e448cb0e8");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TCNo", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "055d7394-570a-471b-8665-677d9ac1710f", 0, "4ce355dc-d31d-4d9a-8d1b-aa25f677d166", null, false, "Ceyda", "Sayan", false, null, null, null, null, null, false, "bd49d5c5-f96c-4883-bfa5-c3d6fb4778c3", "12312312312", false, null },
                    { "c06cb4da-dbad-4d7d-8e07-5873ad2925e6", 0, "49f237e1-05bc-4e29-95c5-3bf7accbbcf0", null, false, "Furkan", "Kara", false, null, null, null, null, null, false, "ad33b3ee-a3c0-4a8e-b98b-78838155792b", "12312312313", false, null },
                    { "fd2dc7df-1023-4009-877d-bf4e448cb0e8", 0, "a4e4a74a-1aee-46f6-85a6-3088ce7a5f49", null, false, "Ahmet", "Sayan", false, null, null, null, null, null, false, "957b7134-a02b-4b00-a48f-ef3e4af8f465", "12312312311", false, null }
                });
        }
    }
}
