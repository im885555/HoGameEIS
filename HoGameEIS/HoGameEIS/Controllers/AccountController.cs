using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace HoGameEIS.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/

        public ActionResult Index()
        {
            return View("Login");
        }
        public ActionResult Login() 
        {
            /*初始化測試帳號*/
            Employee emp;
            using (var db = new HoGameEISContext())
            {
                emp = db.Employees.Where(o => o.Email == "gene.chen@hg-asia.com").FirstOrDefault();

                if (emp == null) {
                    emp = new Employee()
                    {
                        Email = "gene.chen@hg-asia.com",
                        FullName = "Gene Chen"
                    };
                    db.Employees.Add(emp);
                    db.SaveChanges();
                }
            }
            /*初始化測試帳號*/

            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Login(FormCollection formCollection, String ReturnUrl)
        {

            if (User.Identity.IsAuthenticated) {
                return RedirectToAction("Index", "Home");
            }


            String account = formCollection["InputEmail"];

         
            if (account == null)
            {
                return View();
            }
            using (var db = new HoGameEISContext())
            {
                Boolean isRememberMe = formCollection["RememberMe"].Contains("true");
                Employee emp = db.Employees.Where(o => o.Email.Contains(account.Trim())).FirstOrDefault();
                if (emp != null)
                {
                    DateTime expires = DateTime.Now.AddMonths(1);
                   
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                      emp.Email,//你想要存放在 User.Identy.Name 的值，通常是使用者帳號
                      DateTime.Now,
                      expires,
                      isRememberMe,//將管理者登入的 Cookie 設定成 Session Cookie
                      FormsAuthentication.FormsCookiePath);

                    string encTicket = FormsAuthentication.Encrypt(ticket);
                    HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                    authCookie.Expires = expires;
                    Response.Cookies.Add(authCookie);

                    if (String.IsNullOrEmpty(ReturnUrl))
                    {
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        return Redirect(ReturnUrl);
                    }


                }


            }
            return View();
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");          
        }
       
    }
}
