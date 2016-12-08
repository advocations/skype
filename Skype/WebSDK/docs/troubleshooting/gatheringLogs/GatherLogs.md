# Gathering Debug Information

 _**Applies to:** Skype for Business 2015_

 **In this article**
- [General Debugging Information](#general-info) 
- [Gathering Logs from a Skype for Business Desktop Client](./Logs-DesktopClient.md)
- [Gathering Media Logs from the Skype Web SDK or Conversation Control](./Logs-Media.md)
- [Gathering Console Logs from the Skype Web SDK or Conversation Control](./Logs-Console.md)
- [Gathering Web Web Traffic Logs from the Skype Web SDK or Conversation Control](#Logs-WebTraffic.md)

## Who is this article for?

If you are a developer attempting to incorporate the Skype Web SDK or Conversation Control into your web app, and you are facing issues which you have not been able to debug by looking at the troubleshooting and programming documentation, this guide will explain different types of logs of SDK activity that are available to you to try to further troubleshoot your issue. 

In addition, if you are unable to resolve your issue by looking at the logs on your own, this guide will provide instructions on the information you must provide to submit an error report to the SDK development team.

Depending on the type of issue you're facing, there are different logs which might be relevant to you.

## What logs will be helpful to me?

For all issues regarding the SDK, the best place to start is with the browser console logs. The second most useful source of logs will be an Internet traffic trace, which you can obtain by using a web debugging proxy such as Fiddler or Charles.

If you are not able to resolve your issue by looking at either of these logs, it is likely that you will need to submit an error report.

## What information to I need to submit for an error report?

For all error reports, please make sure to include the [general debugging information](#general-info) outlined below, the browser console logs, and a Fiddler or Charles trace.

If your issue involves AV calling and you were unable to resolve the issue by looking at any of the logs mentioned in the above section, then you should also include the appropriate media logs with your error report.

If your failure scenario involves interaction between your Web SDK app and another type of Skype for Business client, such as the Skype for Business desktop client, then you should also collect the logs from that client if possible.

---
<a name="general-info"></a>
## General Debugging Information

Any issues reported to the Skype Web SDK team should include the following information:

- Client topology type (onprem/online)
- Host domain name (eg. "app.contoso.com")
- AAD Client ID if online topology using OAuth through AAD
- ECS API key (used to select the appropriate 'flavor' of the Web SDK or Conversation Control)
- SDK version - find this by executing `Skype.Web.version` in the browser console



