using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public partial class GroupBuyStoreMenuImage
    {
        [Key]
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        public int StoreId { get; set; }
        public virtual GroupBuyStore GroupBuyStore { get; set; }
    }
}
