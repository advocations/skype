using System;
using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.SfB.PlatformService.SDK.Common;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    /// <summary>
    /// Define the participant messaging class
    /// </summary>
    internal class ParticipantMessaging : BasePlatformResource<ParticipantMessagingResource, ParticipantMessagingCapability>, IParticipantMessaging
    {
        #region Constructor

        internal ParticipantMessaging(IRestfulClient restfulClient, ParticipantMessagingResource resource, Uri baseUri, Uri resourceUri, Participant parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
            if (parent == null)
            {
                throw new ArgumentNullException(nameof(parent), "Conversation is required");
            }
        }

        #endregion

        #region Public methods

        public override bool Supports(ParticipantMessagingCapability capability)
        {
            return false;
        }

        #endregion
    }
}
