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
    public class GroupBuyOrderApiController : ApiController
    {
        // GET: api/GroupBuyOrderApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GroupBuyOrderApi/5
        [Authorize]
        public List<GroupBuyItem> Get(int id)
        {
            List<GroupBuyItem> order = new List<GroupBuyItem>();
            using (var db = new HoGameEISContext())
            {
                order = db.GroupBuyItems.Where(o => o.GroupBuyId == id).ToList();

                order.ForEach((m) => {
                    m.SubItems= db.GroupBuySubItems.Where(s => s.ItemId == m.ItemId).ToList();
                    List<GroupBuySubItem> subItems = m.SubItems.ToList();
                    subItems.ForEach((si)=> {
                        si.GroupBuySubscribers = db.GroupBuySubscribers.Where(gs => gs.SubItemId == si.SubItemId).ToList();
                    });
                    //m.SubItems = subItems;
                });

            }
            return order;
        }

        // POST: api/GroupBuyOrderApi
        [Authorize]
        public Boolean Post([FromBody]GroupBuyItem item)
        {
            int result = 0;
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_AddGroupBuyItem] @GroupBuyId";
                result = db.Database.ExecuteSqlCommand(sql, new SqlParameter("@GroupBuyId", item.GroupBuyId));
            }
            return result != 0;
        }

        // PUT: api/GroupBuyOrderApi/5
        [Authorize]
        public void Put(int id, [FromBody]GroupBuyItem item)
        {
            using (var db = new HoGameEISContext())
            {
                GroupBuyItem _item = db.GroupBuyItems.Where(o => o.ItemId == id).FirstOrDefault();
                _item.ItemName = item.ItemName;
                db.Entry(_item).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/GroupBuyOrderApi/5
        [Authorize]
        public Boolean Delete(int id)
        {
            int result = 0;
            return result != 0;
        }
    }
}
