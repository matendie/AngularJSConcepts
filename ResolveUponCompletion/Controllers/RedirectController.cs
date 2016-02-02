using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResolveUponCompletion.Controllers
{
    public class RedirectController : ApiController
    {
        // GET: api/Redirect
        public IEnumerable<string> Get()
        {
            System.Threading.Thread.Sleep(1000);
            return new string[] { "/delay/redirect" };
        }

        // GET: api/Redirect/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Redirect
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Redirect/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Redirect/5
        public void Delete(int id)
        {
        }
    }
}
