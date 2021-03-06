﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _5_uiRouter.Controllers
{
    public class TestApiController : ApiController
    {
        // GET: api/TestApi
        public IEnumerable<string> Get(int second)
        {
            System.Threading.Thread.Sleep(second * 1000);
            return new string[] { "value1 " + DateTime.Now.ToLongTimeString(), "value2 " + DateTime.Now.ToLongTimeString() };
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