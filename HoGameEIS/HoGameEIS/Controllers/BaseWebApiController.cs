using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace HoGameEIS.Controllers
{
    public class BaseWebApiController : ApiController
    {
        protected Employee CurrentUser;

        public BaseWebApiController() 
        {
            if (User != null && User.Identity.IsAuthenticated)
            {
                FormsIdentity id = (FormsIdentity)User.Identity;
                // 再取出使用者的 FormsAuthenticationTicket
                FormsAuthenticationTicket ticket = id.Ticket;

                System.Web.Script.Serialization.JavaScriptSerializer objSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

                CurrentUser = objSerializer.Deserialize<Employee>(ticket.UserData);
            }

        }
    }
}
