namespace Services.Contracts
{
    // Serviceleri tutan interface. Bu interface ile diğer entity servicelerini yönetiriz.
    public interface IServiceManager
    {
        IUserService UserService { get; }
        ICityHallService CityHallService { get; }

    }
}