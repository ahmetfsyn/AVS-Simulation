
namespace Entities.Models
{

    public class CityHall_WaterCompany
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string CityHallId { get; set; }
        public string WaterCompanyId { get; set; }
        public CityHall CityHall { get; set; }
        public WaterCompany WaterCompany { get; set; }


    }
}