using HoGameEIS.Models;
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

using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.Azure;

namespace HoGameEIS.Controllers
{


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

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.GetContainerReference("image");       


            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = container.GetBlockBlobReference("Jellyfish.jpg");

            // Create or overwrite the "myblob" blob with contents from a local file.
            using (var fileStream = System.IO.File.OpenRead(ServerUploadFolder+ "1439229334_Jellyfish.jpg"))
            {
                blockBlob.UploadFromStream(fileStream);
            }

            //https://127.0.0.1:10000/devstoreaccount1/image/Jellyfish.jpg
            //https://genechen.blob.core.windows.net/image

            return new string[] { "value1", "value2" };
        }

        // GET: api/MenuImageApi/5
        public List<GroupBuyStoreMenuImage> Get(int id)
        {
            List<GroupBuyStoreMenuImage> images = new List<GroupBuyStoreMenuImage>();
            using (var db = new HoGameEISContext())
            {
                images = db.GroupBuyStoreMenuImages.Where(o => o.StoreId == id).ToList();

            }

            return images;
        }

        // POST: api/MenuImageApi/5
        [ValidateMimeMultipartContentFilter]
        public async Task<List<GroupBuyStoreMenuImage>> Post(int id)
        {
            var streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);

            await Request.Content.ReadAsMultipartAsync(streamProvider);
            foreach (MultipartFileData file in streamProvider.FileData)
            {
                try {
                    string fileName = localSaveFile(file);



                    GroupBuyStoreMenuImage image = new GroupBuyStoreMenuImage()
                    {
                        StoreId = id,
                        ImageUrl = fileName

                    };

                    using (var db = new HoGameEISContext())
                    {
                        db.GroupBuyStoreMenuImages.Add(image);
                        db.SaveChanges();
                    }
 
                }
                catch (Exception ex)
                {
                    //如果有出錯的狀況，就把上船的檔案刪除
                    FileInfo DelFile = new FileInfo(file.LocalFileName);
                    DelFile.Delete();
                    throw ex;
                }
            }
            return Get(id);
        }



        // PUT: api/MenuImageApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/MenuImageApi/5
        public void Delete(int id)
        {
            GroupBuyStoreMenuImage image = new GroupBuyStoreMenuImage();
            using (var db = new HoGameEISContext())
            {
                image = db.GroupBuyStoreMenuImages.Where(o => o.ImageId == id).FirstOrDefault<GroupBuyStoreMenuImage>();

            }
            using (var db = new HoGameEISContext())
            {
                db.Entry(image).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
            }

            deleteLocalFile(image.ImageUrl);
        }





        private string localSaveFile(MultipartFileData file)
        {
            string fileName = file.Headers.ContentDisposition.FileName;
            if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
            {
                fileName = fileName.Trim('"');
            }
            if (fileName.Contains(@"/") || fileName.Contains(@"\"))
            {
                fileName = Path.GetFileName(fileName);
            }

            //檔名加上時間戳記

            fileName = String.Format("{0}_{1}", Convert.ToInt32(DateTime.UtcNow.AddHours(8).Subtract(new DateTime(1970, 1, 1)).TotalSeconds), fileName);

            string newPath = Path.Combine(ServerUploadFolder, fileName);

            // Ensure that the target does not exist.
            if (File.Exists(newPath))
                File.Delete(newPath);

            File.Move(file.LocalFileName, newPath);

            fileName = String.Format("/Content/uploads/{1}", ServerUploadFolder, fileName);

            return fileName;
        }

        private void deleteLocalFile(string url)
        {
            //string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, image.ImageUrl);
            string path = AppDomain.CurrentDomain.BaseDirectory + url;

            // Ensure that the target does not exist.
            if (File.Exists(path))
                File.Delete(path);
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
