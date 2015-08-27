using HoGameEIS.Models;
using HoGameEIS.Models.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebSockets;

namespace HoGameEIS.Controllers
{
    public class GroupBuyApiController : BaseWebApiController
    {
        public GroupBuyApiController() 
        {
        }

        // GET api/groupbuyapi
        [Authorize]
        public List<GroupBuyDto> Get()
        {
            List<GroupBuyDto> gb = new List<GroupBuyDto>();
            using (var db = new HoGameEISContext())
            {
                var sql = @"[dbo].[usp_GetGroupbuyList] @isCurrent";
                gb = db.Database.SqlQuery<GroupBuyDto>(sql, new SqlParameter("@isCurrent", false)).ToList();
            }

            return gb;
        }

        // GET api/groupbuyapi/5
        [Authorize]
        public GroupBuyDto Get(int id)
        {
            GroupBuyDto gb;
            using (var db = new HoGameEISContext())
            {
                var sql = @"[dbo].[usp_GetGroupbuyDetail] @GroupBuyId, @EmployeeId";
                gb = db.Database.SqlQuery<GroupBuyDto>(sql,
                    new SqlParameter("@GroupBuyId", id),
                    new SqlParameter("@EmployeeId", CurrentUser.EmployeeId)).FirstOrDefault();
            }

            return gb;
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
        [Authorize]
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

        [Route("api/GroupbuySecurityApi/{GroupBuyId}")]
        [HttpGet]
        [Authorize]
        public GroupbuySecurityDto GroupbuySecurity(int GroupBuyId)
        {
            GroupbuySecurityDto securtiy = new GroupbuySecurityDto()
            {
                Role = ""
            };

            using (var db = new HoGameEISContext())
            {
                if (db.GroupBuys.Any(o => o.GroupBuyId == GroupBuyId && o.Creator == CurrentUser.EmployeeId))
                {
                    securtiy.Role += "GroupBuyCreator;";
                }
                
            }
            return securtiy;
        }

        [Route("api/GroupbuyEndTimeApi/{GroupBuyId}")]
        [HttpPut]
        [Authorize]
        public void GroupbuyEndTime(int GroupBuyId, GroupBuy input)
        {
            GroupBuy groupBuy;

            using (var db = new HoGameEISContext())
            {
                groupBuy = db.GroupBuys.Where(o => o.GroupBuyId == GroupBuyId).FirstOrDefault<GroupBuy>();

                if (groupBuy != null)
                {
                    groupBuy.EndTime = input.EndTime;

                    db.Entry(groupBuy).State = System.Data.Entity.EntityState.Modified;

                    db.SaveChanges();
                }

            }
        }

        //ChangeGroupBuyStore
        [Route("api/GroupbuyChangeStoreApi")]
        [HttpPut]
        [Authorize]
        public void GroupbuyChangeStore(GroupBuy groupBuy)
        {
            using (var db = new HoGameEISContext())
            {
                var sql = @"exec [dbo].[usp_ChangeGroupBuyStore] @StoreId, @GroupBuyId";
                db.Database.ExecuteSqlCommand(sql,
                    new SqlParameter("@StoreId", groupBuy.StoreId),
                    new SqlParameter("@GroupBuyId", groupBuy.GroupBuyId));
            }
        }

        //[Route("api/GroupbuyWS")]
        //[HttpGet]
        //public HttpResponseMessage GroupbuyWS(GroupBuy groupBuy)
        //{
        //    //HttpContext.Current.AcceptWebSocketRequest(new ChatWebSocketHandler("aaa"));
        //    //return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        //    if (HttpContext.Current.IsWebSocketRequest)
        //    {
        //        HttpContext.Current.AcceptWebSocketRequest(ProcessWSChat);
        //    }
        //    return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);

        //}

        //private async Task ProcessWSChat(AspNetWebSocketContext context)
        //{
        //    WebSocket socket = context.WebSocket;
        //    while (true)
        //    {
        //        ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[1024]);
        //        WebSocketReceiveResult result = await socket.ReceiveAsync(
        //            buffer, CancellationToken.None);
        //        if (socket.State == WebSocketState.Open)
        //        {
        //            string userMessage = Encoding.UTF8.GetString(
        //                buffer.Array, 0, result.Count);
        //            userMessage = "You sent: " + userMessage + " at " +
        //                DateTime.Now.ToLongTimeString();
        //            buffer = new ArraySegment<byte>(
        //                Encoding.UTF8.GetBytes(userMessage));
        //            await socket.SendAsync(
        //                buffer, WebSocketMessageType.Text, true, CancellationToken.None);
        //        }
        //        else
        //        {
        //            break;
        //        }
        //    }
        //}

        //class ChatWebSocketHandler : WebSocketHandler
        //{
        //    private static WebSocketCollection _chatClients = new WebSocketCollection();
        //    private string _username;

        //    public ChatWebSocketHandler(string username)
        //    {
        //        _username = username;
        //    }

        //    public override void OnOpen()
        //    {
        //        _chatClients.Add(this);
        //    }

        //    public override void OnMessage(string message)
        //    {
        //        _chatClients.Broadcast(_username + ": " + message);
        //    }
        //}
    }
}
