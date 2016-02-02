using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(_5_uiRouter.Startup))]
namespace _5_uiRouter
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
