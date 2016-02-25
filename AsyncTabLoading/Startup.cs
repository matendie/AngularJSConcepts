using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AsyncTabLoading.Startup))]
namespace AsyncTabLoading
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
