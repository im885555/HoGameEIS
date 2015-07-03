using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HoGameEIS.Models
{
    public class HoGameEISContext : DbContext 
    {
        public DbSet<Employee> Employees { get; set; }
        
        public DbSet<GroupBuyOrder> GroupBuyOrders { get; set; }
        public DbSet<GroupBuyPaid> GroupBuyPaids { get; set; }
        public DbSet<GroupBuyItem> GroupBuyItems { get; set; }
        public DbSet<GroupBuyStoreItem> GroupBuyStoreItems { get; set; }
        public DbSet<GroupBuyStore> GroupBuyStores { get; set; }
        public DbSet<GroupBuy> GroupBuys { get; set; }
       

        public HoGameEISContext()
            : base("name=DefaultConnection") 
        {
            base.Configuration.ProxyCreationEnabled = false;
        }
    }
}