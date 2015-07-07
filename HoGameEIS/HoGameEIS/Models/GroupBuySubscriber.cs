using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuySubscriber
    {
        public int GroupBuySubscriberId { get; set; }
        public int EmployeeId { get; set; }
        public int Amount { get; set; }
        public int GroupBuySubItemId { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual GroupBuySubItem GroupBuySubItem { get; set; }
    }
}
