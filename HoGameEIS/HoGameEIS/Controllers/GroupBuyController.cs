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
        public ActionResult StoreManagementEdit()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public ActionResult StoreManagementEdit(FormCollection formData)
        {
            using (var db = new HoGameEISContext())
            {
                GroupBuyStore groupBuyStore = new GroupBuyStore()
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

            return View("StoreManagement");
        }
    }
}
