using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using _5GCalc.Models;
using System.IO;
using System.Net.Http.Headers;

namespace _5GCalc.API
{


    public class DefaultAPIController : ApiController
    {
        Models.Product[] products = new Product[]
        {
            new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
            new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
            new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M }
        };

        [HttpGet]
        public IEnumerable<Product> IndexAlpha()
        {
            return products;
        }

        public Person GetPerson()
        {
            var p = new Person() { FirstName = "Howard", LuckyNumber = 9 };
            return p;
        }

        public IHttpActionResult GetPerson2()
        {
            var p = new Person() { FirstName = "Howard", LuckyNumber = 9 };
            return Ok(p);
        }

        [HttpGet]
        public IHttpActionResult RedirectToOSU()
        {
            IHttpActionResult response;
            //we want a 303 with the ability to set location
            HttpResponseMessage responseMsg = new HttpResponseMessage(HttpStatusCode.RedirectMethod);
            responseMsg.Headers.Location = new Uri("http://www.osu.edu");
            response = ResponseMessage(responseMsg);
            return response;
        }

        [HttpGet]
        public IHttpActionResult RedirectToB()
        {
            IHttpActionResult response;
            //we want a 303 with the ability to set location
            HttpResponseMessage responseMsg = new HttpResponseMessage(HttpStatusCode.RedirectMethod);
            responseMsg.Headers.Location = new Uri("redirecttoa", UriKind.Relative);
            response = ResponseMessage(responseMsg);
            return response;
        }

        [HttpGet]
        public IHttpActionResult RedirectToA()
        {
            IHttpActionResult response;
            //we want a 303 with the ability to set location
            HttpResponseMessage responseMsg = new HttpResponseMessage(HttpStatusCode.RedirectMethod);
            responseMsg.Headers.Location = new Uri("redirecttob", UriKind.Relative);
            response = ResponseMessage(responseMsg);
            return response;
        }

        [HttpGet]
        //downloads file
        public HttpResponseMessage GetFile(string filename=null, string filePath=null)
        {
            var path = filePath ?? @"C:\Temp\dt.txt";
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(path, FileMode.Open);
            result.Content = new StreamContent(stream);
            
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = filename ?? "temp.txt"
            };
            return result;
        }
    }
}
