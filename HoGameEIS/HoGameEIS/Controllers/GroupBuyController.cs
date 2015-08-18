using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HoGameEIS.Controllers
{
    public class GroupBuyController : Controller
    {
        //
        // GET: /GroupBuy/
        public ActionResult Index()
        {
            return RedirectToAction("CreateGroupBuy", "GroupBuy");
        }

        [Authorize]
        public ActionResult CreateGroupBuy()
        {
            return View("App");
        }

        [Authorize]
        [HttpPost]
        public ActionResult CreateGroupBuy(FormCollection formData)
        {
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_AddGroupBuy] @Description=@Description,@EndTime=@EndTime,@StoreId=@StoreId,@Creator=@Creator";
                db.Database.ExecuteSqlCommand(sql,
                    new SqlParameter("@Description", formData["Description"]),
                    new SqlParameter("@EndTime", formData["EndTime"]),
                    new SqlParameter("@StoreId", Int32.Parse(formData["StoreId"])),
                    new SqlParameter("@Creator", CurrentUser.Info.EmployeeId)
                    );
            }

            return RedirectToAction("GroupBuyList", "GroupBuy");
        }

        [Authorize]
        public ActionResult CurrentGroupBuy()
        {
            return View("App");
        }

        [Authorize]
        public ActionResult CurrentGroupBuyDetail()
        {
            return View("App");
        }

        [Authorize]
        public ActionResult StoreManagement()
        {
            return View("App");
        }

        [Authorize]
        public ActionResult StoreManagementEdit(int id =-1)
        {
            GroupBuyStore store = new GroupBuyStore() 
            { 
                Category = "meal"
            };

            if (id != -1) 
            {
                store = new GroupBuyStoreApiController().Get(id);
            }
            return View("App");
        }

        [Authorize]
        [HttpPost]
        public ActionResult StoreManagementEdit(FormCollection formData, int id = -1)
        {
            GroupBuyStore groupBuyStore;

            if (id != -1)
            {
                using (var db = new HoGameEISContext())
                {
                    groupBuyStore = db.GroupBuyStores.Where(o => o.StoreId == id).FirstOrDefault<GroupBuyStore>();

                    if (groupBuyStore != null)
                    {
                        groupBuyStore.StoreName = formData["StoreName"];
                        groupBuyStore.Address = formData["Address"];
                        groupBuyStore.Tel = formData["Tel"];
                        groupBuyStore.Category = formData["Category"];
                        groupBuyStore.Memo = formData["Memo"];

                        db.Entry(groupBuyStore).State = System.Data.Entity.EntityState.Modified;

                        //4. call SaveChanges
                        db.SaveChanges();
                    }

                }
            }
            else
            {
                using (var db = new HoGameEISContext())
                {
                    groupBuyStore = new GroupBuyStore()
                    {
                        StoreName = formData["StoreName"],
                        Address = formData["Address"],
                        Tel = formData["Tel"],
                        Category = formData["Category"],
                        Memo = formData["Memo"]
                    };
                    db.GroupBuyStores.Add(groupBuyStore);
                    db.SaveChanges();
                }
            }
            return RedirectToAction("StoreManagement", "GroupBuy");
        }

        [Authorize]
        public ActionResult StoreManagementMenuEdit(int Id)
        {
            return View("App");
        }
    }
}
