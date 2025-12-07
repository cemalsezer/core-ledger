using CoreLedger.Application.DTOs;
using CoreLedger.Application.Exceptions;
using CoreLedger.Application.Interfaces;
using CoreLedger.Domain.Entities;
using CoreLedger.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoreLedger.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")] 
    public class WalletsController : ControllerBase
    {
        private readonly ITransferService _transferService;
        private readonly IWalletRepository _walletRepository;

       
        public WalletsController(ITransferService transferService, IWalletRepository walletRepository)
        {
            _transferService = transferService;
            _walletRepository = walletRepository;
        }

        
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
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InsufficientBalanceException ex)
            {
                return BadRequest(ex.Message); 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during transfer: {ex}"); // Log to console
                return StatusCode(500, new { message = "Sunucu Hatası: " + ex.Message });
            }
        }
    }
}
