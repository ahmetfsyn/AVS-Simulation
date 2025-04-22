
namespace Entities.Dtos
{
    public record UserDto
    {
        public string Id { get; init; }
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public string TCNo { get; init; }
        public string Email { get; init; }
        public string SubscriberNo { get; init; }
        public string PhoneNumber { get; init; }

    }
}