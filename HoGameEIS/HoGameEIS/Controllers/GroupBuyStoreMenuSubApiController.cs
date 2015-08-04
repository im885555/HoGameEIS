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
    public class GroupBuyStoreMenuSubApiController : ApiController
    {
        // GET: api/GroupBuyStoreMenuSubApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GroupBuyStoreMenuSubApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GroupBuyStoreMenuSubApi
        public void Post([FromBody]GroupBuyStoreSubItem item)
        {
            using (var db = new HoGameEISContext())
            {
                db.GroupBuyStoreSubItems.Add(item);
                db.SaveChanges();
            }
        }

        // PUT: api/GroupBuyStoreMenuSubApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GroupBuyStoreMenuSubApi/5
        public Boolean Delete(int id)
        {
            int result = 0;
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_DeleteGroupBuyMenuSubItem] @SubItemId";
                result = db.Database.ExecuteSqlCommand(sql, new SqlParameter("@SubItemId", id));
            }
            return result != 0;
        }
    }
}
