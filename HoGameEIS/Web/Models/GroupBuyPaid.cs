using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public partial class GroupBuyPaid
    {
        [Key]
        public int PaidId { get; set; }
        public int EmployeeId { get; set; }
        public int Paid { get; set; }
        public int GroupBuyId { get; set; }

        public virtual GroupBuy GroupBuy { get; set; }
    }
}
