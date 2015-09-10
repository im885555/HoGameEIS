using HoGameEIS.Models;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
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

    public class GroupBuyImageApiController : ApiController
    {

        private readonly string ServerUploadFolder = HttpContext.Current.Server.MapPath("~/App_Data");

        static readonly CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));

        // Create the blob client.
        static readonly CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

        // Retrieve reference to a previously created container.
        static readonly CloudBlobContainer ImageContainer = blobClient.GetContainerReference("image");

        static readonly string ImageUploadUrl = ConfigurationManager.AppSettings["ImageUploadUrl"];

        //GET api/GroupBuyOrderImageApi/5
        [Route("api/GroupBuyOrderImageApi/{id}")]
        [HttpGet]
        public List<GroupBuyMenuImage> GetGroupbuyList(int id)
        {
            List<GroupBuyMenuImage> images;
            using (var db = new HoGameEISContext())
            {
                images = db.GroupBuyMenuImages.Where(o => o.GroupBuyId == id).ToList();
            }

            foreach (var img in images)
            {
                img.ImageUrl = String.Format("{0}{1}", ImageUploadUrl, img.ImageUrl);
            }

            return images;
        }

        // GET: api/GroupBuyImageApi/5
        [Authorize]
        public List<GroupBuyStoreMenuImage> Get(int id)
        {
            List<GroupBuyStoreMenuImage> images = new List<GroupBuyStoreMenuImage>();
            using (var db = new HoGameEISContext())
            {
                images = db.GroupBuyStoreMenuImages.Where(o => o.StoreId == id).ToList();

            }

            foreach (var img in images)
            {
                img.ImageUrl = String.Format("{0}{1}", ImageUploadUrl, img.ImageUrl);
            }

            return images;
        }


        // POST: api/GroupBuyImageApi
        [Authorize]
        [ValidateMimeMultipartContentFilter]
        public async Task<List<GroupBuyStoreMenuImage>> Post(int id)
        {
            //var streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);

            //await Request.Content.ReadAsMultipartAsync(streamProvider);



            var provider = new MultipartFileStreamProvider(Path.GetTempPath());

            // Read the form data.
            await Request.Content.ReadAsMultipartAsync(provider);
            foreach (MultipartFileData file in provider.FileData)
            {
                //string fileName = blobSaveFile(file);
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
            return Get(id);
        }


        // PUT: api/GroupBuyImageApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GroupBuyImage/5
        [Authorize]
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

            deleteblobFile(image.ImageUrl);
        }

        public static string blobSaveFile(MultipartFileData file)
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

            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = ImageContainer.GetBlockBlobReference(fileName);

            // Create or overwrite the "myblob" blob with contents from a local file.
            using (var fileStream = System.IO.File.OpenRead(file.LocalFileName))
            {
                blockBlob.UploadFromStream(fileStream);
            }
            if (File.Exists(file.LocalFileName))
                File.Delete(file.LocalFileName);


            return fileName;
        }


        public static void deleteblobFile(string fileName)
        {
            deleteLocalFile(fileName);
            /*try
            {
                using (var db = new HoGameEISContext())
                {
                    //檢查菜單圖片已存在團購，就不刪除實體圖片。
                    if (!db.GroupBuyMenuImages.ToList().Exists(o => o.ImageUrl == fileName))
                    {
                        // Retrieve reference to a blob named "myblob".
                        CloudBlockBlob blockBlob = ImageContainer.GetBlockBlobReference(fileName);
                        blockBlob.Delete();
                    }
                }


            }
            catch (Exception ex)
            {

            }*/
        }

        public static string localSaveFile(MultipartFileData file)
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

            string newPath = Path.Combine(ConfigurationManager.AppSettings["ImageLocalPath"], fileName);

            // Ensure that the target does not exist.
            if (File.Exists(newPath))
                File.Delete(newPath);

            File.Move(file.LocalFileName, newPath);

            if (File.Exists(file.LocalFileName))
                File.Delete(file.LocalFileName);

            //fileName = String.Format("/Content/uploads/{1}", ServerUploadFolder, fileName);

            return fileName;
        }

        public static void deleteLocalFile(string fileName)
        {
            try
            {
                using (var db = new HoGameEISContext())
                {
                    //檢查菜單圖片已存在團購，就不刪除實體圖片。
                    if (!db.GroupBuyMenuImages.ToList().Exists(o => o.ImageUrl == fileName))
                    {
                        string filepath = Path.Combine(ConfigurationManager.AppSettings["ImageLocalPath"], fileName);
                        if (File.Exists(filepath))
                            File.Delete(filepath);
                    }
                }


            }
            catch (Exception ex)
            {

            }
        } 
        /**/
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
