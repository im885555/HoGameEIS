using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HoGameEIS.Controllers
{
    public class BaseWebApiController : ApiController
    {
        public BaseWebApiController() 
        {
            if (!User.Identity.IsAuthenticated)
            {
                var response = new HttpResponseMessage();
                response.StatusCode = (HttpStatusCode)401;
                response.ReasonPhrase = "You are not authorized";

                throw new HttpResponseException(response);
            }    
        }
    }
}
