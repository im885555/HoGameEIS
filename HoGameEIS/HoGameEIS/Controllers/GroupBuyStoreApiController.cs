using HoGameEIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HoGameEIS.Models.DTO;
using System.Data.SqlClient;

namespace HoGameEIS.Controllers
{
    public class GroupBuyStoreApiController : BaseWebApiController
    {

        public GroupBuyStoreApiController()
        { 
        
        }

        //取得店家清單
        // GET api/groupbuystoreapi
        [Authorize]
        public TableDto<GroupBuyStore> Get(int limit = 1000, int offset = 0, string search = null, string order = "asc", string category=null)
        {
            List<GroupBuyStore> stores; 
            TableDto<GroupBuyStore> list; 
            using (var db = new HoGameEISContext())
            {
                stores = db.GroupBuyStores.ToList();

                if (search != null)
                    stores = stores.Where(o => o.StoreName.Contains(search)).ToList();

                if (!String.IsNullOrEmpty(category))
                    stores = stores.Where(o => o.Category.Contains(category)).ToList();

                int total = stores.Count();

                stores = stores.Skip(offset).Take(limit).ToList();               
                                       
                list = new TableDto<GroupBuyStore>() 
                {
                    total = total,
                    rows = stores
                };
            }

            return list;
        }

        // GET api/groupbuystoreapi/5
        [Authorize]
        public GroupBuyStore Get(int id)
        {
            GroupBuyStore store = new GroupBuyStore()
            {
                StoreId = id
            };

            using (var db = new HoGameEISContext())
            {
                store = db.GroupBuyStores.Find(store.StoreId);
            }
            return store;
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
        [Authorize]
        public void Delete(int id)
        {
            using (var db = new HoGameEISContext())
            {
                List<GroupBuyStoreMenuImage> images = new List<GroupBuyStoreMenuImage>();
                images = db.GroupBuyStoreMenuImages.Where(o => o.StoreId == id).ToList();

                foreach (var img in images)
                {
                    GroupBuyImageApiController.deleteblobFile(img.ImageUrl);
                }

                var sql = @"exec [dbo].[usp_DeleteGroupBuyStore] @StoreId";
                db.Database.ExecuteSqlCommand(sql, new SqlParameter("@StoreId", id));
            }
        }
    }
}
