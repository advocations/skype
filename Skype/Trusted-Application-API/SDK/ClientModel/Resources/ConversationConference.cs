using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.SfB.PlatformService.SDK.Common;
using System;
using System.Threading.Tasks;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class ConversationConference : BasePlatformResource<ConversationConferenceResource, ConversationConferenceCapability>, IConversationConference
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="restfulClient"></param>
        /// <param name="resource"></param>
        /// <param name="baseUri"></param>
        /// <param name="resourceUri"></param>
        /// <param name="parent"></param>
        internal ConversationConference(IRestfulClient restfulClient, ConversationConferenceResource resource, Uri baseUri, Uri resourceUri, Conversation parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
        }

        #endregion

        #region Public properties

        /// <summary>
        /// Get The onlineMeeting Uri property
        /// </summary>
        public string OnlineMeetingUri
        {
            get { return PlatformResource?.OnlineMeetingUri; }
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Terminate Online Meeting
        /// </summary>
        /// <param name="loggingContext"></param>
        /// <returns></returns>
        public Task TerminateAsync(LoggingContext loggingContext = null)
        {
            string href = PlatformResource?.TerminateMeetingResourceLink?.Href;
            if (string.IsNullOrWhiteSpace(href))
            {
                throw new CapabilityNotAvailableException("Link to terminate messaging is not available.");
            }

            Uri stopLink = UriHelper.CreateAbsoluteUri(this.BaseUri, href);
            return this.PostRelatedPlatformResourceAsync(stopLink, null, loggingContext);
        }

        public override bool Supports(ConversationConferenceCapability capability)
        {
            string href = null;
            switch (capability)
            {
                case ConversationConferenceCapability.Terminate:
                    {
                        href = PlatformResource?.TerminateMeetingResourceLink?.Href;
                        break;
                    }
            }

            return !string.IsNullOrWhiteSpace(href);
        }

        #endregion
    }
}
