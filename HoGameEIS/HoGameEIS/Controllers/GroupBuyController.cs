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
            return CreateGroupBuy();
        }

        [Authorize]
        public ActionResult CreateGroupBuy()
        {
            return View();
        }
    }
}
