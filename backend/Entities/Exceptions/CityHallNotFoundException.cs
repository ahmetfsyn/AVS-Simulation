

namespace Entities.Exceptions
{
    public sealed class CityHallNotFoundException : NotFoundException
    {
        public CityHallNotFoundException(string id) : base($"The CityHall with id : {id} could not found.")
        {
        }
    }
}