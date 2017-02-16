using Microsoft.SfB.PlatformService.SDK.Common;
using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.Rtc.Internal.RestAPI.Common.MediaTypeFormatters;
using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.IO;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class Application : BasePlatformResource<ApplicationResource, ApplicationCapability>, IApplication
    {
        #region Private fields

        /// <summary>
        /// Communication
        /// </summary>
        private Communication m_communication;

        #endregion

        #region Public properties

        /// <summary>
        /// Get Communication
        /// </summary>
        public ICommunication Communication
        {
            get { return m_communication; }
        }

        #endregion

        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="restfulClient"></param>
        /// <param name="resource"></param>
        /// <param name="baseUri"></param>
        /// <param name="resourceUri"></param>
        internal Application(IRestfulClient restfulClient, ApplicationResource resource, Uri baseUri, Uri resourceUri, object parent)
                : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Call Get on application and initialize communication resource
        /// </summary>
        /// <param name="loggingContext"></param>
        /// <returns></returns>
        public async Task RefreshAndInitializeAsync(LoggingContext loggingContext)
        {
            Logger.Instance.Information("calling Application.RefreshAndInitializeAsync");
            await this.RefreshAsync(loggingContext).ConfigureAwait(false);
            if (this.PlatformResource?.Communication != null)
            {
                Uri resourceUri = UriHelper.CreateAbsoluteUri(this.BaseUri, this.PlatformResource.Communication.SelfUri);
                m_communication = new Communication(this.RestfulClient, this.PlatformResource.Communication, this.BaseUri, resourceUri, this);
            }
            else
            {
                throw new RemotePlatformServiceException("Not get communication resource from application");
            }
        }

        public async Task<AnonymousApplicationTokenResource> GetAnonApplicationTokenAsync(LoggingContext loggingContext, AnonymousApplicationTokenInput input)
        {
            if(input == null)
            {
                throw new ArgumentNullException(nameof(input));
            }

            Logger.Instance.Information("Calling Application.RefreshAsync");
            await this.RefreshAsync(loggingContext).ConfigureAwait(false);

            Logger.Instance.Information("Start to fetching anonToken");

            string href = PlatformResource?.AnonymousApplicationTokens?.Href;
            if(href == null)
            {
                throw new CapabilityNotAvailableException("Link to get anonymous tokens is not available.");
            }

            Uri url = UriHelper.CreateAbsoluteUri(this.BaseUri, href);

            HttpResponseMessage httpResponse = await this.PostRelatedPlatformResourceAsync(url, input, new ResourceJsonMediaTypeFormatter(), loggingContext).ConfigureAwait(false);

            try
            {
                //Does it neccessary to create a helper class from Common layer to do deserialize?
                Stream platformResourceStream = await httpResponse.Content.ReadAsStreamAsync().ConfigureAwait(false);
                return MediaTypeFormattersHelper.ReadContentWithType(typeof(AnonymousApplicationTokenResource), httpResponse.Content.Headers.ContentType, platformResourceStream) as AnonymousApplicationTokenResource;
            }
            catch (Exception ex)
            {
                Logger.Instance.Error("Failed to diserialize anon token ");
                throw new RemotePlatformServiceException("Not get valid anon token resource from server, deserialize failure.", ex);
            }
        }
        
        /// <summary>
        /// Get adhoc meeting from application directly
        /// </summary>
        /// <param name="loggingContext"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<AdhocMeetingResource> GetAdhocMeetingResourceAsync(LoggingContext loggingContext, AdhocMeetingInput input)
        {
            if (input == null)
            {
                throw new ArgumentNullException(nameof(input));
            }

            Logger.Instance.Information("calling Application.RefreshAndInitializeAsync");
            await this.RefreshAsync(loggingContext).ConfigureAwait(false);
            AdhocMeetingResource adhocMeetingResource = null;

            string href = PlatformResource?.OnlineMeetings?.SelfUri;
            if(href == null)
            {
                throw new CapabilityNotAvailableException("Link to create adhoc meeting is not available.");
            }

            Logger.Instance.Information("Start to fetching adhocMeetingResource");
            var url = UriHelper.CreateAbsoluteUri(this.BaseUri, href);

            var httpResponse = await this.PostRelatedPlatformResourceAsync(url, input, new ResourceJsonMediaTypeFormatter(), loggingContext).ConfigureAwait(false);
                
            try
            {
                var skypeResourceStream = await httpResponse.Content.ReadAsStreamAsync().ConfigureAwait(false);
                adhocMeetingResource = MediaTypeFormattersHelper.ReadContentWithType(typeof(AdhocMeetingResource), httpResponse.Content.Headers.ContentType, skypeResourceStream) as AdhocMeetingResource;
            }
            catch (Exception ex)
            {
                Logger.Instance.Error("Failed to diserialize anon token ");
                throw new RemotePlatformServiceException("Not get valid AdhocMeetingResource from server, deserialize failure.", ex);
            }

            return adhocMeetingResource;
        }


        public override bool Supports(ApplicationCapability capability)
        {
            string href = null;

            switch(capability)
            {
                case ApplicationCapability.GetAnonApplicationToken :
                    {
                        href = PlatformResource?.AnonymousApplicationTokens?.Href;
                        break;
                    }
                case ApplicationCapability.GetAdhocMeetingResource:
                    {
                        href = PlatformResource?.OnlineMeetings?.SelfUri;
                        break;
                    }
            }

            return !string.IsNullOrEmpty(href);
        }

        #endregion
    }
}
