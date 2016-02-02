using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ResolveUponCompletion.Startup))]
namespace ResolveUponCompletion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
