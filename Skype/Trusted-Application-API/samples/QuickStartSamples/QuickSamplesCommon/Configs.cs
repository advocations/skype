using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
