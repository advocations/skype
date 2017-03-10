using System.Configuration;

namespace QuickSamplesCommon
{
    public class QuickSamplesConfig
    {
        public static string ApplicationEndpointId { get; private set; }
        public static string AAD_ClientId  { get; private set; }
        public static string AAD_ClientSecret  { get; private set; }

        static QuickSamplesConfig()
        {
            ApplicationEndpointId = ConfigurationManager.AppSettings["ApplicationEndpointId"];
            AAD_ClientId = ConfigurationManager.AppSettings["AAD_ClientId"];
            AAD_ClientSecret = ConfigurationManager.AppSettings["AAD_ClientSecret"];
        }
    }
}
