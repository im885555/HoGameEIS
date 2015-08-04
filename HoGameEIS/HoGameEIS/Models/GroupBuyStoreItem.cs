using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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

        //[NotMapped]
        //public int SubItemId { get; set; }
        //[NotMapped]
        //public string SubItemName { get; set; }
        //[NotMapped]
        //public int Price { get; set; }

    }
}
