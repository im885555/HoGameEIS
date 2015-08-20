using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HoGameEIS.Models
{
    public partial class GroupBuySubscriber
    {
        public int SubscriberId { get; set; }
        public int EmployeeId { get; set; }
        public int Amount { get; set; }
        public int SubItemId { get; set; }

        public string SubscriberName { get; set; }

        public virtual GroupBuySubItem GroupBuySubItem { get; set; }
    }
}
