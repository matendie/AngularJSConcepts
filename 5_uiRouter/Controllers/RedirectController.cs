using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _5_uiRouter.Controllers
{
    public class RedirectController : ApiController
    {
        // GET: api/Redirect
        public IEnumerable<string> Get()
        {
            System.Threading.Thread.Sleep(1000);
            return new string[] { "Redirect" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}