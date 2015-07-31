using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuyItem
    {
        public GroupBuyItem()
        {
            this.GroupBuySubItems = new List<GroupBuySubItem>();
        }

        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int GroupBuyId { get; set; }
        public virtual GroupBuy GroupBuy { get; set; }
        public virtual ICollection<GroupBuySubItem> GroupBuySubItems { get; set; }
    }
}
