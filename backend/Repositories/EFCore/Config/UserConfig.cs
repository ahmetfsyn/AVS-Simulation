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
                new User { FirstName = "Ahmet", LastName = "Sayan", Id = 1, TCNo = "12312312311" },
                new User { FirstName = "Ceyda", LastName = "Sayan", Id = 2, TCNo = "12312312312" },
                new User { FirstName = "Furkan", LastName = "Kara", Id = 3, TCNo = "12312312313" }

            );
        }
    }
}
