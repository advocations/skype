using System;

namespace Microsoft.SfB.PlatformService.SDK.Common
{
    public interface IPlatformServiceLogger
    {
        bool HttpRequestResponseNeedsToBeLogged { get; set; }

        void Information(string message);

        void Information(string fmt, params object[] vars);

        void Information(Exception exception, string fmt, params object[] vars);

        void Warning(string message);

        void Warning(string fmt, params object[] vars);

        void Warning(Exception exception, string fmt, params object[] vars);

        void Error(string message);

        void Error(string fmt, params object[] vars);

        void Error(Exception exception, string fmt, params object[] vars);
    }
}
