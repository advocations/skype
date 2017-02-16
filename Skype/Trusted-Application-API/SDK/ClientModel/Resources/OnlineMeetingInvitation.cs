using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.SfB.PlatformService.SDK.Common;
using System;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class OnlineMeetingInvitation : Invitation<OnlineMeetingInvitationResource, OnlineMeetingInvitationCapability>, IOnlineMeetingInvitation
    {
        #region Public properties

        /// <summary>
        /// Anonymous meeting url
        /// </summary>
        public string MeetingUrl
        {
            get { return PlatformResource?.MeetingUri ?? string.Empty; }
        }

        #endregion

        #region Constructor

        internal OnlineMeetingInvitation(IRestfulClient restfulClient, OnlineMeetingInvitationResource resource, Uri baseUri, Uri resourceUri, Communication parent)
            : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
        }

        #endregion

        #region Public methods

        public override bool Supports(OnlineMeetingInvitationCapability capability)
        {
            return false;
        }

        #endregion
    }
}
