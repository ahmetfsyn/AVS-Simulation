using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class WaterCompany_WaterCard_CityHall_Kiosk_Meter_ModelsAreUpdatedV4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kiosk_CityHall_CityHallId",
                table: "Kiosk");

            migrationBuilder.DropForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter");

            migrationBuilder.DropForeignKey(
                name: "FK_Meter_WaterCompany_WaterCompanyId",
                table: "Meter");

            migrationBuilder.DropForeignKey(
                name: "FK_WaterCompany_CityHall_CityHallId",
                table: "WaterCompany");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WaterCompany",
                table: "WaterCompany");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meter",
                table: "Meter");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CityHall",
                table: "CityHall");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "333c1811-deb7-4670-90a9-860ddb36e65b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a6e1600f-730a-421c-956e-5a217445fb74");

            migrationBuilder.RenameTable(
                name: "WaterCompany",
                newName: "WaterCompanies");

            migrationBuilder.RenameTable(
                name: "Meter",
                newName: "Meters");

            migrationBuilder.RenameTable(
                name: "CityHall",
                newName: "CityHalls");

            migrationBuilder.RenameIndex(
                name: "IX_WaterCompany_CityHallId",
                table: "WaterCompanies",
                newName: "IX_WaterCompanies_CityHallId");

            migrationBuilder.RenameIndex(
                name: "IX_Meter_WaterCompanyId",
                table: "Meters",
                newName: "IX_Meters_WaterCompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Meter_SubscriberNo",
                table: "Meters",
                newName: "IX_Meters_SubscriberNo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WaterCompanies",
                table: "WaterCompanies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meters",
                table: "Meters",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CityHalls",
                table: "CityHalls",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CityHallWaterCompanies",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    CityHallId = table.Column<string>(type: "text", nullable: false),
                    WaterCompanyId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CityHallWaterCompanies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CityHallWaterCompanies_CityHalls_CityHallId",
                        column: x => x.CityHallId,
                        principalTable: "CityHalls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CityHallWaterCompanies_WaterCompanies_WaterCompanyId",
                        column: x => x.WaterCompanyId,
                        principalTable: "WaterCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a9d9b09b-acea-4963-a351-64b0d5717e95", "a45222ce-30b4-4ae8-85e1-9cc7843f378c", "Admin", "ADMIN" },
                    { "b8b08198-c525-44cf-a2ae-bfc0118226d9", "70fb7659-a565-42c2-97be-d7eb94b48bb1", "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CityHallWaterCompanies_CityHallId",
                table: "CityHallWaterCompanies",
                column: "CityHallId");

            migrationBuilder.CreateIndex(
                name: "IX_CityHallWaterCompanies_WaterCompanyId",
                table: "CityHallWaterCompanies",
                column: "WaterCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kiosk_CityHalls_CityHallId",
                table: "Kiosk",
                column: "CityHallId",
                principalTable: "CityHalls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Meters_AspNetUsers_SubscriberNo",
                table: "Meters",
                column: "SubscriberNo",
                principalTable: "AspNetUsers",
                principalColumn: "SubscriberNo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Meters_WaterCompanies_WaterCompanyId",
                table: "Meters",
                column: "WaterCompanyId",
                principalTable: "WaterCompanies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WaterCompanies_CityHalls_CityHallId",
                table: "WaterCompanies",
                column: "CityHallId",
                principalTable: "CityHalls",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kiosk_CityHalls_CityHallId",
                table: "Kiosk");

            migrationBuilder.DropForeignKey(
                name: "FK_Meters_AspNetUsers_SubscriberNo",
                table: "Meters");

            migrationBuilder.DropForeignKey(
                name: "FK_Meters_WaterCompanies_WaterCompanyId",
                table: "Meters");

            migrationBuilder.DropForeignKey(
                name: "FK_WaterCompanies_CityHalls_CityHallId",
                table: "WaterCompanies");

            migrationBuilder.DropTable(
                name: "CityHallWaterCompanies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WaterCompanies",
                table: "WaterCompanies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meters",
                table: "Meters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CityHalls",
                table: "CityHalls");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a9d9b09b-acea-4963-a351-64b0d5717e95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b8b08198-c525-44cf-a2ae-bfc0118226d9");

            migrationBuilder.RenameTable(
                name: "WaterCompanies",
                newName: "WaterCompany");

            migrationBuilder.RenameTable(
                name: "Meters",
                newName: "Meter");

            migrationBuilder.RenameTable(
                name: "CityHalls",
                newName: "CityHall");

            migrationBuilder.RenameIndex(
                name: "IX_WaterCompanies_CityHallId",
                table: "WaterCompany",
                newName: "IX_WaterCompany_CityHallId");

            migrationBuilder.RenameIndex(
                name: "IX_Meters_WaterCompanyId",
                table: "Meter",
                newName: "IX_Meter_WaterCompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Meters_SubscriberNo",
                table: "Meter",
                newName: "IX_Meter_SubscriberNo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WaterCompany",
                table: "WaterCompany",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meter",
                table: "Meter",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CityHall",
                table: "CityHall",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "333c1811-deb7-4670-90a9-860ddb36e65b", "de3a63d4-79db-4633-bc13-8956fbe00d22", "User", "USER" },
                    { "a6e1600f-730a-421c-956e-5a217445fb74", "118d3953-ca5a-4b6b-83c8-725a0535366f", "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Kiosk_CityHall_CityHallId",
                table: "Kiosk",
                column: "CityHallId",
                principalTable: "CityHall",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Meter_AspNetUsers_SubscriberNo",
                table: "Meter",
                column: "SubscriberNo",
                principalTable: "AspNetUsers",
                principalColumn: "SubscriberNo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Meter_WaterCompany_WaterCompanyId",
                table: "Meter",
                column: "WaterCompanyId",
                principalTable: "WaterCompany",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WaterCompany_CityHall_CityHallId",
                table: "WaterCompany",
                column: "CityHallId",
                principalTable: "CityHall",
                principalColumn: "Id");
        }
    }
}
