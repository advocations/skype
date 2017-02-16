using Microsoft.Rtc.Internal.RestAPI.ResourceModel;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal static class ErrorInformationExtensions
    {
        internal static string GetErrorInformationString(this ErrorInformation errorInformation)
        {
            return string.Format("ErrorCode {0}, Error Subcode {1}, Messaging {2}, Debug Info {3}",
                errorInformation.Code.ToString(),
                errorInformation.Subcode.HasValue ? errorInformation.Subcode.Value.ToString() : string.Empty,
                errorInformation.Message,
                errorInformation.GetDebugPropertiesAsString());
        }
    }
}
