using CoreLedger.Domain.Entities;
using CoreLedger.Domain.Interfaces;
using CoreLedger.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLedger.Infrastructure.Repositories
{
    public class WalletRepository : IWalletRepository
    {
        private readonly AppDbContext _context;

        // Dependency Injection ile DbContext'i alıyoruz
        public WalletRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Wallet> GetByIdAsync(int id)
        {
            // Cüzdanı bulamazsa null döner.
            return await _context.Wallets.FindAsync(id);
        }

        public async Task UpdateAsync(Wallet wallet)
        {
            // EF Core, değişikliği takip eder ama biz yine de açıkça belirtelim.
            _context.Wallets.Update(wallet);

            // Not: SaveChanges'i burada çağırmıyoruz, Transaction yönetimi için serviste çağıracağız.
            await Task.CompletedTask;
        }

        public async Task AddTransactionAsync(WalletTransaction transaction)
        {
            await _context.WalletTransactions.AddAsync(transaction);
        }

        public async Task AddAsync(Wallet wallet)
        {
            await _context.Wallets.AddAsync(wallet);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
