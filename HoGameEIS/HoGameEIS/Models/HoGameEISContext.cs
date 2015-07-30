using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using HoGameEIS.Models.Mapping;

namespace HoGameEIS.Models
{
    public partial class HoGameEISContext : DbContext
    {
        static HoGameEISContext()
        {
            Database.SetInitializer<HoGameEISContext>(null);
        }

        public HoGameEISContext()
            : base("Name=HoGameEISContext")
        {
            base.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<GroupBuyItem> GroupBuyItems { get; set; }
        public DbSet<GroupBuyPaid> GroupBuyPaids { get; set; }
        public DbSet<GroupBuy> GroupBuys { get; set; }
        public DbSet<GroupBuyStoreItem> GroupBuyStoreItems { get; set; }
        public DbSet<GroupBuyStoreMenuImage> GroupBuyStoreMenuImages { get; set; }
        public DbSet<GroupBuyStore> GroupBuyStores { get; set; }
        public DbSet<GroupBuyStoreSubItem> GroupBuyStoreSubItems { get; set; }
        public DbSet<GroupBuySubItem> GroupBuySubItems { get; set; }
        public DbSet<GroupBuySubscriber> GroupBuySubscribers { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new EmployeeMap());
            modelBuilder.Configurations.Add(new GroupBuyItemMap());
            modelBuilder.Configurations.Add(new GroupBuyPaidMap());
            modelBuilder.Configurations.Add(new GroupBuyMap());
            modelBuilder.Configurations.Add(new GroupBuyStoreItemMap());
            modelBuilder.Configurations.Add(new GroupBuyStoreMenuImageMap());
            modelBuilder.Configurations.Add(new GroupBuyStoreMap());
            modelBuilder.Configurations.Add(new GroupBuyStoreSubItemMap());
            modelBuilder.Configurations.Add(new GroupBuySubItemMap());
            modelBuilder.Configurations.Add(new GroupBuySubscriberMap());

        }
    }
}
