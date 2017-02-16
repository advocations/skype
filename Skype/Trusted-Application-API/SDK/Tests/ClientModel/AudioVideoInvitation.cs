using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.SfB.PlatformService.SDK.ClientModel;
using Microsoft.SfB.PlatformService.SDK.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Microsoft.SfB.PlatformService.SDK.Tests.ClientModel
{
    [TestClass]
    public class AudioVideoInvitationTests
    {
        private Mock<IEventChannel> m_mockEventChannel;
        private ApplicationEndpoint m_applicationEndpoint;
        private LoggingContext m_loggingContext;
        private MockRestfulClient m_restfulClient;

        [TestInitialize]
        public async void TestSetup()
        {
            m_loggingContext = new LoggingContext(Guid.NewGuid());
            var data = TestHelper.CreateApplicationEndpoint();
            m_mockEventChannel = data.EventChannel;
            m_restfulClient = data.RestfulClient;

            m_applicationEndpoint = data.ApplicationEndpoint;
            await m_applicationEndpoint.InitializeAsync(m_loggingContext).ConfigureAwait(false);
            await m_applicationEndpoint.InitializeApplicationAsync(m_loggingContext).ConfigureAwait(false);
        }

        [TestMethod]
        public void ShouldExposeAcceptCapabilityIfLinkAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;

            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            // When
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // Then
            Assert.IsNotNull(invitation);
            Assert.IsTrue(invitation.Supports(AudioVideoInvitationCapability.Accept));
        }

        [TestMethod]
        public void ShouldNotExposeAcceptCapabilityIfLinkNotAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;

            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            // When
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall_NoActionLinks.json");

            // Then
            Assert.IsNotNull(invitation);
            Assert.IsFalse(invitation.Supports(AudioVideoInvitationCapability.Accept));
        }

        [TestMethod]
        [ExpectedException(typeof(CapabilityNotAvailableException))]
        public async Task AcceptAsyncShouldThrowIfLinkNotAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;

            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall_NoActionLinks.json");

            // When
            await invitation.AcceptAsync(m_loggingContext).ConfigureAwait(false);

            // Then
            // Exception is thrown
        }

        [TestMethod]
        public async Task AcceptAsyncShouldWork()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_restfulClient.OverrideResponse(new Uri(DataUrls.AudioVideoInvitationAccept), HttpMethod.Post, HttpStatusCode.NoContent, null);

            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // When
            HttpResponseMessage response = await invitation.AcceptAsync(m_loggingContext).ConfigureAwait(false);

            // Then
            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
            Assert.IsTrue(m_restfulClient.RequestsProcessed("POST " + DataUrls.AudioVideoInvitationAccept));
        }

        [TestMethod]
        public void ShouldExposeDeclineCapabilityIfLinkAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            // When
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // Then
            Assert.IsNotNull(invitation);
            Assert.IsTrue(invitation.Supports(AudioVideoInvitationCapability.Decline));
        }

        [TestMethod]
        public void ShouldNotExposeDeclineCapabilityIfLinkNotAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            // When
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall_NoActionLinks.json");

            // Then
            Assert.IsNotNull(invitation);
            Assert.IsFalse(invitation.Supports(AudioVideoInvitationCapability.Decline));
        }

        [TestMethod]
        [ExpectedException(typeof(CapabilityNotAvailableException))]
        public async Task DeclineAsyncShouldThrowIfLinkNotAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall_NoActionLinks.json");

            // When
            await invitation.DeclineAsync(m_loggingContext).ConfigureAwait(false);

            // Then
            // Exception is thrown
        }

        [TestMethod]
        public async Task DeclineAsyncShouldWork()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_restfulClient.OverrideResponse(new Uri(DataUrls.AudioVideoInvitationDecline), HttpMethod.Post, HttpStatusCode.NoContent, null);

            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // When
            HttpResponseMessage response = await invitation.DeclineAsync(m_loggingContext).ConfigureAwait(false);

            // Then
            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
            Assert.IsTrue(m_restfulClient.RequestsProcessed("POST " + DataUrls.AudioVideoInvitationDecline));
        }

        [TestMethod]
        public void ShouldExposeForwardCapabilityIfLinkAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            // When
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // Then
            Assert.IsNotNull(invitation);
            Assert.IsTrue(invitation.Supports(AudioVideoInvitationCapability.Forward));
        }

        [TestMethod]
        public void ShouldNotExposeForwardCapabilityIfLinkNotAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            // When
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall_NoActionLinks.json");

            // Then
            Assert.IsNotNull(invitation);
            Assert.IsFalse(invitation.Supports(AudioVideoInvitationCapability.Forward));
        }

        [TestMethod]
        [ExpectedException(typeof(CapabilityNotAvailableException))]
        public async Task ForwardAsyncShouldThrowIfLinkNotAvailable()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall_NoActionLinks.json");

            // When
            await invitation.ForwardAsync(m_loggingContext, "sip:user@example.com").ConfigureAwait(false);

            // Then
            // Exception is thrown
        }

        [TestMethod]
        public async Task ForwardAsyncShouldWork()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_restfulClient.OverrideResponse(new Uri(DataUrls.AudioVideoInvitationForward), HttpMethod.Post, HttpStatusCode.NoContent, null);

            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };
            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // When
            HttpResponseMessage response = await invitation.ForwardAsync(m_loggingContext, "sip:user@example.com").ConfigureAwait(false);

            // Then
            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
            Assert.IsTrue(m_restfulClient.RequestsProcessed("POST " + DataUrls.AudioVideoInvitationForward));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public async Task ForwardAsyncShouldThrowForInvalidInput()
        {
            // Given
            IAudioVideoInvitation invitation = null;
            m_applicationEndpoint.HandleIncomingAudioVideoCall += (sender, args) => { invitation = args.NewInvite; };

            m_restfulClient.OverrideResponse(new Uri(DataUrls.AudioVideoInvitationForward), HttpMethod.Post, HttpStatusCode.NoContent, null);

            TestHelper.RaiseEventsFromFile(m_mockEventChannel, "Event_IncomingAudioCall.json");

            // When
            HttpResponseMessage response = await invitation.ForwardAsync(m_loggingContext, null).ConfigureAwait(false);

            // Then
            // Exception is thrown
        }
    }
}