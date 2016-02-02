using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ControllerInheritance.Startup))]
namespace ControllerInheritance
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
