using Microsoft.SfB.PlatformService.SDK.ClientModel;
using Microsoft.SfB.PlatformService.SDK.Common;

namespace Microsoft.SfB.PlatformService.SDK.Tests
{
    class MockRestfulClientFactory : IRestfulClientFactory
    {
        private IRestfulClient m_restfulClient;

        public MockRestfulClientFactory()
        {
            m_restfulClient = new MockRestfulClient();
        }

        public IRestfulClient GetRestfulClient(OAuthTokenIdentifier oauthIdentity, ITokenProvider tokenProvider)
        {
            return m_restfulClient;
        }
    }
}
