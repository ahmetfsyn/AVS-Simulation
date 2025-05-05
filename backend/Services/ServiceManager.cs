
using Services.Contracts;

namespace Services
{
    // Service manager ata class
    public class ServiceManager : IServiceManager
    {

        private readonly IUserService _userService;
        private readonly IMeterService _meterService;
        private readonly IWaterCardService _waterCardService;
        private readonly IAuthenticationService _authenticationService;
        public readonly IWaterCompanyService _waterCompanyService;
        public readonly ICityHallService _cityHallService;
        public readonly IKioskService _kioskService;

        public ServiceManager(
            IUserService userService,
            IWaterCardService waterCardService,
            IMeterService meterService,
            IAuthenticationService authenticationService,
            IWaterCompanyService waterCompanyService,
            ICityHallService cityHallService,
            IKioskService kioskService)
        {
            _userService = userService;
            _waterCardService = waterCardService;
            _authenticationService = authenticationService;
            _meterService = meterService;
            _waterCompanyService = waterCompanyService;
            _cityHallService = cityHallService;
            _kioskService = kioskService;
        }

        public IUserService UserService => _userService;
        public IAuthenticationService AuthenticationService => _authenticationService;
        public IWaterCardService WaterCardService => _waterCardService;
        public IMeterService MeterService => _meterService;
        public ICityHallService CityHallService => _cityHallService;
        public IWaterCompanyService WaterCompanyService => _waterCompanyService;
        public IKioskService KioskService => _kioskService;

    }
}