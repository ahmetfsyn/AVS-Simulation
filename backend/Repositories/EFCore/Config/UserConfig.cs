using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.EFCore.Config
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(
                new User { FirstName = "Ahmet", LastName = "Sayan", TCNo = "12312312311" },
                new User { FirstName = "Ceyda", LastName = "Sayan", TCNo = "12312312312" },
                new User { FirstName = "Furkan", LastName = "Kara", TCNo = "12312312313" }

            );
        }
    }
}
