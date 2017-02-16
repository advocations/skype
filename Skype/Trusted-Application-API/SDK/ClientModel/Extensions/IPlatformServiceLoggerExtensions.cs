using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SfB.PlatformService.SDK.Common;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    public static class LoggerExtensions
    {
        public static async Task LogHttpResponseAsync(this Logger logger, HttpResponseMessage response, string requestId, bool isIncomingRequest)
        {
            var sb = new StringBuilder();
            sb.AppendLine();
            try
            {
                var myResponse = new SerializableHttpResponseMessage();
                await myResponse.InitializeAsync(response, requestId, isIncomingRequest).ConfigureAwait(false);

                string logString = await myResponse.GetLogStringAsync().ConfigureAwait(false);
                logger.Information(logString);
            }
            catch (Exception ex)
            {
                logger.Warning("Log http response failed.  Ex: " + ex.ToString());
            }
        }

        public static async Task LogHttpRequestAsync(this Logger logger, HttpRequestMessage request, string requestId, bool isIncomingRequest)
        {
            var sb = new StringBuilder();
            try
            {
                var myRequest = new SerializableHttpRequestMessage();
                await myRequest.InitializeAsync(request, requestId, isIncomingRequest).ConfigureAwait(false);

                string logString = await myRequest.GetLogStringAsync().ConfigureAwait(false);
                logger.Information(logString);
            }
            catch (Exception ex)
            {
                logger.Warning("Log http request failed.  Ex: " + ex.ToString());
            }
        }
    }
}
