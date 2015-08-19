using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HoGameEIS.Controllers
{
    public class CurrentUserApiController : ApiController
    {
        // GET: api/CurrentUserApi
        public Employee Get()
        {
            return CurrentUser.Info;
        }

        // GET: api/CurrentUserApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CurrentUserApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/CurrentUserApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CurrentUserApi/5
        public void Delete(int id)
        {
        }
    }
}
