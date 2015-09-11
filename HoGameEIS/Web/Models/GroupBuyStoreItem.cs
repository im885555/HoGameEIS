using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public partial class GroupBuyStoreItem
    {
        public GroupBuyStoreItem()
        {
           
        }
        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string SubName { get; set; }
        public string GroupId { get; set; }
        public int Price { get; set; }
        public int StoreId { get; set; }
        public virtual GroupBuyStore GroupBuyStore { get; set; }
   


    }
}
