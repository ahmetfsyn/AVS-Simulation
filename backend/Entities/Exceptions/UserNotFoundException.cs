namespace Entities.Exceptions;


public sealed class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string id) : base($"The user with id : {id} could not found.")
    {
    }
}