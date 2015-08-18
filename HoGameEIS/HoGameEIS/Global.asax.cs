using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using HoGameEIS.App_Start;
using System.Web.Optimization;
using HoGameEIS.Models;

namespace HoGameEIS
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {

            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            

            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();

            GlobalConfiguration.Configuration.EnsureInitialized();
        }

        void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            if (Request.IsAuthenticated)
            {
                // 先取得該使用者的 FormsIdentity
                FormsIdentity id = (FormsIdentity)User.Identity;
                // 再取出使用者的 FormsAuthenticationTicket
                FormsAuthenticationTicket ticket = id.Ticket;

                System.Web.Script.Serialization.JavaScriptSerializer objSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                try
                {
                    Employee emp = objSerializer.Deserialize<Employee>(ticket.UserData);
                    CurrentUser.Info = emp;
                }
                catch
                {
                    CurrentUser.Info = null;
                    FormsAuthentication.SignOut();
                }
                

                // 將儲存在 FormsAuthenticationTicket 中的角色定義取出，並轉成字串陣列
                //string[] roles = ticket.UserData.Split(new char[] { ',' });
                //// 指派角色到目前這個 HttpContext 的 User 物件去
                //Context.User = new GenericPrincipal(Context.User.Identity, roles);
            }
        }
    }
}