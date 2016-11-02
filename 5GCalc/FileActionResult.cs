using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.Threading;
using System.IO;
using System.Net.Http.Headers;

namespace _5GCalc
{
    public class FileActionResult : IHttpActionResult
    {
        public FileActionResult(string path)
        {
            this.Path= path;
        }

        public string Path { get; private set; }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response.Content = new StreamContent(File.OpenRead(Path));
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");

            // NOTE: Here I am just setting the result on the Task and not really doing any async stuff. 
            // But let's say you do stuff like contacting a File hosting service to get the file, then you would do 'async' stuff here.

            return Task.FromResult(response);
        }

        
    }
}