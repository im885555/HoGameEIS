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
        [Authorize]
        public List<GroupBuyStoreItem> Get(int id)
        {
            List<GroupBuyStoreItem> menu = new List<GroupBuyStoreItem>();
            using (var db = new HoGameEISContext())
            {
                menu =  db.GroupBuyStoreItems.Where(o => o.StoreId == id).ToList();

                menu.ForEach(m => m.SubItems
                = db.GroupBuyStoreSubItems.Where(s => s.ItemId == m.ItemId).ToList());

            }
            return menu;
        }

        // POST: api/GroupBuyStoreMenuApi
        [Authorize]
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
        [Authorize]
        public void Put(int id, [FromBody]GroupBuyStoreItem item)
        {
            using (var db = new HoGameEISContext())
            {
                GroupBuyStoreItem _item =  db.GroupBuyStoreItems.Where(o => o.ItemId == id).FirstOrDefault();
                _item.ItemName = item.ItemName;
                db.Entry(_item).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/GroupBuyStoreMenuApi/5
        [Authorize]
        public Boolean Delete(int id)
        {
            int result = 0;
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_DeleteGroupBuyMenuItem] @ItemId";
                result = db.Database.ExecuteSqlCommand(sql, new SqlParameter("@ItemId", id));
            }
            return result != 0;
        }
    }
}
