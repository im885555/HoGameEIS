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
                     Email = "jack.yang@hg-asia.com",
                     FullName = "Jack Yang"
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
                     Email = "cary.tu@hg-asia.com",
                     FullName = "Cary Tu"
                 },
                 new Models.Employee()
                 {
                     Email = "esther.liao@hg-asia.com",
                     FullName = "Esther Liao"
                 },
                 new Models.Employee()
                 {
                     Email = "james.chiu@hg-asia.com",
                     FullName = "James Chiu"
                 },
                 new Models.Employee()
                 {
                     Email = "jason.chen@hg-asia.com",
                     FullName = "Jason Chen"
                 },
                 new Models.Employee()
                 {
                     Email = "ken.lin@hg-asia.com",
                     FullName = "Ken Lin"
                 },
                 new Models.Employee()
                 {
                     Email = "nana.li@hg-asia.com",
                     FullName = "Nana Li"
                 },
                 new Models.Employee()
                 {
                     Email = "sonic.lu@hg-asia.com",
                     FullName = "Sonic Lu"
                 },
                 new Models.Employee()
                 {
                     Email = "ted.wu@hg-asia.com",
                     FullName = "Ted Wu"
                 },
                 new Models.Employee()
                 {
                     Email = "neal.huang@hg-asia.com",
                     FullName = "Neal Huang"
                 },
                 new Models.Employee()
                 {
                     Email = "test@mail.com",
                     FullName = "tester"
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
            executeUspSeed(context, "usp_AddGroupBuySubscriber");
            executeUspSeed(context, "usp_CancelGroupBuySubscriber");
            executeUspSeed(context, "usp_GetGroupbuyPaid");
            executeUspSeed(context, "usp_GetGroupbuySubscriber");
            executeUspSeed(context, "usp_SetGroupBuyPaid");
            executeUspSeed(context, "usp_ChangeGroupBuyStore");

            base.Seed(context);

        }
        private void executeUspSeed(HoGameEIS.Models.HoGameEISContext context, string uspName)
        {
            context.Database.ExecuteSqlCommand(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "\\Migrations\\SeedSql\\" + uspName + ".sql"));
        }
    }
}
