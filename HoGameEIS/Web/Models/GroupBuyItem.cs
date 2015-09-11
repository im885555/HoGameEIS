using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public partial class GroupBuyItem
    {
        public GroupBuyItem()
        {
            
        }

        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string SubName { get; set; }
        public string GroupId { get; set; }
        public int Price { get; set; }
        public int GroupBuyId { get; set; }
        public virtual GroupBuy GroupBuy { get; set; }

        /*
        var x = new Stuff();
        db.Stuff.AddObject(x);
        db.SaveChanges();
        db.Entry(x).GetDatabaseValues();
        return x.ID;
        */
    }
}
