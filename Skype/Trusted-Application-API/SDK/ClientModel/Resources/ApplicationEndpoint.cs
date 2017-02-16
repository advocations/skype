using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.Rtc.Internal.RestAPI.ResourceModel;
using Microsoft.SfB.PlatformService.SDK.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.Rtc.Internal.RestAPI.Common.MediaTypeFormatters;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    /// <summary>
    /// Entry point for an application endpoint
    /// </summary>
    public class ApplicationEndpoint : IApplicationEndpoint
    {
        #region Private fields

        private IRestfulClient m_restfulClient;
        private OAuthTokenIdentifier m_oauthTokenIdentifier;
        private IEventChannel m_eventChannel;
        private ITokenProvider m_tokenProvider;
        private ApplicationEndpointSettings m_endpointSettings;

        #endregion

        #region Private event handlers

        private EventHandler<IncomingInviteEventArgs<IMessagingInvitation>> handleIncomingInstantMessagingCall;
        private EventHandler<IncomingInviteEventArgs<IAudioVideoInvitation>> handleIncomingAudioVideoCall;

        #endregion

        #region Public properties

        /// <summary>
        /// Get the platform Application
        /// </summary>
        public IApplication Application { get; private set; }

        public Uri ApplicationEndpointId
        {
            get { return m_endpointSettings.ApplicationEndpointId; }
        }

        public IClientPlatform ClientPlatform { get; private set; }

        #endregion

        #region Constructors

        /// <summary>
        /// Prevents a default instance of the ApplicationEndpoint class from being created
        /// </summary>
        public ApplicationEndpoint(IClientPlatform platform, ApplicationEndpointSettings applicationEndpointSettings, IEventChannel eventChannel)
        {
            ClientPlatform = platform;
            m_endpointSettings = applicationEndpointSettings;

            if (eventChannel != null)
            {
                m_eventChannel = eventChannel;
                m_eventChannel.HandleIncomingEvents += this.OnReceivedCallback;
            }          

            Logger.Instance.Information("Initializing ApplicationEndpoint");

            var oauthTokenIdentitifier = new OAuthTokenIdentifier(
               Constants.PlatformAudienceUri,
                applicationEndpointSettings.ApplicationEndpointId.Domain);

            var tokenProvider = new AADServiceTokenProvider(platform.AADClientId.ToString(), Constants.AAD_AuthorityUri, platform.AADAppCertificate,platform.AADClientSecret);            

            if(!platform.IsInternalPartner)
            {
                TokenMapper.RegisterNameSpaceHandling(Constants.DefaultResourceNamespace, Constants.PublicServiceResourceNamespace);
            }

            TokenMapper.RegisterTypesInAssembly(Assembly.GetAssembly(typeof(ApplicationsResource)));
            m_tokenProvider = tokenProvider;
            m_oauthTokenIdentifier = oauthTokenIdentitifier;

            m_restfulClient = ((ClientPlatform)ClientPlatform).RestfulClientFactory.GetRestfulClient(m_oauthTokenIdentifier, m_tokenProvider);

            Logger.Instance.Information("ApplicationEndpoint Initialized!");
        }

        #endregion

        #region Public events

        /// <summary>
        /// Handle new incoming IM call
        /// </summary>
        public event EventHandler<IncomingInviteEventArgs<IMessagingInvitation>> HandleIncomingInstantMessagingCall
        {
            add
            {
                if (handleIncomingInstantMessagingCall == null || !handleIncomingInstantMessagingCall.GetInvocationList().Contains(value))
                {
                    handleIncomingInstantMessagingCall += value;
                }
            }
            remove { handleIncomingInstantMessagingCall -= value; }
        }

        public event EventHandler<IncomingInviteEventArgs<IAudioVideoInvitation>> HandleIncomingAudioVideoCall
        {
            add
            {
                if (handleIncomingAudioVideoCall == null || !handleIncomingAudioVideoCall.GetInvocationList().Contains(value))
                {
                    handleIncomingAudioVideoCall += value;
                }
            }
            remove { handleIncomingAudioVideoCall -= value; }
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Uninitialize the ApplicationEndpoint.
        /// </summary>
        public void Uninitialize()
        {
            if (m_eventChannel != null)
            {
                m_eventChannel.HandleIncomingEvents -= this.OnReceivedCallback;
                m_eventChannel.TryStopAsync().Wait();
            }
        }

        /// <summary>
        /// Initialize ApplicationPlatform.
        /// </summary>
        /// <param name="loggingContext">The logging context.</param>
        /// <returns>The task.</returns>
        public Task InitializeAsync(LoggingContext loggingContext)
        {
            if (m_eventChannel != null)
            {
                return m_eventChannel.TryStartAsync();
            }
            return TaskHelpers.CompletedTask;            
        }

        /// <summary>
        /// Initialize the Application.
        /// </summary>
        /// <param name="loggingContext">The logging context.</param>
        /// <returns>The task.</returns>
        public async Task InitializeApplicationAsync(LoggingContext loggingContext)
        {
            if (Application == null)
            {
                Uri discoverUri = ClientPlatform.DiscoverUri;
                Uri baseUri = UriHelper.GetBaseUriFromAbsoluteUri(discoverUri.ToString());

                var discover = new Discover(m_restfulClient, baseUri, discoverUri, this);
                await discover.RefreshAndInitializeAsync(loggingContext, ApplicationEndpointId.ToString()).ConfigureAwait(false);

                IApplications ApplicationsResource = discover.Applications;
                await ApplicationsResource.RefreshAndInitializeAsync(loggingContext).ConfigureAwait(false);

                Application = ApplicationsResource.Application;
                await Application.RefreshAndInitializeAsync(loggingContext).ConfigureAwait(false);
            }
        }

        #endregion

        #region Private methods

        private void ProcessEvents(EventsChannelContext events)
        {
            Logger.Instance.Information("[ApplicationEndpoint] Receice incoming event callback Initialized!");
            Uri baseUri = null;
            if (!Uri.TryCreate(events.EventsEntity.BaseUri, UriKind.Absolute, out baseUri))
            {
                Logger.Instance.Error("[ApplicationEndpoint] " + events.EventsEntity.BaseUri + "is not valid absolute url ");
                return;
            }

            if (Application?.Communication == null)
            {
                try
                {
                    Logger.Instance.Information("[ApplicationEndpoint] application is not initilized, initialize it");
                    InitializeApplicationAsync(new LoggingContext()).Wait();
                }
                catch (Exception ex)
                {
                    Logger.Instance.Error(ex, "[ApplicationEndpoint] application initilized failure, ignore incoming event call back");
                }
            }

            var communication = Application?.Communication as Communication;

            if (communication != null)
            {
                foreach (EventSenderEntity eventsender in events.EventsEntity.Senders)
                {
                    List<EventContext> conversationEvents = null;
                    foreach (EventEntity e in eventsender.Events)
                    {
                        EventContext eventContext = new EventContext
                        {
                            SenderResourceName = eventsender.Token,
                            BaseUri = baseUri,
                            SenderHref = eventsender.Href,
                            EventResourceName = e.Link.Token,
                            EventFullHref = UriHelper.CreateAbsoluteUri(baseUri, e.Link.Href),
                            EventEntity = e,
                            LoggingContext = events.LoggingContext == null ? null : events.LoggingContext.Clone() as LoggingContext
                        };

                        Logger.Instance.Information(string.Format("[ApplicationEndpoint] get incoming event, sender: {0}, senderHref: {1}, EventResourceName: {2} EventFullHref: {3}, EventType {4}, LoggingContext: {5}",
                            eventContext.SenderResourceName, eventContext.SenderHref, eventContext.EventResourceName, eventContext.EventFullHref, eventContext.EventEntity.Relationship.ToString(), eventContext.LoggingContext == null ? string.Empty : eventContext.LoggingContext.ToString()));

                        if (string.Equals(eventContext.SenderResourceName, TokenMapper.GetTokenName(typeof(CommunicationResource)), StringComparison.CurrentCultureIgnoreCase))
                        {
                            communication.ProcessAndDispatchEventsToChild(eventContext);
                        }
                        else if (string.Equals(eventContext.SenderResourceName, TokenMapper.GetTokenName(typeof(ConversationResource)), StringComparison.CurrentCultureIgnoreCase))
                        {
                            // We send conversation updated and deleted events with conversation as sender now.
                            // Since the logic to process those are in communication we will send these events to
                            // communication.ProcessAndDispatchEventsToChild
                            if (string.Equals(eventContext.EventEntity.Link.Token, TokenMapper.GetTokenName(typeof(ConversationResource))))
                            {
                                communication.ProcessAndDispatchEventsToChild(eventContext);
                            }
                            else
                            {
                                if (conversationEvents == null)
                                {
                                    conversationEvents = new List<EventContext>();
                                }
                                conversationEvents.Add(eventContext);
                            }
                        }
                    }

                    if (conversationEvents != null && conversationEvents.Count > 0)
                    {
                        communication.DispatchConversationEvents(conversationEvents);
                    }
                }
            }
        }

        /// <summary>
        /// The action when receive callback.
        /// </summary>
        /// <returns>The task.</returns>
        private void OnReceivedCallback(object sender, EventsChannelArgs events)
        {
            SerializableHttpRequestMessage httpMessage = events.CallbackHttpRequest;
            if (httpMessage == null)
            {
                return;
            }

            if (Logger.Instance.HttpRequestResponseNeedsToBeLogged)
            {
                //Technically we should not wait a task here. However, this is in event channel call back thread, and we should not use async in event channel handler
                LogHelper.LogProtocolHttpRequestAsync(httpMessage, httpMessage.LoggingContext != null ? httpMessage.LoggingContext.TrackingId.ToString() : string.Empty, true).Wait(1000);
            }

            EventsEntity eventsEntity = null;

            using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(httpMessage.Content)))
            {
                MediaTypeHeaderValue typeHeader = null;
                MediaTypeHeaderValue.TryParse(httpMessage.ContentType, out typeHeader); 
                if (typeHeader != null)
                {
                    try
                    {
                        eventsEntity = MediaTypeFormattersHelper.ReadContentWithType(typeof(EventsEntity), typeHeader, stream) as EventsEntity;
                    }
                    catch (Exception ex)
                    {
                        Logger.Instance.Error(ex, "exception happened in deserialzie http message to EventsEntity");
                        return;
                    }
                }
                else
                {
                    Logger.Instance.Error("Invalid type header in callback message, skip this message! type header value: " + httpMessage.ContentType);
                    return;
                }
            }

            if (eventsEntity != null && eventsEntity.Senders != null && eventsEntity.Senders.Count > 0) //Ignore heartbeat events or call back reachability check events
            {
                this.ProcessEvents(new EventsChannelContext(eventsEntity, httpMessage.LoggingContext));
            }
        }

        #endregion

        #region Internal methods

        /// <summary>
        /// Handle new incoming invite
        /// </summary>
        internal void HandleNewIncomingInvite(IInvitation newInvite)
        {
            var messagingInvite = newInvite as IMessagingInvitation;
            if (messagingInvite != null)
            {
                handleIncomingInstantMessagingCall?.Invoke(this, new IncomingInviteEventArgs<IMessagingInvitation>(messagingInvite));
            }

            var audioVideoInvite = newInvite as IAudioVideoInvitation;
            if(audioVideoInvite != null)
            {
                handleIncomingAudioVideoCall?.Invoke(this, new IncomingInviteEventArgs<IAudioVideoInvitation>(audioVideoInvite));
            }
        }

        #endregion
    }

    public class IncomingInviteEventArgs<T> : EventArgs where T : IInvitation
    {
        /// <summary>
        /// The new invite fields
        /// </summary>
        private T m_invite;

        /// <summary>
        /// Get the new invite
        /// </summary>
        public T NewInvite
        {
            get { return m_invite; }
        }

        internal IncomingInviteEventArgs(T newInvite) : base()
        {
            m_invite = newInvite;
        }
    }
}
