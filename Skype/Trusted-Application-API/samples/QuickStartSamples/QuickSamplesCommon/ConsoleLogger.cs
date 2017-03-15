using Microsoft.SfB.PlatformService.SDK.Common;
using System;

namespace QuickSamplesCommon
{
    public class ConsoleLogger : IPlatformServiceLogger
    {
        public bool HttpRequestResponseNeedsToBeLogged { get; set; }

        public void Information(string message)
        {
            Console.WriteLine("[INFO]" + message);
        }

        public void Information(string fmt, params object[] vars)
        {
            Console.WriteLine("[INFO]" + string.Format(fmt, vars));
        }

        public void Information(Exception exception, string fmt, params object[] vars)
        {
            string msg = String.Format(fmt, vars);
            Console.WriteLine("[INFO]" + msg + "; \r\nException Details= ", ExceptionUtils.FormatException(exception, includeContext: true));
        }

        //
        // Warning - trace warnings within the application

        public void Warning(string message)
        {
            Console.WriteLine("[WARN]" + message);
        }

        public void Warning(string fmt, params object[] vars)
        {
            Console.WriteLine("[WARN]" + string.Format(fmt, vars));
        }

        public void Warning(Exception exception, string fmt, params object[] vars)
        {
            string msg = String.Format(fmt, vars);
            Console.WriteLine(msg + "; \r\nException Details= ", ExceptionUtils.FormatException(exception, includeContext: true));
        }

        //
        // Error - trace fatal errors within the application

        public void Error(string message)
        {
            Console.WriteLine(message);
        }

        public void Error(string fmt, params object[] vars)
        {
            Console.WriteLine("[ERROR]" + String.Format(fmt, vars));
        }

        public void Error(Exception exception, string fmt, params object[] vars)
        {
            string msg = String.Format(fmt, vars);
            Console.WriteLine("[ERROR]" + msg + "; \r\nException Details= ", ExceptionUtils.FormatException(exception, includeContext: true));
        }
    }
}
