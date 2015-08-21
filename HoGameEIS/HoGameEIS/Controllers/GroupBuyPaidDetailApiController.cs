using HoGameEIS.Models;
using HoGameEIS.Models.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HoGameEIS.Controllers
{
    public class GroupBuyPaidDetailApiController : ApiController
    {
        // GET: api/GroupBuyPaidDetailApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GroupBuyPaidDetailApi/5
        public List<GroupBuyPaidDetailDto> Get(int id) 
        {
            List<GroupBuyPaidDetailDto> Details;
            using (var db = new HoGameEISContext())
            {
                var sql = @"[dbo].[usp_GetGroupbuyPaid] @GroupBuyId";
                Details = db.Database.SqlQuery<GroupBuyPaidDetailDto>(sql, new SqlParameter("@GroupBuyId", id)).ToList();

                Details.ForEach((d) => {
                    d.SubscriberItems = db.Database.SqlQuery<GroupBuySubscriberItemDto>(
                        @"[dbo].[usp_GetGroupbuySubscriber] @GroupBuyId,@EmployeeId",
                        new SqlParameter("@GroupBuyId", id), 
                        new SqlParameter("@EmployeeId", d.EmployeeId))
                        .ToList();
                });

            }
            return Details;
        }

        // POST: api/GroupBuyPaidDetailApi
        public void Post(GroupBuyPaid paid)
        {
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_SetGroupBuyPaid] @EmployeeId,@GroupBuyId,@Paid";
                db.Database.ExecuteSqlCommand(sql, 
                    new SqlParameter("@EmployeeId", paid.EmployeeId),
                    new SqlParameter("@GroupBuyId", paid.GroupBuyId),
                    new SqlParameter("@Paid", paid.Paid));
            }
        }

        // PUT: api/GroupBuyPaidDetailApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GroupBuyPaidDetailApi/5
        public void Delete(int id)
        {
        }
    }
}
