using CoreLedger.Application.DTOs;
using CoreLedger.Application.Exceptions;
using CoreLedger.Application.Interfaces;
using CoreLedger.Domain.Entities;
using CoreLedger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore; // Transaction yönetimi için

namespace CoreLedger.Application.Services
{
    public class TransferService : ITransferService
    {
        private readonly IWalletRepository _walletRepo;

        // Dependency Injection ile Repository'yi alıyoruz.
        // ITransferService, IWalletRepository'ye bağımlı.
        public TransferService(IWalletRepository walletRepo)
        {
            _walletRepo = walletRepo;
        }

        public async Task<int> TransferFundsAsync(TransferRequestDto request)
        {
            // 1. Cüzdanları getir
            var fromWallet = await _walletRepo.GetByIdAsync(request.SenderWalletId);
            var toWallet = await _walletRepo.GetByIdAsync(request.ReceiverWalletId);

            if (fromWallet == null || toWallet == null)
            {
                // Gerçek projede daha detaylı hata yönetimi yapılır.
                throw new KeyNotFoundException("Gönderici veya alıcı cüzdan bulunamadı.");
            }
            
            // 2. Bakiye Kontrolü (İş Kuralı)
            if (fromWallet.Balance < request.Amount)
            {
                throw new InsufficientBalanceException(fromWallet.Id);
            }
            
            // 3. İşlemi Uygula (Atomik Mantık)
            
            // Önce gideni kaydet
            await _walletRepo.AddTransactionAsync(new WalletTransaction
            {
                FromWalletId = fromWallet.Id,
                ToWalletId = toWallet.Id,
                Amount = request.Amount * -1, // Giden para (-) olarak kaydedilir
                Description = request.Description,
                TransactionType = TransactionType.Transfer
            });
            fromWallet.Balance -= request.Amount;
            
            // Sonra geleni kaydet
            await _walletRepo.AddTransactionAsync(new WalletTransaction
            {
                FromWalletId = fromWallet.Id,
                ToWalletId = toWallet.Id,
                Amount = request.Amount, // Gelen para (+) olarak kaydedilir
                Description = request.Description,
                TransactionType = TransactionType.Transfer
            });
            toWallet.Balance += request.Amount;

            // 4. Concurrency (Çakışma) Yönetimi ile Kaydetme
            try
            {
                await _walletRepo.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Bir başkası bu cüzdanı biz işlem yaparken değiştirdiyse.
                // Mülakatlarda bu konuyu açman sana ek puan kazandırır.
                throw new InvalidOperationException("Transfer sırasında cüzdan verisi değiştirildi. Lütfen tekrar deneyin.");
            }

            return fromWallet.Id;
        }
    }
}
