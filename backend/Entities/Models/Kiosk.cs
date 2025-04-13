
namespace Entities.Models
{
    public class Kiosk
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = "AVS";
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public bool IsActive { get; set; } = false;
        public string CityHallId { get; set; }
        public CityHall CityHall { get; set; }


    }
}