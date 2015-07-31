using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuyStoreItem
    {
        public GroupBuyStoreItem()
        {
            this.SubItems = new List<GroupBuyStoreSubItem>();
        }

        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int StoreId { get; set; }
        public virtual GroupBuyStore GroupBuyStore { get; set; }
        public virtual ICollection<GroupBuyStoreSubItem> SubItems { get; set; }
    }
}
