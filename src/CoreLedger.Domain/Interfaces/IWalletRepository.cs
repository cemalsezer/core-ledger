using CoreLedger.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLedger.Domain.Interfaces
{
    public interface IWalletRepository
    {
        Task<Wallet> GetByIdAsync(int id);

        Task UpdateAsync(Wallet wallet);

        Task AddTransactionAsync(WalletTransaction transaction);

        Task AddAsync(Wallet wallet);

        Task SaveChangesAsync();
    }
}
