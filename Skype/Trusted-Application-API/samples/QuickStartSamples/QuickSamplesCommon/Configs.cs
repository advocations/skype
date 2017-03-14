using System.Configuration;

namespace QuickSamplesCommon
{
    public static class QuickSamplesConfig
    {
        public static string ApplicationEndpointId { get; }

        public static string AAD_ClientId { get; }

        public static string AAD_ClientSecret { get; }

        static QuickSamplesConfig()
        {
            ApplicationEndpointId = ConfigurationManager.AppSettings["ApplicationEndpointId"];
            AAD_ClientId = ConfigurationManager.AppSettings["AAD_ClientId"];
            AAD_ClientSecret = ConfigurationManager.AppSettings["AAD_ClientSecret"];
        }
    }
}
