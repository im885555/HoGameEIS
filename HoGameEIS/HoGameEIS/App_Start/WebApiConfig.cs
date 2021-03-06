﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace HoGameEIS
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //暫時解決巢狀式物件序列化問題
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling
= Newtonsoft.Json.ReferenceLoopHandling.Ignore;

        }
    }
}
