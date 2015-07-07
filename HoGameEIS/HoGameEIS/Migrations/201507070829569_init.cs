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
                        GroupBuyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyItemId)
                .ForeignKey("dbo.GroupBuys", t => t.GroupBuyId, cascadeDelete: true)
                .Index(t => t.GroupBuyId);
            
            CreateTable(
                "dbo.GroupBuys",
                c => new
                    {
                        GroupBuyId = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyId);
            
            CreateTable(
                "dbo.GroupBuyPaids",
                c => new
                    {
                        GroupBuyPaidId = c.Int(nullable: false, identity: true),
                        EmployeeId = c.Int(nullable: false),
                        Paid = c.Int(nullable: false),
                        GroupBuyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyPaidId)
                .ForeignKey("dbo.Employees", t => t.EmployeeId, cascadeDelete: true)
                .ForeignKey("dbo.GroupBuys", t => t.GroupBuyId, cascadeDelete: true)
                .Index(t => t.EmployeeId)
                .Index(t => t.GroupBuyId);
            
            CreateTable(
                "dbo.GroupBuySubItems",
                c => new
                    {
                        GroupBuySubItemId = c.Int(nullable: false, identity: true),
                        SubItemName = c.String(),
                        Price = c.Int(nullable: false),
                        GroupBuyItemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuySubItemId)
                .ForeignKey("dbo.GroupBuyItems", t => t.GroupBuyItemId, cascadeDelete: true)
                .Index(t => t.GroupBuyItemId);
            
            CreateTable(
                "dbo.GroupBuySubscribers",
                c => new
                    {
                        GroupBuySubscriberId = c.Int(nullable: false, identity: true),
                        EmployeeId = c.Int(nullable: false),
                        Amount = c.Int(nullable: false),
                        GroupBuySubItemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuySubscriberId)
                .ForeignKey("dbo.Employees", t => t.EmployeeId, cascadeDelete: true)
                .ForeignKey("dbo.GroupBuySubItems", t => t.GroupBuySubItemId, cascadeDelete: true)
                .Index(t => t.EmployeeId)
                .Index(t => t.GroupBuySubItemId);
            
            CreateTable(
                "dbo.GroupBuyStoreItems",
                c => new
                    {
                        GroupBuyStoreItemId = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        GroupBuyStoreId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyStoreItemId)
                .ForeignKey("dbo.GroupBuyStores", t => t.GroupBuyStoreId, cascadeDelete: true)
                .Index(t => t.GroupBuyStoreId);
            
            CreateTable(
                "dbo.GroupBuyStores",
                c => new
                    {
                        GroupBuyStoreId = c.Int(nullable: false, identity: true),
                        StoreName = c.String(),
                        Address = c.String(),
                        Tel = c.String(),
                        Category = c.String(),
                    })
                .PrimaryKey(t => t.GroupBuyStoreId);
            
            CreateTable(
                "dbo.GroupBuyStoreMenuImages",
                c => new
                    {
                        GroupBuyStoreMenuImageId = c.Int(nullable: false, identity: true),
                        path = c.String(),
                        GroupBuyStoreId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyStoreMenuImageId)
                .ForeignKey("dbo.GroupBuyStores", t => t.GroupBuyStoreId, cascadeDelete: true)
                .Index(t => t.GroupBuyStoreId);
            
            CreateTable(
                "dbo.GroupBuyStoreSubItems",
                c => new
                    {
                        GroupBuyStoreSubItemId = c.Int(nullable: false, identity: true),
                        SubItemName = c.String(),
                        Price = c.Int(nullable: false),
                        GroupBuyStoreItemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.GroupBuyStoreSubItemId)
                .ForeignKey("dbo.GroupBuyStoreItems", t => t.GroupBuyStoreItemId, cascadeDelete: true)
                .Index(t => t.GroupBuyStoreItemId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GroupBuyStoreSubItems", "GroupBuyStoreItemId", "dbo.GroupBuyStoreItems");
            DropForeignKey("dbo.GroupBuyStoreItems", "GroupBuyStoreId", "dbo.GroupBuyStores");
            DropForeignKey("dbo.GroupBuyStoreMenuImages", "GroupBuyStoreId", "dbo.GroupBuyStores");
            DropForeignKey("dbo.GroupBuySubscribers", "GroupBuySubItemId", "dbo.GroupBuySubItems");
            DropForeignKey("dbo.GroupBuySubscribers", "EmployeeId", "dbo.Employees");
            DropForeignKey("dbo.GroupBuySubItems", "GroupBuyItemId", "dbo.GroupBuyItems");
            DropForeignKey("dbo.GroupBuyItems", "GroupBuyId", "dbo.GroupBuys");
            DropForeignKey("dbo.GroupBuyPaids", "GroupBuyId", "dbo.GroupBuys");
            DropForeignKey("dbo.GroupBuyPaids", "EmployeeId", "dbo.Employees");
            DropIndex("dbo.GroupBuyStoreSubItems", new[] { "GroupBuyStoreItemId" });
            DropIndex("dbo.GroupBuyStoreMenuImages", new[] { "GroupBuyStoreId" });
            DropIndex("dbo.GroupBuyStoreItems", new[] { "GroupBuyStoreId" });
            DropIndex("dbo.GroupBuySubscribers", new[] { "GroupBuySubItemId" });
            DropIndex("dbo.GroupBuySubscribers", new[] { "EmployeeId" });
            DropIndex("dbo.GroupBuySubItems", new[] { "GroupBuyItemId" });
            DropIndex("dbo.GroupBuyPaids", new[] { "GroupBuyId" });
            DropIndex("dbo.GroupBuyPaids", new[] { "EmployeeId" });
            DropIndex("dbo.GroupBuyItems", new[] { "GroupBuyId" });
            DropTable("dbo.GroupBuyStoreSubItems");
            DropTable("dbo.GroupBuyStoreMenuImages");
            DropTable("dbo.GroupBuyStores");
            DropTable("dbo.GroupBuyStoreItems");
            DropTable("dbo.GroupBuySubscribers");
            DropTable("dbo.GroupBuySubItems");
            DropTable("dbo.GroupBuyPaids");
            DropTable("dbo.GroupBuys");
            DropTable("dbo.GroupBuyItems");
        }
    }
}
