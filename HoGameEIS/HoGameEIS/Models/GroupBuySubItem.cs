using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HoGameEIS.Models
{
    public partial class GroupBuySubItem
    {
        public GroupBuySubItem()
        {
            this.GroupBuySubscribers = new List<GroupBuySubscriber>();
        }

        public int SubItemId { get; set; }
        public string SubItemName { get; set; }
        public int Price { get; set; }
        public int ItemId { get; set; }
        public virtual GroupBuyItem GroupBuyItem { get; set; }
        public virtual ICollection<GroupBuySubscriber> GroupBuySubscribers { get; set; }

        [NotMapped]
        public string Action { get; set; }
    }
}
