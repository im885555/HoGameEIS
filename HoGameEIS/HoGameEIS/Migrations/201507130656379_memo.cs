namespace HoGameEIS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class memo : DbMigration
    {
        public override void Up()
        {
  
            
            AddColumn("dbo.GroupBuyStores", "Memo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.GroupBuyStores", "Memo");
          
        }
    }
}
