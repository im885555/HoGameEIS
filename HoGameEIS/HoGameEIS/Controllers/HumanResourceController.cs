﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HoGameEIS.Controllers
{
    public class HumanResourceController : Controller
    {
        //
        // GET: /HumanResource/
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

    }
}
