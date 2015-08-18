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
    public class GroupBuyApiController : BaseWebApiController
    {
        public GroupBuyApiController() 
        {
        }

        // GET api/groupbuyapi
        public List<GroupBuyDto> Get()
        {
            List<GroupBuyDto> gb = new List<GroupBuyDto>();
            //using (var db = new HoGameEISContext())
            //{
            //    gb = db.GroupBuys.ToList();
            //}

            using (var db = new HoGameEISContext())
            {
                var sql = @"[dbo].[usp_GetGroupbuyList] @isCurrent";
                gb = db.Database.SqlQuery<GroupBuyDto>(sql, new SqlParameter("@isCurrent", false)).ToList();
            }

            return gb;
        }

        // GET api/groupbuyapi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/groupbuyapi
        public void Post([FromBody]string value)
        {
        }

        // PUT api/groupbuyapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/groupbuyapi/5
        public void Delete(int id)
        {
        }


        [Route("api/groupbuylistapi")]
        [HttpGet]
        public TableDto<GroupBuyDto> GetGroupbuyList(int limit = 1000, int offset = 0, string search = null, string order = "asc", string category = null)
        {
            List<GroupBuyDto> groupbuys; ;
            TableDto<GroupBuyDto> list;
            using (var db = new HoGameEISContext())
            {
                var sql = @"[dbo].[usp_GetGroupbuyList] @isOngoing";
                groupbuys = db.Database.SqlQuery<GroupBuyDto>(sql, new SqlParameter("@isOngoing", category == "ongoing")).ToList();

                if (search != null)
                    groupbuys = groupbuys.Where(o => o.Description.Contains(search)).ToList();

                int total = groupbuys.Count();

                groupbuys = groupbuys.Skip(offset).Take(limit).ToList();

                list = new TableDto<GroupBuyDto>()
                {
                    total = total,
                    rows = groupbuys
                };
            }

            return list;
        }
    }
}
