using CoreLedger.Application.DTOs;
using CoreLedger.Application.Exceptions;
using CoreLedger.Application.Interfaces;
using CoreLedger.Domain.Entities;
using CoreLedger.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoreLedger.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")] // Versiyonlama eklendi (Profesyonel yaklaşım)
    public class WalletsController : ControllerBase
    {
        private readonly ITransferService _transferService;
        private readonly IWalletRepository _walletRepository;

        // Servisleri Constructor Injection ile alıyoruz.
        public WalletsController(ITransferService transferService, IWalletRepository walletRepository)
        {
            _transferService = transferService;
            _walletRepository = walletRepository;
        }

        // POST /api/v1/wallets/initialize (Test için basit cüzdan oluşturucu)
        [HttpPost("initialize")]
        public async Task<IActionResult> InitializeWallet([FromQuery] string userId, [FromQuery] decimal initialBalance = 1000)
        {
            var newWallet = new Wallet 
            { 
                UserId = userId, 
                Balance = initialBalance, 
                Name = $"{userId}'s Wallet",
                Currency = "TRY", // Default currency
                CreatedAt = DateTime.UtcNow
            };
            
            // await _walletRepository.AddAsync(newWallet); 
            // await _walletRepository.SaveChangesAsync();

            // Pratik olması için şimdilik basit SaveChanges ile ilerliyoruz:
            // Assuming the repo has been updated to have AddAsync.
            await _walletRepository.AddAsync(newWallet);
            await _walletRepository.SaveChangesAsync(); 
            
            return CreatedAtAction(nameof(GetWallet), new { id = newWallet.Id }, newWallet);
        }

        // GET /api/v1/wallets/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWallet(int id)
        {
            var wallet = await _walletRepository.GetByIdAsync(id);
            if (wallet == null) return NotFound();
            return Ok(wallet);
        }

        // POST /api/v1/wallets/transfer
        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer([FromBody] TransferRequestDto request)
        {
            if (request.Amount <= 0)
            {
                return BadRequest("Transfer miktarı sıfırdan büyük olmalıdır.");
            }
            
            try
            {
                await _transferService.TransferFundsAsync(request);
                return Ok(new { message = "Transfer başarılı", senderId = request.SenderWalletId, receiverId = request.ReceiverWalletId });
            }
            catch (InsufficientBalanceException ex)
            {
                return BadRequest(ex.Message); // Custom Exception'dan gelen mesajı döndür.
            }
            catch (Exception ex)
            {
                // Tüm diğer hatalar için 500 dönülmeli
                return StatusCode(500, new { message = "Sunucu Hatası: " + ex.Message });
            }
        }
    }
}
