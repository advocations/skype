using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.SfB.PlatformService.SDK.Common;
using System;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class ParticipantInvitation : Invitation<ParticipantInvitationResource, ParticipantInvitationCapability>, IParticipantInvitation
    {
        internal ParticipantInvitation(IRestfulClient restfulClient, ParticipantInvitationResource resource, Uri baseUri, Uri resourceUri, Communication parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
        }

        public override bool Supports(ParticipantInvitationCapability capability)
        {
            return false;
        }
    }
}
