using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HoGameEIS.Models
{
    public partial class GroupBuyStore
    {
        public GroupBuyStore()
        {
            this.GroupBuyStoreItems = new List<GroupBuyStoreItem>();
            this.GroupBuyStoreMenuImages = new List<GroupBuyStoreMenuImage>();
        }


        public int StoreId { get; set; }
        
        [Required]
        public string StoreName { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string Memo { get; set; }
        
        [Required]
        public string Category { get; set; }
        public virtual ICollection<GroupBuyStoreItem> GroupBuyStoreItems { get; set; }
        public virtual ICollection<GroupBuyStoreMenuImage> GroupBuyStoreMenuImages { get; set; }
    }
}
