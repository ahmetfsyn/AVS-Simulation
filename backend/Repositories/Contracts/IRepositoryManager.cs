
namespace Repositories.Contracts
{

    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IWaterCardRepository WaterCard { get; }
        IMeterRepository Meter { get; }
        ICityHallRepository CityHall { get; }
        IWaterCompanyRepository WaterCompany { get; }
        Task SaveAsync();


    }
}