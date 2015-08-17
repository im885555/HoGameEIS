using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HoGameEIS.Models
{
    public partial class GroupBuy
    {
        public GroupBuy()
        {
            this.GroupBuyItems = new List<GroupBuyItem>();
            this.GroupBuyPaids = new List<GroupBuyPaid>();
            this.GroupBuyMenuImages = new List<GroupBuyMenuImage>();
        }

        public int GroupBuyId { get; set; }
        public string Description { get; set; }
        public System.DateTime StartTime { get; set; }
        public System.DateTime EndTime { get; set; }
        public virtual ICollection<GroupBuyItem> GroupBuyItems { get; set; }
        public virtual ICollection<GroupBuyPaid> GroupBuyPaids { get; set; }
        public virtual ICollection<GroupBuyMenuImage> GroupBuyMenuImages { get; set; }

        public int Creator { get; set; }


        public int StoreId { get; set; }

    }
}
