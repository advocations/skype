using Microsoft.SfB.PlatformService.SDK.Common;
using System;
using System.Threading.Tasks;
using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.Rtc.Internal.RestAPI.Common.MediaTypeFormatters;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class BridgedParticipants : BasePlatformResource<BridgedParticipantsResource, BridgedParticipantsCapability>, IBridgedParticipants
    {
        internal BridgedParticipants(IRestfulClient restfulClient, BridgedParticipantsResource resource, Uri baseUri, Uri resourceUri, Conversation parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
            if (parent == null)
            {
                throw new ArgumentNullException(nameof(parent), "Conversation is required");
            }
        }

        public override bool Supports(BridgedParticipantsCapability capability)
        {
            return false;
        }
    }

    internal class BridgedParticipant : BasePlatformResource<BridgedParticipantResource, BridgedParticipantCapability>, IBridgedParticipant
    {
        #region Constructor

        internal BridgedParticipant(IRestfulClient restfulClient, BridgedParticipantResource resource, Uri baseUri, Uri resourceUri, ConversationBridge parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
            if (parent == null)
            {
                throw new ArgumentNullException(nameof(parent), "ConversationBridge is required");
            }
        }

        #endregion

        #region Public methods

        public override bool Supports(BridgedParticipantCapability capability)
        {
            return false;
        }

        public Task UpdateAsync(string displayName, bool isEnableFilter, LoggingContext loggingContext = null)
        {
            Uri bridgeUri = UriHelper.CreateAbsoluteUri(this.BaseUri, this.PlatformResource.SelfUri);

            var input = new BridgedParticipantInput()
            {
                DisplayName = displayName,
                MessageFilterState = isEnableFilter ? FilterState.Enabled : FilterState.Disabled,
                Uri = this.PlatformResource.Uri
            };

            //Waiting for bridgedParticipant operation added
            return PutRelatedPlatformResourceAsync(bridgeUri, input, new ResourceJsonMediaTypeFormatter(), loggingContext);
        }

        [Obsolete("Please use the other variation")]
        public Task UpdateAsync(LoggingContext loggingContext, string displayName, bool isEnableFilter)
        {
            return UpdateAsync(displayName, isEnableFilter, loggingContext);
        }

        #endregion
    }
}
