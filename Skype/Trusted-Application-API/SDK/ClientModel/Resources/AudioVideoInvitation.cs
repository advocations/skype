using System;
using System.Threading.Tasks;
using Microsoft.SfB.PlatformService.SDK.Common;
using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.Rtc.Internal.RestAPI.Common.MediaTypeFormatters;
using System.Net.Http;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class AudioVideoInvitation : Invitation<AudioVideoInvitationResource, AudioVideoInvitationCapability>, IAudioVideoInvitation
    {
        #region Constructor

        internal AudioVideoInvitation(IRestfulClient restfulClient, AudioVideoInvitationResource resource, Uri baseUri, Uri resourceUri, Communication parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
        }

        #endregion

        #region Public methods

        public Task<HttpResponseMessage> AcceptAsync(LoggingContext loggingContext)
        {
            string href = PlatformResource?.AcceptLink?.Href;
            if (string.IsNullOrWhiteSpace(href))
            {
                throw new CapabilityNotAvailableException("Link to accept AudioVideoInvitation is not available.");
            }

            Uri acceptLink = UriHelper.CreateAbsoluteUri(BaseUri, href);

            var input = new AcceptInput() { MediaHost = MediaHostType.Remote };
            return PostRelatedPlatformResourceAsync(acceptLink, input, new ResourceJsonMediaTypeFormatter(), loggingContext);
        }

        public Task<HttpResponseMessage> ForwardAsync(LoggingContext loggingContext, string forwardTarget)
        {
            if (string.IsNullOrWhiteSpace(forwardTarget))
            {
                throw new ArgumentNullException(nameof(forwardTarget), nameof(forwardTarget) + " should not be null or whitespace");
            }

            string href = PlatformResource?.ForwardLink?.Href;
            if (string.IsNullOrWhiteSpace(href))
            {
                throw new CapabilityNotAvailableException("Link to forward AudioVideoInvitation is not available.");
            }

            Uri forwardLink = UriHelper.CreateAbsoluteUri(BaseUri, href);

            var input = new ForwardInput() { To = forwardTarget };
            return PostRelatedPlatformResourceAsync(forwardLink, input, new ResourceJsonMediaTypeFormatter(), loggingContext);
        }

        public Task<HttpResponseMessage> DeclineAsync(LoggingContext loggingContext)
        {
            string href = PlatformResource?.DeclineOperationLink?.Href;
            if (string.IsNullOrWhiteSpace(href))
            {
                throw new CapabilityNotAvailableException("Link to decline AudioVideoInvitation is not available.");
            }

            Uri declineLink = UriHelper.CreateAbsoluteUri(BaseUri, href);

            var input = string.Empty;
            return PostRelatedPlatformResourceAsync(declineLink, input, new ResourceJsonMediaTypeFormatter(), loggingContext);
        }

        public override bool Supports(AudioVideoInvitationCapability capability)
        {
            string href = null;
            switch(capability)
            {
                case AudioVideoInvitationCapability.Accept:
                    {
                        href = PlatformResource?.AcceptLink?.Href;
                        break;
                    }
                case AudioVideoInvitationCapability.Forward:
                    {
                        href = PlatformResource?.ForwardLink?.Href;
                        break;
                    }
                case AudioVideoInvitationCapability.Decline:
                    {
                        href = PlatformResource?.DeclineOperationLink?.Href;
                        break;
                    }
            }

            return !string.IsNullOrWhiteSpace(href);
        }

        #endregion
    }
}
