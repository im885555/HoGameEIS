using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace HoGameEIS.Controllers
{
    public class AccountController : BaseController
    {

        //
        // GET: /Account/

        public ActionResult Index()
        {
            return View("Login");
        }
        public ActionResult Login() 
        {
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
            string password = formCollection["password"];

            if (account == null)
            {
                return View();
            }
            using (var db = new HoGameEISContext())
            {
                Boolean isRememberMe = formCollection["RememberMe"].Contains("true");
                Employee emp = db.Employees.Where(o => o.Email.Contains(account.Trim()) && (o.Password==null || o.Password == password)).FirstOrDefault();
                if (emp != null)
                {
                    System.Web.Script.Serialization.JavaScriptSerializer objSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                    string userData = objSerializer.Serialize(emp);
                 
                    DateTime expires = DateTime.Now.AddMonths(1);
                   
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                      emp.FullName,//你想要存放在 User.Identy.Name 的值，通常是使用者帳號
                      DateTime.Now,
                      expires,
                      isRememberMe,//將管理者登入的 Cookie 設定成 Session Cookie
                      userData,
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

        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
        public ActionResult ChangePassword(FormCollection formCollection)
        {
            string password = formCollection["password"];

            Employee emp;
            using (var db = new HoGameEISContext())
            {
                int employeeId = CurrentUser().EmployeeId;
                emp = db.Employees.Where(o => o.EmployeeId == employeeId).FirstOrDefault<Employee>();

                if (emp != null)
                {
                    emp.Password = password;

                    db.Entry(emp).State = System.Data.Entity.EntityState.Modified;

                    db.SaveChanges();
                }

            }
            return RedirectToAction("Logout"); 
        }
    }
}
