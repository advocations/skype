using Microsoft.Rtc.Internal.Utility;
using System;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    public class ClientPlatformSettings
    {
        public Uri DiscoverUri { get; private set; }

        public Guid AADClientId     { get; private set; }

        public string AppTokenCertThumbprint { get; private set; }

        public string AADClientSecret { get; private set; }

        public bool IsSandBoxEnv { get; private set; }

        public bool IsInternalPartner { get; private set; }

        public ClientPlatformSettings(Guid aadClientId, string appTokenCertThumbprint)
            :this(null, aadClientId, appTokenCertThumbprint,  null, false)
        {
            ArgumentVerifier.ThrowOnNullOrEmptyString(appTokenCertThumbprint, "appTokenCertThumbprint");       
        }

        public ClientPlatformSettings(string clientSecret, Guid aadClientId )
            : this(null, aadClientId, null,  clientSecret, false)
        {
            ArgumentVerifier.ThrowOnNullOrEmptyString(clientSecret, "clientSecret");
        }

        public ClientPlatformSettings(Uri discoverUri,  Guid aadClientId, string appTokenCertThumbprint, string clientSecret=null, bool isInternalPartner = false)
        {
            DiscoverUri = discoverUri;
            AADClientId = aadClientId;
            AppTokenCertThumbprint = appTokenCertThumbprint;
            AADClientSecret = clientSecret;           
            IsInternalPartner = isInternalPartner;
        }

        //TODO: Open this method once sandbox Env is ready
        private void SetSandBoxEnv(bool isSandBoxEnv)
        {
            IsSandBoxEnv = isSandBoxEnv;
        }
    }
}