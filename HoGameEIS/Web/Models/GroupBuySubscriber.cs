using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public partial class GroupBuySubscriber
    {
        [Key]
        public int SubscriberId { get; set; }
        public int EmployeeId { get; set; }
        public int Amount { get; set; }
        public int ItemId { get; set; }

        public string SubscriberName { get; set; }

        public virtual GroupBuyItem GroupBuySubItem { get; set; }

    }
}
