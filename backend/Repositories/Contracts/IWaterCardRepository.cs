using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Repositories.EFCore;

namespace Repositories.Contracts
{
    public interface IWaterCardRepository : IRepositoryBase<WaterCard>
    {
        Task<WaterCard> GetWaterCardByIdAsync(string id, bool trackChanges);
        Task<IEnumerable<WaterCard>> GetWaterCardsByUserIdAsync(string userId, bool trackChanges);
        void UpdateWaterCard(WaterCard waterCard);
        void CreateWaterCard(WaterCard waterCard);
        void DeleteWaterCard(WaterCard waterCard);

    }
}