using Microsoft.Azure;
using Microsoft.Practices.Unity;
using Microsoft.SfB.PlatformService.SDK.Samples.ApplicationCore;
using Microsoft.SfB.PlatformService.SDK.Common;

namespace Microsoft.SfB.PlatformService.SDK.Samples.FrontEnd
{
    /// <summary>
    /// The Unity Configuration.
    /// </summary>
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            //Register global used interface implementation here
            var container = IOCHelper.DefaultContainer;
            container.RegisterType<IPlatformServiceLogger, ConsoleLogger>(new ContainerControlledLifetimeManager(),
               new InjectionFactory(c => new ConsoleLogger()));
        }
    }
}