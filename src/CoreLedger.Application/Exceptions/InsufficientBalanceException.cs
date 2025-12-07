namespace CoreLedger.Application.Exceptions
{
    // Özel bir hata sınıfı, HTTP 400 Bad Request döndürmek için kullanılacak.
    public class InsufficientBalanceException : Exception
    {
        public InsufficientBalanceException(int walletId) 
            : base($"Cüzdan ID: {walletId} için bakiye yetersizdir.")
        {
        }
    }
}
