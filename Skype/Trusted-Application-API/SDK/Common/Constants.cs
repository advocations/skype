using System;

namespace Microsoft.SfB.PlatformService.SDK.Common
{
    public static class Constants
    {
        public const string EmailRegex = "^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?$";
        public const string SipScheme = "sip";
        public const string LocalEndpoint = "LocalEndpoint";
        public const string OriginalToken = "OriginalToken";
        public const string PartnerServiceRetryStrategy = "PartnerServiceRetryStrategy";
        public const string RemotePlatformServiceUri = "RemotePlatformServiceUri";
        public const string PlatformEventReceivedTime = "PlatformEventReceivedTime";
        public const string PlatformEventsCorrelationId = "PlatformEventsCorrelationId";
        public const string PlatformEventsClientRequestId = "PlatformEventsClientRequestId";
        public const string PlatformEventsServerFqdn = "PlatformEventsServerFqdn";
        public const string PlatformResponseCorrelationId = "PlatformResponseCorrelationId";
        public const string PlatformResponseServerFqdn = "PlatformResponseServerFqdn";
        public const string PlatformEvents = "PlatformEvents";
        public const string Unknown = "Unknown";
        public const string PlatformApplicationsUriFormat = "{0}?endpointId={1}";
        public const string TenantIdClaim = "http://schemas.microsoft.com/identity/claims/tenantid";
        public const string ApplicationIdClaim = "appid";
        public const string SkypeForBusinessApplicationId = "SkypeForBusinessApplicationId";
        public const string ConversationExtensionQueuingOperationContextFormat = "{0}&{1}";
        public const string SipFormat = "sip:{0}";
        public const string ParticipantsResourceExpand = "expand";
        public const string EndpointId = "endpointId";
        public const string STORAGE_CONNECTION = "Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString";
        public const string SERVICEBUS_CONNECTION = "Microsoft.ServiceBus.ConnectionString";
        public const string JOB_METADATA_TABLE_NAME = "platformservicenotificationjobmetadata";

        #region PlatformService Constants
        public const string UcapMsCorrelationId = "X-MS-Correlation-Id";
        public const string UcapMsServerFqdn = "X-MS-Server-Fqdn";
        public const string UcapClientRequestId = "client-request-id";
        public const string TextPlainContentType = "text/plain";
        public const string TextHtmlContentType = "text/html";
        public const string TextJsonContentType = "text/json";
        public const string ConversationExtensionServiceName = "InviteToConference";
        public const string IsRejoin = "IsRejoin";
        public const string Etag = "etag";

        // Misc
        public const string BaseUri = "baseuri";
        public const string Sender = "sender";
        public const string Events = "events";
        public const string Prefix = "ms:rtc:saas:";
        public const string Link = "link";
        public const string Links = "_links";
        public const string Embedded = "_embedded";
        public const string Rel = "rel";
        public const string Href = "href";
        public const string Self = "self";
        public const string Direction = "direction";
        public const string Importance = "importance";
        public const string OperationId = "operationId";
        public const string State = "state";
        public const string Subject = "subject";
        public const string ThreadId = "threadId";
        public const string HtmlMessage = "htmlMessage";
        public const string PlainMessage = "plainMessage";
        public const string TimeStamp = "timeStamp";
        public const string Reason = "reason";
        public const string Failure = "Failure";
        public const string Status = "status";
        public const string OnBehalfOf = "onBehalfOf";
        public const string CallbackContext = "callbackContext";
        public const string LoggingContext = "LoggingContext";
        public const string Input = "input";

        // Conversation
        public const string ActiveModalities = "activeModalities";

        // Messaging Modality
        public const string NegotiatedMessageFormats = "negotiatedMessageFormats";
        public const string Content = "content";
        public const string ContentType = "contentType";

        // Participant
        public const string Anonymous = "anonymous";
        public const string Local = "local";
        public const string InLobby = "inLobby";
        public const string Name = "name";
        public const string Organizer = "organizer";
        public const string OtherPhoneNumber = "otherPhoneNumber";
        public const string PhoneNumber = "phoneNumber";
        public const string Role = "role";
        public const string SourceNetwork = "sourceNetwork";
        public const string Uri = "uri";
        public const string Title = "title";

