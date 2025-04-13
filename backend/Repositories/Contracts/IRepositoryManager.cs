
namespace Repositories.Contracts
{

    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IWaterCardRepository WaterCard { get; }
        IMeterRepository Meter { get; }
        IWaterCompanyRepository WaterCompany { get; }
        Task SaveAsync();


    }
}