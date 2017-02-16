using Microsoft.SfB.PlatformService.SDK.Common;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    public class ApplicationEndpointSettings
    {
        public SipUri ApplicationEndpointId { get; private set; }

        internal TargetServiceType TargetServiceType { get; private set; }

        public ApplicationEndpointSettings(SipUri applicationEndpointId)
        {
            ApplicationEndpointId = applicationEndpointId;
            TargetServiceType     = TargetServiceType.PlatformService;
        }
    }
}
