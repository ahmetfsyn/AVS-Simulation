namespace Entities.Exceptions
{
    public sealed class CityHallNotFoundException : NotFoundException
    {
        public CityHallNotFoundException(int id) : base($"The city hall with id : {id} could not found.")
        {
        }
    }
}