namespace Entities.Dtos
{
    public record CityHallDtoUpdate
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string CityHallName { get; set; }
        public CityHallDtoUpdate(int id, string city, string cityHallName)
        {
            Id = id;
            City = city;
            CityHallName = cityHallName;
        }

    }
}