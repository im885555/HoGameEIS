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
    public class GroupBuySubscriberApiController : ApiController
    {
        // GET: api/GroupBuySubscriberApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GroupBuySubscriberApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GroupBuySubscriberApi
        public void Post(GroupBuySubscriber subscriber)
        {
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_AddGroupBuySubscriber] @EmployeeId, @SubItemId";
                db.Database.ExecuteSqlCommand(sql,
                    new SqlParameter("@EmployeeId", CurrentUser.Info.EmployeeId),
                    new SqlParameter("@SubItemId", subscriber.SubItemId));
            }
        }

        // PUT: api/GroupBuySubscriberApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GroupBuySubscriberApi/5
        public void Delete(int id)
        {
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_CancelGroupBuySubscriber] @EmployeeId, @SubItemId";
                db.Database.ExecuteSqlCommand(sql, 
                    new SqlParameter("@EmployeeId", CurrentUser.Info.EmployeeId),
                    new SqlParameter("@SubItemId", id));
            }
        }
    }
}
