using HoGameEIS.Models;
using System;
using System.Collections.Generic;
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
            return View("CreateGroupBuy");
        }

        [Authorize]
        public ActionResult CreateGroupBuy()
        {
            return View();
        }

        [Authorize]
        public ActionResult GroupBuyList()
        {
            return View();
        }

        [Authorize]
        public ActionResult StoreManagement()
        {
            return View();
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
                store.GroupBuyStoreId = id;

                using (var db = new HoGameEISContext())
                {
                    store = db.GroupBuyStores.Find(store.GroupBuyStoreId);
                }
            }
            return View(store);
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
                    groupBuyStore = db.GroupBuyStores.Where(o => o.GroupBuyStoreId == id).FirstOrDefault<GroupBuyStore>();

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
            return View();
        }
    }
}
