using System;
using System.Text.RegularExpressions;

namespace Microsoft.SfB.PlatformService.SDK.Common
{
    [Serializable]
    public class SipUri : Uri
    {
        public string Domain { get; private set; }

        private static Regex EmailRegex = new Regex(Constants.EmailRegex, RegexOptions.IgnoreCase | RegexOptions.ExplicitCapture | RegexOptions.Compiled);

        public SipUri(string uriString) : base(uriString)
        {
            Initialize();
        }

        public SipUri(string uriString, bool dontEscape) : base(uriString)
        {
            Initialize();
        }

        public SipUri(Uri baseUri, string relativeUri, bool dontEscape) : base(baseUri, relativeUri)
        {
            Initialize();
        }

        public SipUri(string uriString, UriKind uriKind) : base(uriString, uriKind)
        {
            Initialize();
        }

        public SipUri(Uri baseUri, string relativeUri) : base(baseUri, relativeUri)
        {
            Initialize();
        }

        public SipUri(Uri baseUri, Uri relativeUri) : base(baseUri, relativeUri)
        {
            Initialize();
        }

        protected SipUri(System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext) : base(serializationInfo, streamingContext)
        {
            Initialize();
        }

        private void Initialize()
        {
            if (!string.Equals(Scheme, Constants.SipScheme, StringComparison.OrdinalIgnoreCase))
            {
                throw new ArgumentException("Only sip: scheme is allowed, provided : " + Scheme);
            }

            if(!EmailRegex.IsMatch(PathAndQuery))
            {
                throw new ArgumentException(PathAndQuery + " is not a valid email address.");
            }

            Domain = ToString().Split('@')[1];
        }
    }
}
