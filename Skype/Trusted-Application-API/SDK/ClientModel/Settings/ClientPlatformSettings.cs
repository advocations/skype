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

        public ClientPlatformSettings(Guid aadClientId, string appTokenCertThumbprint, bool isSandBoxEnv = false)
            :this(null, aadClientId, appTokenCertThumbprint, isSandBoxEnv, null, false)
        {
            ArgumentVerifier.ThrowOnNullOrEmptyString(appTokenCertThumbprint, "appTokenCertThumbprint");       
        }

        public ClientPlatformSettings(string clientSecret, Guid aadClientId, bool isSandBoxEnv = false )
            : this(null, aadClientId, null, isSandBoxEnv, clientSecret, false)
        {
            ArgumentVerifier.ThrowOnNullOrEmptyString(clientSecret, "clientSecret");
        }

        public ClientPlatformSettings(Uri discoverUri,  Guid aadClientId, string appTokenCertThumbprint, bool isSandBoxEnv = false, string clientSecret=null, bool isInternalPartner = false)
        {
            DiscoverUri = discoverUri;
            AADClientId = aadClientId;
            AppTokenCertThumbprint = appTokenCertThumbprint;
            AADClientSecret = clientSecret;
            IsSandBoxEnv = isSandBoxEnv;
            IsInternalPartner = isInternalPartner;
        }
    }
}