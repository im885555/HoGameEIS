using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HoGameEIS.Controllers
{
    public class GroupBuyStoreMenuApiController : ApiController
    {
        // GET: api/GroupBuyStoreMenuApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GroupBuyStoreMenuApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GroupBuyStoreMenuApi
        public void Post([FromBody]GroupBuyStoreItem value)
        {
           
        }

        // PUT: api/GroupBuyStoreMenuApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GroupBuyStoreMenuApi/5
        public void Delete(int id)
        {
        }
    }
}
