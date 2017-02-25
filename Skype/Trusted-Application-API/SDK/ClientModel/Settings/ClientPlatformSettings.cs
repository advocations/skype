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

        /// <summary>
        /// Custom callback url where SfB should deliver events related to conversations.
        /// </summary>
        /// <remarks>
        /// Typically, you don't need to set this. It is stored in SfB's application store for your application.
        /// You should set it only if you want events to be delivered on a uri different than what you specified
        /// when you registered your application with SfB. This affects events related to a conversation only;
        /// othere events, which are not part of a conversation, are still delivered to the registered callback url.
        /// </remarks>
        public string CustomizedCallbackurl { get; private set; }

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
        private void EnableSandboxFeatures(bool isSandBoxEnv)
        {
            IsSandBoxEnv = isSandBoxEnv;
        }

        /// <summary>
        /// Sets custom callback url where SfB should deliver events related to conversations.
        /// </summary>
        /// <remarks>
        /// Typically, you don't need to set this. It is stored in SfB's application store for your application.
        /// You should set it only if you want events to be delivered on a uri different than what you specified
        /// when you registered your application with SfB. This affects events related to a conversation only;
        /// othere events, which are not part of a conversation, are still delivered to the registered callback url.
        /// </remarks>
        public void SetCustomizedCallbackurl(Uri callbackUrl)
        {
            if(!callbackUrl.IsAbsoluteUri)
            {
                throw new ArgumentException("Absolute uri is needed.", nameof(callbackUrl));
            }

            CustomizedCallbackurl = callbackUrl.ToString();
        }
    }
}