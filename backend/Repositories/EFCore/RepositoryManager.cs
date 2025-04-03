
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class RepositoryManager : IRepositoryManager
    {

        private readonly RepositoryContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IWaterCardRepository _waterCardRepository;

        public RepositoryManager(RepositoryContext context, IUserRepository userRepository, IWaterCardRepository waterCardRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _waterCardRepository = waterCardRepository;
        }

        public IUserRepository User => _userRepository;
        public IWaterCardRepository WaterCard => _waterCardRepository;

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