namespace HoGameEIS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Storename : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.GroupBuyStores", "StoreName", c => c.String(nullable: false));
            AlterColumn("dbo.GroupBuyStores", "Category", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.GroupBuyStores", "Category", c => c.String());
            AlterColumn("dbo.GroupBuyStores", "StoreName", c => c.String());
        }
    }
}
