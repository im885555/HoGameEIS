using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HoGameEIS.Controllers
{
    public class GroupBuyStoreApiController : BaseWebApiController
    {

        public GroupBuyStoreApiController()
        { 
        
        }

        // GET api/groupbuystoreapi
        public IEnumerable<GroupBuyStore> Get()
        {
            List<GroupBuyStore> stores = new List<GroupBuyStore>();

            using (var db = new HoGameEISContext())
            {                
                stores = db.GroupBuyStores.ToList();                
            }

            return stores;
        }

        // GET api/groupbuystoreapi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/groupbuystoreapi
        public void Post([FromBody]string value)
        {
        }

        // PUT api/groupbuystoreapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/groupbuystoreapi/5
        public void Delete(int id)
        {
        }
    }
}
