
namespace Repositories.Contracts
{

    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IWaterCardRepository WaterCard { get; }

        // void Save(); Async versiyonu varken gerek yok sync versiyonuna.
        Task SaveAsync();


    }
}