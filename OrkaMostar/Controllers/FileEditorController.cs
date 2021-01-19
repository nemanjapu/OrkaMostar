using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrkaMostar.Controllers
{
    [Authorize]
    public class FileEditorController : Controller
    {
        public ActionResult SelectImage()
        {
            var images = Directory.EnumerateFiles(Server.MapPath("~/DynamicContent/UploadedImages"));

            return View("Index", images);
        }

        [HttpPost]
        public void Upload()
        {
            if (Request.Files.Count != 0)
            {
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var file = Request.Files[i];

                    var fileName = Path.GetFileName(file.FileName);

                    var path = Path.Combine(Server.MapPath("~/DynamicContent/UploadedImages/"), fileName);
                    file.SaveAs(path);
                }
            }
        }

        [HttpPost]
        public ActionResult Delete(string fileName)
        {
            string fullPath = Request.MapPath("~/DynamicContent/UploadedImages/" + fileName);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
            return new HttpStatusCodeResult(System.Net.HttpStatusCode.OK);
        }
    }
}