using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RoutingWithinMVC.Startup))]
namespace RoutingWithinMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
