
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class RepositoryManager : IRepositoryManager
    {

        private readonly RepositoryContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IMeterRepository _meterRepository;
        private readonly IWaterCardRepository _waterCardRepository;
        private readonly IWaterCompanyRepository _waterCompanyRepository;
        private readonly ICityHallRepository _cityHallRepository;
        private readonly IKioskRepository _kioskRepository;


        public RepositoryManager(RepositoryContext context, IUserRepository userRepository, IMeterRepository meterRepository, IWaterCardRepository waterCardRepository, IWaterCompanyRepository waterCompanyRepository, ICityHallRepository cityHallRepository, IKioskRepository kioskRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _meterRepository = meterRepository;
            _waterCardRepository = waterCardRepository;
            _waterCompanyRepository = waterCompanyRepository;
            _cityHallRepository = cityHallRepository;
            _kioskRepository = kioskRepository;
        }

        public IUserRepository User => _userRepository;
        public IWaterCardRepository WaterCard => _waterCardRepository;
        public IMeterRepository Meter => _meterRepository;
        public IWaterCompanyRepository WaterCompany => _waterCompanyRepository;
        public ICityHallRepository CityHall => _cityHallRepository;
        public IKioskRepository Kiosk => _kioskRepository;

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}