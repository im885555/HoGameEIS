using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HoGameEIS.Models.DTO;


namespace HoGameEIS.Controllers
{
    public class GroupBuyStoreApiController : BaseWebApiController
    {

        public GroupBuyStoreApiController()
        { 
        
        }

        // GET api/groupbuystoreapi
        public TableDto<GroupBuyStore> Get(int limit=1000, int offset=0, string search=null , string order = "asc")
        {
            //http://localhost:50908/api/groupbuystoreapi?search=aaa&order=asc&limit=5&offset=0
            //(from p in playerList
            //          where p.Length <= 4
            //          select p)

            List<GroupBuyStore> stores; 
            TableDto<GroupBuyStore> list; 
            using (var db = new HoGameEISContext())
            {
                stores = db.GroupBuyStores.ToList();

                int total = stores.Count();

                stores = stores.Skip(offset).Take(limit).ToList();

                if (search != null) 
                    stores = stores.Where(o => o.StoreName.Contains("search")).ToList();
                                          

                list = new TableDto<GroupBuyStore>() 
                {
                    total = total,
                    rows = stores
                };
               // Table<List<GroupBuyStore>> a;
            }

            return list;
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
