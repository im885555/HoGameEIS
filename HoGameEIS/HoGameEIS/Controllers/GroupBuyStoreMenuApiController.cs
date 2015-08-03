using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        public string Get(int Id)
        {
            List<GroupBuyStoreItem> menu = new List<GroupBuyStoreItem>();
            using (var db = new HoGameEISContext())
            {
                menu =  db.GroupBuyStoreItems.Where(o => o.StoreId == Id).ToList();
            }

            return "value";
        }

        // POST: api/GroupBuyStoreMenuApi
        public Boolean Post([FromBody]GroupBuyStoreItem item)
        {
            int result = 0;
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_AddGroupBuyMenuItem] @StoreId";
                result = db.Database.ExecuteSqlCommand(sql, new SqlParameter("@StoreId", item.StoreId));
            }
            return result != 0;
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
