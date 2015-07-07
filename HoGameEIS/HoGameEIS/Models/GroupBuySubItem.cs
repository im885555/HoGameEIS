using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuySubItem
    {
        public GroupBuySubItem()
        {
            this.GroupBuySubscribers = new List<GroupBuySubscriber>();
        }

        public int GroupBuySubItemId { get; set; }
        public string SubItemName { get; set; }
        public int Price { get; set; }
        public int GroupBuyItemId { get; set; }
        public virtual GroupBuyItem GroupBuyItem { get; set; }
        public virtual ICollection<GroupBuySubscriber> GroupBuySubscribers { get; set; }
    }
}
