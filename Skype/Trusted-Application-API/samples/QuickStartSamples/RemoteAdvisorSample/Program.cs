using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.Rtc.Internal.RestAPI.Common.MediaTypeFormatters;
using Microsoft.Rtc.Internal.RestAPI.ResourceModel;
using Microsoft.SfB.PlatformService.SDK.ClientModel;
using Microsoft.SfB.PlatformService.SDK.Common;
using QuickSamplesCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


/// <summary>
/// Simple sampel on remote advisor scenario:
/// 1. Schedule an adhoc meeting with SkypeforBusiness
/// 2. And get anon token of that adhoc meeting for webSDK or AppSDK anon user to join the meeting
/// </summary>
namespace RemoteAdvisorSample
{    class Program
    {
        static void Main(string[] args)
        {
            RemoteAdvisorSample sample = new RemoteAdvisorSample();
            try
            {
                sample.Run().Wait();               
            }
            catch (AggregateException ex)
            {
                Console.WriteLine("Exception hit:" + ex.GetBaseException().ToString());
            }
        }
    }

    internal class RemoteAdvisorSample
    {
        public async Task Run()
        {
            ConsoleLogger logger = new ConsoleLogger();
            logger.HttpRequestResponseNeedsToBeLogged = true;//Set to true if you want to log all http request and responses

            //Prepare platform

            //For all public developers
            /*
            ClientPlatformSettings platformSettings = new ClientPlatformSettings(
            QuickSamplesConfig.AAD_ClientSecret,
             Guid.Parse(QuickSamplesConfig.AAD_ClientId),
              false
                );

            */

            //For all TAP partners
           
            ClientPlatformSettings platformSettings = 
                new ClientPlatformSettings(null, new Guid(QuickSamplesConfig.AAD_ClientId), null, false, QuickSamplesConfig.AAD_ClientSecret, true);
            

            var platform = new ClientPlatform(platformSettings, logger);

            //Prepare endpoint
            var eventChannel = new FakeEventChannel();
            var endpointSettings = new ApplicationEndpointSettings(new SipUri(QuickSamplesConfig.ApplicationEndpointId));
            ApplicationEndpoint applicationEndpoint = new ApplicationEndpoint(platform, endpointSettings, eventChannel);

            var loggingContext = new LoggingContext(Guid.NewGuid());
            await applicationEndpoint.InitializeAsync(loggingContext).ConfigureAwait(false);
            await applicationEndpoint.InitializeApplicationAsync(loggingContext).ConfigureAwait(false);


            //Schedule meeting
            var adhocMeeting =  await applicationEndpoint.Application.GetAdhocMeetingResourceAsync(loggingContext,
                new AdhocMeetingInput
                {
                    AccessLevel = AccessLevel.Everyone,
                    Subject = Guid.NewGuid().ToString("N") + "testMeeting"
                });

            logger.Information("ad hoc meeting uri : " + adhocMeeting.OnlineMeetingUri);
            logger.Information("ad hoc meeting join url : " + adhocMeeting.JoinUrl);

            //Get anon join token
           AnonymousApplicationTokenResource anonToken =  await applicationEndpoint.Application.GetAnonApplicationTokenAsync(loggingContext, new AnonymousApplicationTokenInput
            {
                ApplicationSessionId = Guid.NewGuid().ToString(), //Should be unique everytime
                AllowedOrigins = "https://contoso.com;https://litware.com;http://www.microsoftstore.com/store/msusa/en_US/home", //Fill your own web site, For allow cross domain using
                MeetingUrl = adhocMeeting.JoinUrl
            }
           );


            logger.Information("Get anon token : " + anonToken.AuthToken);
            logger.Information("Get discover url for web SDK : " + anonToken.AnonymousApplicationsDiscover.Href);
        }
    }

}
