namespace Entities.Exceptions
{

    public class FirstNameLengthOutOfRange : BadRequestException
    {
        public FirstNameLengthOutOfRange() : base("FirstName field must contain min 2 and max 50 characters")
        {
        }
    }
}