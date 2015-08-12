using System;
using System.Collections.Generic;


namespace HoGameEIS.Models
{
    public partial class GroupBuyMenuImage
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        public int GroupBuyId { get; set; }
        public virtual GroupBuy GroupBuy { get; set; }
    }
}