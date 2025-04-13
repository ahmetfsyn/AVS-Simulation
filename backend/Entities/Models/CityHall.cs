

namespace Entities.Models
{
    public class CityHall
    {
        public string? Id { get; set; } = Guid.NewGuid().ToString();
        public string? Name { get; set; }
        public uint MinCredit { get; set; } = 0;
        public uint MaxCredit { get; set; } = 1;
        public ICollection<CityHall_WaterCompany> CityHallWaterCompanies { get; set; } = new List<CityHall_WaterCompany>();
        public List<Kiosk> Kiosks { get; set; } = new List<Kiosk>();

    }
}
