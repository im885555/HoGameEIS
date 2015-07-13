﻿using System;
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
        public ActionResult StoreManagementEdit(FormCollection formCollection)
        {


            return View();
        }
    }
}
