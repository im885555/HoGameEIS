namespace HoGameEIS.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<HoGameEIS.Models.HoGameEISContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(HoGameEIS.Models.HoGameEISContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.GroupBuyStores.AddOrUpdate(
               s => s.StoreName,
                new Models.GroupBuyStore()
                {
                    StoreName = "八方雲集",
                    Category = "meal"
                },
                new Models.GroupBuyStore()
                {
                    StoreName = "茶湯會",
                    Category = "drink"
                },
                new Models.GroupBuyStore()
                {
                    StoreName = "甲味飯包",
                    Category = "meal"
                },
                new Models.GroupBuyStore()
                {
                    StoreName = "惡魔雞排",
                    Category = "dessert"
                }
               );

            context.Employees.AddOrUpdate(
                e =>e.Email,
                 new Models.Employee()
                 {
                     Email = "gene.chen@hg-asia.com",
                     FullName = "Gene Chen"
                 }
                );
            //context.Database.ExecuteSqlCommand(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "\\Sql\\usp_AddGroupBuyMenuItem.sql"));
   
        }
    }
}
