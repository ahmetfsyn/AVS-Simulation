

namespace Entities.Exceptions
{
    public class KioskNotFoundException : NotFoundException
    {
        public KioskNotFoundException(string id) : base($"The Kiosk with id : {id} could not found.")
        {
        }
    }


}