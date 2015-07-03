namespace HoGameEIS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GroupBuyItems",
                c => new
                    {
                        GroupBuyItemId = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        SubItemName = c.String(),
                        Price = c.Int(nullable: false),
                        GroupBuyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyItemId)
                .ForeignKey("dbo.GroupBuys", t => t.GroupBuyId, cascadeDelete: true)
                .Index(t => t.GroupBuyId);
            
            CreateTable(
                "dbo.GroupBuyOrders",
                c => new
                    {
                        GroupBuyOrderId = c.Int(nullable: false, identity: true),
                        GroupBuyItemId = c.Int(nullable: false),
                        Subscriber = c.String(maxLength: 128),
                        Amount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyOrderId)
                .ForeignKey("dbo.Employees", t => t.Subscriber)
                .ForeignKey("dbo.GroupBuyItems", t => t.GroupBuyItemId, cascadeDelete: true)
                .Index(t => t.GroupBuyItemId)
                .Index(t => t.Subscriber);
            
            CreateTable(
                "dbo.GroupBuyPaids",
                c => new
                    {
                        GroupBuyPaidId = c.Int(nullable: false, identity: true),
                        payer = c.String(maxLength: 128),
                        Paid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyPaidId)
                .ForeignKey("dbo.Employees", t => t.payer)
                .Index(t => t.payer);
            
            CreateTable(
                "dbo.GroupBuyStoreItems",
                c => new
                    {
                        GroupBuyStoreItemId = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        SubItemName = c.String(),
                        Price = c.Int(nullable: false),
                        GroupBuyStoreId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyStoreItemId)
                .ForeignKey("dbo.GroupBuyStores", t => t.GroupBuyStoreId, cascadeDelete: true)
                .Index(t => t.GroupBuyStoreId);
            
            AddColumn("dbo.GroupBuyStores", "StoreName", c => c.String());
            DropColumn("dbo.GroupBuyStores", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.GroupBuyStores", "Name", c => c.String());
            DropForeignKey("dbo.GroupBuyStoreItems", "GroupBuyStoreId", "dbo.GroupBuyStores");
            DropForeignKey("dbo.GroupBuyPaids", "payer", "dbo.Employees");
            DropForeignKey("dbo.GroupBuyOrders", "GroupBuyItemId", "dbo.GroupBuyItems");
            DropForeignKey("dbo.GroupBuyOrders", "Subscriber", "dbo.Employees");
            DropForeignKey("dbo.GroupBuyItems", "GroupBuyId", "dbo.GroupBuys");
            DropIndex("dbo.GroupBuyStoreItems", new[] { "GroupBuyStoreId" });
            DropIndex("dbo.GroupBuyPaids", new[] { "payer" });
            DropIndex("dbo.GroupBuyOrders", new[] { "Subscriber" });
            DropIndex("dbo.GroupBuyOrders", new[] { "GroupBuyItemId" });
            DropIndex("dbo.GroupBuyItems", new[] { "GroupBuyId" });
            DropColumn("dbo.GroupBuyStores", "StoreName");
            DropTable("dbo.GroupBuyStoreItems");
            DropTable("dbo.GroupBuyPaids");
            DropTable("dbo.GroupBuyOrders");
            DropTable("dbo.GroupBuyItems");
        }
    }
}