        // AudioVideo
        public const string SmallMediaOffer = "mediaOffer";

        // Conversation Externsion Multipart
        public const string ConversationExternsionMultipartContentId = "Content-ID";
        public const string ConversationExternsionMultipartContent = "content";
        public const string ConversationExternsionMultipartContentPositionFormat = "CID:{0}";
        public const string ConversationExternsionServiceName = "serviceName";
        public const string ConversationExternsionMultipartServiceUrl = "serviceUrl";
        public const string ConversationExternsionMultipartJsonContentTypeParameter = "multipart/related; type=\"application/json\"";

        //Logging purpose
        /// <summary>
        /// Incoming request - start tag
        /// </summary>
        public const string NotifierInboundHttpRequestStart = ">>>>>NotifierInboundHttpRequestStart";
        /// <summary>
        /// Incoming request - end tag
        /// </summary>
        public const string NotifierInboundHttpRequestEnd = "<<<<<NotifierInboundHttpRequestEnd";
        /// <summary>
        /// Response to the incoming request - start tag
        /// </summary>
        public const string NotifierInboundHttpRequestResponseStart = ">>>>>NotifierInboundHttpRequestResponseStart";
        /// <summary>
        /// Response to the incoming request - end tag
        /// </summary>
        public const string NotifierInboundHttpRequestResponseEnd = "<<<<<NotifierInboundHttpRequestResponseEnd";

        /// <summary>
        ///
        /// </summary>
        public const string TransportOutboundHttpRequestStart = ">>>>>TransportOutboundHttpRequestStart";
        /// <summary>
        ///
        /// </summary>
        public const string TransportOutboundHttpRequestEnd = "<<<<<TransportOutboundHttpRequestEnd";
        /// <summary>
        ///
        /// </summary>
        public const string TransportOutboundHttpRequestResponseStart = ">>>>>TransportOutboundHttpRequestResponseStart";
        /// <summary>
        ///
        /// </summary>
        public const string TransportOutboundHttpRequestResponseEnd = "<<<<<TransportOutboundHttpRequestResponseEnd";
        #endregion

        #region Http Header Names

        public const string ErrorCodeHeaderName = "x-ms-error-code";
        public const string TrackingIdHeaderName = "x-ms-tracking-id";
        public const string VisitIdHeaderName = "x-ms-visit-id";
        public const string EngagementIdHeaderName = "x-ms-engagement-id";
        public const string PartnerIdHeaderName = "x-ms-partner-id";

        #endregion

        #region parameters
        public const string AAD_MetadataUri = "https://login.windows.net/common/FederationMetadata/2007-06/FederationMetadata.xml";
        public const string AAD_AuthorityUri = "https://login.windows.net";
        public const string SkypeForBusinessApplicationClientId = "00000004-0000-0ff1-ce00-000000000000";
        public static readonly Uri PlatformDiscoverUri_Prod = new Uri("https://api.skypeforbusiness.com/platformservice/discover");
        public static readonly Uri PlatformDiscoverUri_SandBox = new Uri("https://NOAMmeetings.resources.lync.com/platformservice/discover"); //Todo: update to api.skypeforbusinessonline after prod ready
        public static readonly Uri PlatformApplicationsUri_SandBox = new Uri("https://ring0NOAMfreemiummeetings.resources.lync.com/platformservice/v1/applications"); //TODO update to https://NOAMfreemiummeetings.resources.lync.com/platformservice/v1/applications
        public const string PlatformAudienceUri = "https://NOAMmeetings.resources.lync.com"; //Todo: update to api.skypeforbusinessonline after prod ready

        #endregion

        #region resource namespaces
        public const string DefaultResourceNamespace = "ms:rtc:saas:";
        public const string PublicServiceResourceNamespace = "service:";
        #endregion
    }
}
