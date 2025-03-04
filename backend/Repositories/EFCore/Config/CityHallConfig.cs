using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.EFCore.Config
{
    public class CityHallConfig : IEntityTypeConfiguration<CityHall>
    {
        public void Configure(EntityTypeBuilder<CityHall> builder)
        {
            builder.HasData(
                new CityHall
                {
                    City = "Mersin",
                    CityHallName = "Tarsus Belediyesi",
                    Id = 1
                },
                new CityHall
                {
                    City = "Adana",
                    CityHallName = "Seyhan Belediyesi",
                    Id = 2
                }
            );

        }
    }
}
