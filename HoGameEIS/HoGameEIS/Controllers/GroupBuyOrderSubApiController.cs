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
    public class GroupBuyOrderSubApiController : ApiController
    {
        // GET: api/GroupBuyOrderSubApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GroupBuyOrderSubApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GroupBuyOrderSubApi
        [Authorize]
        public void Post([FromBody]GroupBuySubItem item)
        {
            using (var db = new HoGameEISContext())
            {
                db.GroupBuySubItems.Add(item);
                db.SaveChanges();
            }
        }

        // PUT: api/GroupBuyOrderSubApi/5
        [Authorize]
        public void Put(int id, [FromBody]GroupBuySubItem item)
        {
            if (String.IsNullOrEmpty(item.Action))
            {
                return;
            }
            using (var db = new HoGameEISContext())
            {
                GroupBuySubItem _item = db.GroupBuySubItems.Where(o => o.SubItemId == id).FirstOrDefault();
                if (item.Action == "SubItemName")
                {
                    _item.SubItemName = item.SubItemName;
                }
                if (item.Action == "Price")
                {
                    _item.Price = item.Price;
                }
                db.Entry(_item).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }
        // DELETE: api/GroupBuyOrderSubApi/5
        [Authorize]
        public void Delete(int id)
        {
            using (var db = new HoGameEISContext())
            {
                GroupBuySubItem _subItem = db.GroupBuySubItems.Where(o => o.SubItemId == id).FirstOrDefault();
                db.Entry(_subItem).State = System.Data.Entity.EntityState.Deleted;
                List<GroupBuySubscriber> _subscribers = db.GroupBuySubscribers.Where(s => s.SubItemId==id).ToList();
                foreach (GroupBuySubscriber subscriber in _subscribers)
                {
                    db.Entry(subscriber).State = System.Data.Entity.EntityState.Deleted;
                }
                db.SaveChanges();
            }
        }
    }
}
