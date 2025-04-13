
namespace Entities.Models
{
    public class WaterCompany
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Name { get; set; }
        public ICollection<Meter> Meters { get; set; } = new List<Meter>();
        public ICollection<CityHall_WaterCompany> CityHallWaterCompanies { get; set; } = new List<CityHall_WaterCompany>();


    }
}