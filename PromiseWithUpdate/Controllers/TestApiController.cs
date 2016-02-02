using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PromiseWithUpdate.Controllers
{
    public class TestApiController : ApiController
    {
        // GET: api/TestApi
        public string Get(int seconds)
        {
            System.Threading.Thread.Sleep(seconds * 1000);
            return "request server time " + DateTime.Now.ToLongTimeString();
        }

        //// GET: api/TestApi/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/TestApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TestApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TestApi/5
        public void Delete(int id)
        {
        }
    }
}
