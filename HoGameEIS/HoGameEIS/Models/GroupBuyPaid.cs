using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuyPaid
    {
        public int PaidId { get; set; }
        public int EmployeeId { get; set; }
        public int Paid { get; set; }
        public int GroupBuyId { get; set; }

        public virtual GroupBuy GroupBuy { get; set; }
    }
}
