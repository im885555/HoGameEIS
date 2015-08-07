using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace HoGameEIS.Controllers
{

    public class FileResult
    {
        public IEnumerable<string> FileNames { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public DateTime UpdatedTimestamp { get; set; }
        public string DownloadLink { get; set; }
        public IEnumerable<string> ContentTypes { get; set; }
        public IEnumerable<string> Names { get; set; }
    }

    public class ValidateMimeMultipartContentFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {

        }

    }

    public class MenuImageApiController : ApiController
    {
        //const string ServerUploadFolder = "D:\\Temp";
        //private readonly string ServerUploadFolder = HttpContext.Current.Server.MapPath("~/UploadFiles/");

        private readonly string ServerUploadFolder = AppDomain.CurrentDomain.BaseDirectory + "Content/uploads/";


        // GET: api/MenuImageApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/MenuImageApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/MenuImageApi/5
        [ValidateMimeMultipartContentFilter]
        public async Task<FileResult> Post(int id)
        {
            var streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);

            await Request.Content.ReadAsMultipartAsync(streamProvider);
            foreach (MultipartFileData file in streamProvider.FileData)
            {
                try {
                    string fileName = file.Headers.ContentDisposition.FileName;
                    if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                    {
                        fileName = fileName.Trim('"');
                    }
                    if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                    {
                        fileName = Path.GetFileName(fileName);
                    }

                    string newPath = Path.Combine(ServerUploadFolder, fileName);

                    // Ensure that the target does not exist.
                    if (File.Exists(newPath))
                        File.Delete(newPath);
      
                    File.Move(file.LocalFileName, newPath);
                }
                catch (Exception ex)
                {
                    //如果有出錯的狀況，就把上船的檔案刪除
                    FileInfo DelFile = new FileInfo(file.LocalFileName);
                    DelFile.Delete();
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }
            }
            

                return new FileResult
            {
                FileNames = streamProvider.FileData.Select(entry => entry.LocalFileName),
                Names = streamProvider.FileData.Select(entry => entry.Headers.ContentDisposition.FileName),
                ContentTypes = streamProvider.FileData.Select(entry => entry.Headers.ContentType.MediaType),
                Description = streamProvider.FormData["description"],
                CreatedTimestamp = DateTime.UtcNow,
                UpdatedTimestamp = DateTime.UtcNow,
                DownloadLink = "TODO, will implement when file is persisited"
            };
        }

        // PUT: api/MenuImageApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/MenuImageApi/5
        public void Delete(int id)
        {
        }

        //// GET: api/MenuImageApi/GetImage/5
        //[Route("getImage/{id}")]
        //[HttpGet]
        //public System.Web.Mvc.FileStreamResult GetImage(int id)
        //{
        //    string path = AppDomain.CurrentDomain.BaseDirectory + "uploads/";
        //    string fileName = "test.txt";
        //    return System.Web.Mvc.FileStreamResult.File(new FileStream(path + fileName, FileMode.Open), "text/plain", fileName);
        //}

    }
}
