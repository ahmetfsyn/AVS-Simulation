using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.EFCore.Config
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

            builder.HasIndex(m => m.SubscriberNo)
                       .IsUnique();

            // builder.HasData(
            //     new User { FirstName = "Ahmet", LastName = "Sayan", TCNo = "12312312311", Email = "ahmetsayan@gmail.com", UserName = "ahmetsayan@gmail.com", }
            // );



        }
    }
}
