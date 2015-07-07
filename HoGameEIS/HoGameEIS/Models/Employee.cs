using System;
using System.Collections.Generic;

namespace HoGameEIS.Models
{
    public partial class Employee
    {
        public Employee()
        {
            this.GroupBuyPaids = new List<GroupBuyPaid>();
            this.GroupBuySubscribers = new List<GroupBuySubscriber>();
        }

        public string Email { get; set; }
        public string Address { get; set; }
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public virtual ICollection<GroupBuyPaid> GroupBuyPaids { get; set; }
        public virtual ICollection<GroupBuySubscriber> GroupBuySubscribers { get; set; }
    }
}
