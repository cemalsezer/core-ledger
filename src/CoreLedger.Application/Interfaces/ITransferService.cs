using CoreLedger.Application.DTOs;

namespace CoreLedger.Application.Interfaces
{
    // Bu servis, finansal kuralları ve transaction yönetimini üstlenecek.
    public interface ITransferService
    {
        Task<int> TransferFundsAsync(TransferRequestDto request);
    }
}
