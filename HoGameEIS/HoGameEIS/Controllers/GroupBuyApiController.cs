using HoGameEIS.Models;
using System;
using System.Collections.Generic;
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
        public List<GroupBuy> Get()
        {
            List<GroupBuy> gb = new List<GroupBuy>();
            using (var db = new HoGameEISContext())
            {
                gb = db.GroupBuys.ToList();
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
    }
}
