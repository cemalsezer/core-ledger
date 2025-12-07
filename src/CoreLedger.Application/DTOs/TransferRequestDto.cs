namespace CoreLedger.Application.DTOs
{
    public class TransferRequestDto
    {
        public int SenderWalletId { get; set; }
        public int ReceiverWalletId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
