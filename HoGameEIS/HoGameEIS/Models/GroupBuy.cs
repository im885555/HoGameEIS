using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuy
    {
        public GroupBuy()
        {
            this.GroupBuyItems = new List<GroupBuyItem>();
            this.GroupBuyPaids = new List<GroupBuyPaid>();
        }

        public int GroupBuyId { get; set; }
        public string Description { get; set; }
        public System.DateTime StartTime { get; set; }
        public System.DateTime EndTime { get; set; }
        public virtual ICollection<GroupBuyItem> GroupBuyItems { get; set; }
        public virtual ICollection<GroupBuyPaid> GroupBuyPaids { get; set; }
    }
}
