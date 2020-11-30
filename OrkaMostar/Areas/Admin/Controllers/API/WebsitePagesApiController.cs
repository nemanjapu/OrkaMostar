using OrkaMostar.Core;
using OrkaMostar.Core.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace OrkaMostar.Areas.Admin.Controllers.API
{
    [Authorize]
    public class WebsitePagesApiController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public WebsitePagesApiController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [ResponseType(typeof(WebsitePage))]
        public IHttpActionResult AddNewWebsitePage(WebsitePage websitePage, bool isBlog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _unitOfWork.WebsitePages.AddPage(websitePage, false);
            _unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = websitePage.Id }, websitePage);
        }

        //[HttpPost]
        //public IHttpActionResult DeleteWebsitePage(int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }

        //    _unitOfWork.WebsitePages.RemovePage(id);
        //    _unitOfWork.Complete();

        //    return Ok();
        //}

        public IQueryable<WebsitePage> GetWebsitePagesForParent(int id)
        {
            return _unitOfWork.WebsitePages.GetActivePagesByMenuId(id).AsQueryable();
        }
    }
}
