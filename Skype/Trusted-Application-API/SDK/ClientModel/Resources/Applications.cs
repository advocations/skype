using Microsoft.Rtc.Internal.Platform.ResourceContract;
using Microsoft.SfB.PlatformService.SDK.Common;
using System;
using System.Threading.Tasks;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    internal class Applications : BasePlatformResource<ApplicationsResource, ApplicationsCapability>, IApplications
    {
        #region Private fields

        /// <summary>
        /// Appplication
        /// </summary>
        private Application m_application;

        #endregion

        #region Public properties

        /// <summary>
        /// Get Communication
        /// </summary>
        public IApplication Application
        {
            get { return m_application; }
        }

        #endregion

        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="restfulClient"></param>
        /// <param name="resource"></param>
        /// <param name="baseUri"></param>
        /// <param name="resourceUri"></param>
        internal Applications(IRestfulClient restfulClient, ApplicationsResource resource, Uri baseUri, Uri resourceUri, object parent)
                : base(restfulClient, resource, baseUri, resourceUri, parent)
        {
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Call Get on applications and initialize application resource
        /// </summary>
        /// <param name="loggingContext"></param>
        /// <returns></returns>
        public async Task RefreshAndInitializeAsync(LoggingContext loggingContext = null)
        {
            await this.RefreshAsync(loggingContext).ConfigureAwait(false);
            if (this.PlatformResource.Application != null)
            {
                m_application = new Application(this.RestfulClient, null, this.BaseUri, UriHelper.CreateAbsoluteUri(this.BaseUri, this.PlatformResource.Application.Href), this);
            }
            else
            {
                throw new RemotePlatformServiceException("Not get application resource from applications");
            }
        }

        public override bool Supports(ApplicationsCapability capability)
        {
            return false;
        }
    }

    #endregion
}
