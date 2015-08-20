﻿namespace HoGameEIS.Migrations
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
            AutomaticMigrationsEnabled = false;
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
                 },
                 new Models.Employee()
                 {
                     Email = "hugo.cheng@hg-asia.com",
                     FullName = "Hugo Cheng"
                 },
                 new Models.Employee()
                 {
                     Email = "joe.wu@hg-asia.com",
                     FullName = "Joe Wu"
                 },
                 new Models.Employee()
                 {
                     Email = "archer.liou@hg-asia.com",
                     FullName = "Archer Liou"
                 },
                 new Models.Employee()
                 {
                     Email = "ronnie.ho@hg-asia.com",
                     FullName = "Ronnie Ho"
                 },
                 new Models.Employee()
                 {
                     Email = "lester.yeh@hg-asia.com",
                     FullName = "Lester Yeh"
                 }
                );

            executeUspSeed(context, "drop_procedure");
            executeUspSeed(context, "usp_AddGroupBuyMenuItem");
            executeUspSeed(context, "usp_DeleteGroupBuyMenuSubItem");
            executeUspSeed(context, "usp_DeleteGroupBuyMenuItem");
            executeUspSeed(context, "usp_DeleteGroupBuyStore");
            executeUspSeed(context, "usp_AddGroupBuy");
            executeUspSeed(context, "usp_GetGroupbuyList");
            executeUspSeed(context, "usp_GetGroupbuyDetail");
            executeUspSeed(context, "usp_AddGroupBuyItem");

        
     

            base.Seed(context);

        }
        private void executeUspSeed(HoGameEIS.Models.HoGameEISContext context, string uspName)
        {
            context.Database.ExecuteSqlCommand(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "\\Migrations\\SeedSql\\" + uspName + ".sql"));
        }
    }
}
