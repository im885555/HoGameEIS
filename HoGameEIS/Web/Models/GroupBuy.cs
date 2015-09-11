using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public partial class GroupBuy
    {
        public GroupBuy()
        {
            this.GroupBuyItems = new List<GroupBuyItem>();
            this.GroupBuyPaids = new List<GroupBuyPaid>();
            this.GroupBuyMenuImages = new List<GroupBuyMenuImage>();
        }

        [Key]
        public int GroupBuyId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public System.DateTime StartTime { get; set; }
        [Required]
        public System.DateTime EndTime { get; set; }

        public virtual ICollection<GroupBuyItem> GroupBuyItems { get; set; }
        public virtual ICollection<GroupBuyPaid> GroupBuyPaids { get; set; }
        public virtual ICollection<GroupBuyMenuImage> GroupBuyMenuImages { get; set; }

        [Required]
        public int Creator { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string Memo { get; set; }

    }
}
