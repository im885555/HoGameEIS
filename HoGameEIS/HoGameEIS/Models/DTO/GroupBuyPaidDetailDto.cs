using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HoGameEIS.Models.DTO
{
    public class GroupBuyPaidDetailDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int Payable { get; set; }
        public int Paid { get; set; }

        public virtual List<GroupBuySubscriberItemDto> SubscriberItems { get; set; }

}
    public class GroupBuySubscriberItemDto
    {
        public string ItemName { get; set; }
        public string SubItemName { get; set; }
        public int Amount { get; set; }
    }
}