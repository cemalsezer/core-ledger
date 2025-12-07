using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLedger.Domain.Entities
{
    public class Wallet : BaseEntity
    {
       
        public string UserId { get; set; }

        public string Name { get; set; } 

        public string Currency { get; set; } = "TRY";

        public decimal Balance { get; set; }


    }
}
