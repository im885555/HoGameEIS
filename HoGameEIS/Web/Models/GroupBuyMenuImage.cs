using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public partial class GroupBuyMenuImage
    {
        [Key]
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        public int GroupBuyId { get; set; }
        public virtual GroupBuy GroupBuy { get; set; }
    }
}