
namespace Repositories.Contracts
{

    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IWaterCardRepository WaterCard { get; }
        Task SaveAsync();


    }
}