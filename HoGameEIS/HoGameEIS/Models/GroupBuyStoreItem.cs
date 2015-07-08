using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuyStoreItem
    {
        public GroupBuyStoreItem()
        {
            this.GroupBuyStoreSubItems = new List<GroupBuyStoreSubItem>();
        }

        public int GroupBuyStoreItemId { get; set; }
        public string ItemName { get; set; }
        public int GroupBuyStoreId { get; set; }
        public virtual GroupBuyStore GroupBuyStore { get; set; }
        public virtual ICollection<GroupBuyStoreSubItem> GroupBuyStoreSubItems { get; set; }
    }
}