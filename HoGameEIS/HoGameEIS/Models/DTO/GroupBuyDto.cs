using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HoGameEIS.Models.DTO
{
    public class GroupBuyDto
    {
        public int GroupBuyId { get; set; }
        public string Description { get; set; }
        public System.DateTime StartTime { get; set; }
        public System.DateTime EndTime { get; set; }

        public int Creator { get; set; }
        public string CreatorName { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string Status { get; set; }
    }
}