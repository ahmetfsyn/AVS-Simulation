namespace Services.Contracts
{
    // Serviceleri tutan interface. Bu interface ile diğer entity servicelerini yönetiriz.
    public interface IServiceManager
    {
        IUserService UserService { get; }
        IMeterService MeterService { get; }
        IWaterCardService WaterCardService { get; }
        IWaterCompanyService WaterCompanyService { get; }
        IAuthenticationService AuthenticationService { get; }


    }
}