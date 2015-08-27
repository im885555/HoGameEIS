using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace HoGameEIS.Controllers
{
    public class BaseController : Controller
    {
        protected Employee CurrentUser()
        {
            Employee emp = new Employee();
            if (User != null && User.Identity.IsAuthenticated)
            {
                FormsIdentity id = (FormsIdentity)User.Identity;
                // 再取出使用者的 FormsAuthenticationTicket
                FormsAuthenticationTicket ticket = id.Ticket;

                System.Web.Script.Serialization.JavaScriptSerializer objSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

                emp = objSerializer.Deserialize<Employee>(ticket.UserData);
            }
            return emp;
        }

        public BaseController()
        {
            
        }
    }
}