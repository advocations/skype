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

        internal bool IsInternalPartner { get; set; }

        internal bool IsSandBoxEnv { get; set; }

        /// <summary>
        /// Custom callback url where SfB should deliver events related to conversations.
        /// </summary>
        /// <remarks>
        /// Typically, you don't need to set this. It is stored in SfB's application store for your application.
        /// You should set it only if you want events to be delivered on a uri different than what you specified
        /// when you registered your application with SfB. This affects events related to a conversation only;
        /// othere events, which are not part of a conversation, are still delivered to the registered callback url.
        /// </remarks>
        internal string CustomizedCallbackUrl { get; set; }

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
    }
}

/// <summary>
/// We put all not official supported features (workarounds to help developers) in this namespace
/// </summary>
namespace Microsoft.SfB.PlatformService.SDK.ClientModel.Internal
{
    /// <summary>
    /// Internal extensions for <see cref="ClientPlatformSettings"/>
    /// </summary>
    public static class ClientPlatformSettingsExtensions
    {
        /// <summary>
        /// Sets custom callback url where SfB should deliver events related to conversations.
        /// </summary>
        /// <param name="This"><see cref="ClientPlatformSettings"/> that needs to be updated</param>
        /// <param name="callbackUri">Uri to be used for callback</param>
        /// <remarks>
        /// Typically, you don't need to set this. It is stored in SfB's application store for your application.
        /// You should set it only if you want events to be delivered on a uri different than what you specified
        /// when you registered your application with SfB. This affects events related to a conversation only;
        /// othere events, which are not part of a conversation, are still delivered to the registered callback url.
        /// </remarks>
        public static void SetCustomizedCallbackurl(this ClientPlatformSettings This, Uri callbackUri)
        {
            if (!callbackUri.IsAbsoluteUri)
            {
                throw new ArgumentException("Absolute uri is needed.", nameof(callbackUri));
            }

            This.CustomizedCallbackUrl = callbackUri.ToString();
        }

        public static void SetIsInternalPartner(this ClientPlatformSettings This, bool isInternalPartner)
        {
            This.IsInternalPartner = isInternalPartner;
        }

        // Make it public when sandbox is ready
        internal static void SetIsSandboxEnv(this ClientPlatformSettings This, bool isSandboxEnv)
        {
            This.IsSandBoxEnv = isSandboxEnv;
        }
    }
}