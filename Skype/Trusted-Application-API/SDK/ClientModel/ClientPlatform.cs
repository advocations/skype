using System;
using System.Security.Cryptography.X509Certificates;
using Microsoft.SfB.PlatformService.SDK.Common;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    public class ClientPlatform : IClientPlatform
    {
        #region Private fields

        private ClientPlatformSettings m_platformSettings;

        #endregion

        #region Public properties

        public Uri DiscoverUri
        {
            get {
                if (m_platformSettings.DiscoverUri != null)
                {
                    return m_platformSettings.DiscoverUri;
                }
                else if (this.IsSandBoxEnv)
                {
                    return Constants.PlatformDiscoverUri_SandBox;
                }
                else
                {
                    return Constants.PlatformDiscoverUri_Prod;
                }
            }
        }


        public Guid AADClientId
        {
            get { return m_platformSettings.AADClientId; }
        }

        public string AADClientSecret
        {
            get { return m_platformSettings.AADClientSecret; }
        }

        public bool IsSandBoxEnv
        {
            get { return m_platformSettings.IsSandBoxEnv; }
        }

        /// <summary>
        /// Callback url where events related to a conversation will be delivered by SfB
        /// </summary>
        public string CustomizedCallbackUrl
        {
            get { return m_platformSettings.CustomizedCallbackurl; }
        }

        public bool IsInternalPartner
        {
            get { return m_platformSettings.IsInternalPartner; }
        }


        public X509Certificate2 AADAppCertificate { get; private set; }


        #endregion

        #region Internal properties

        internal IRestfulClientFactory RestfulClientFactory { get; set; }

        #endregion

        #region Constructors

        public ClientPlatform(ClientPlatformSettings platformSettings, IPlatformServiceLogger logger)
        {
            if(platformSettings == null)
            {
                throw new ArgumentNullException(nameof(platformSettings));
            }

            if(logger == null)
            {
                 throw new ArgumentNullException(nameof(logger));
            }

            m_platformSettings = platformSettings;
            Logger.RegisterLogger(logger);
            if (!string.IsNullOrEmpty(platformSettings.AppTokenCertThumbprint))
            {
                AADAppCertificate = CertificateHelper.LookupCertificate(X509FindType.FindByThumbprint, platformSettings.AppTokenCertThumbprint, StoreName.My, StoreLocation.LocalMachine);
                if (AADAppCertificate == null)
                {
                    AADAppCertificate = CertificateHelper.LookupCertificate(X509FindType.FindByThumbprint, platformSettings.AppTokenCertThumbprint, StoreName.My, StoreLocation.CurrentUser);
                }
                if (AADAppCertificate == null)
                {
                    throw new ArgumentException($"Certificate with thumbprint {platformSettings.AppTokenCertThumbprint} not found in store");
                }
            }
            RestfulClientFactory = new RestfulClientFactory();
        }

        #endregion
    }
}
