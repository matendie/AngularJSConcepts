using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PromiseWithUpdate.Startup))]
namespace PromiseWithUpdate
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
