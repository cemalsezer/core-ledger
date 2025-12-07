using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLedger.Domain.Entities
{
    public class WalletTransaction : BaseEntity
    {
        public int FromWalletId { get; set; } 
        public int ToWalletId { get; set; }   
        public decimal Amount { get; set; }  
        public string Description { get; set; } 

        public TransactionType TransactionType { get; set; }
    }

    public enum TransactionType
    {
        Deposit = 1,   
        Withdraw = 2,  
        Transfer = 3   
    }
}
