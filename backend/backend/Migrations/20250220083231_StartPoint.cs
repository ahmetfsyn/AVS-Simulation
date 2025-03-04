using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{

    // Migration, uygulamanın modelinde (sınıflarındaki) yapılan değişiklikleri veritabanına yansıtır.
    // Veritabanı şemasını yönetmek ve güncel tutmak için migration'lar kullanılır.
    // Up() metodu ile yapılan değişiklikler veritabanına uygulanır, Down() metodu ile yapılan değişiklikler geri alınabilir.
    public partial class StartPoint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    TCNo = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName", "TCNo" },
                values: new object[,]
                {
                    { 1, "Ahmet", "Sayan", "12312312311" },
                    { 2, "Ceyda", "Sayan", "12312312312" },
                    { 3, "Furkan", "Kara", "12312312313" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
