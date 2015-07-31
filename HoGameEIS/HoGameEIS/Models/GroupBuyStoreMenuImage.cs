using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class GroupBuyStoreMenuImage
    {
        public int GroupBuyStoreMenuImageId { get; set; }
        public string path { get; set; }
        public int StoreId { get; set; }
        public virtual GroupBuyStore GroupBuyStore { get; set; }
    }
}
