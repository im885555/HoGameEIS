using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuyStoreSubItem
    {
        public int SubItemId { get; set; }
        public string SubItemName { get; set; }
        public int Price { get; set; }
        public int ItemId { get; set; }
        public virtual GroupBuyStoreItem GroupBuyStoreItem { get; set; }
    }
}
