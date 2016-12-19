# Gathering logs to troubleshoot issues and submit error reports 

 _**Applies to:** Skype for Business 2015_

 **In this article**

- [Who is this article for?](#audience)
- [What logs will help me troubleshoot my issue?](#logs-for-self)
- [How can I submit an error report?](#logs-for-report)
- [Related Topics](#related-topics)

<a name="audience"></a>
## Who is this article for?

If you are a developer adding the Skype Web SDK or Conversation Control into your web app and you aren't able to debug an issue with the help of the troubleshooting and programming documentation, this guide explains SDK activity log types used for troubleshooting.
If you can't resolve your issue by looking at the logs on your own, this guide provides instructions for submitting an error report to the SDK development team.

<a name="logs-for-self"></a>
## What logs will help me troubleshoot my issue?

Depending on the type of issue you're facing, there are different logs which may be relevant to you.

For all issues regarding the SDK, the best place to start is with the [browser console logs](./Logs-Console.md). Another useful source of logs is an [Internet traffic trace](./Logs-WebTraffic.md). You can get this trace by using a web debugging proxy such as [Fiddler](http://www.telerik.com/fiddler) or [Charles](https://www.charlesproxy.com/).

If you cannot resolve your issue by looking at either of these logs or reviewing the appropriate [reference documentation](../../GeneralReference.md), you should submit an error report.

<a name="logs-for-report"></a>
## How can I submit an error report?

Any issues reported to the Skype Web SDK team should include the [browser console logs](./Logs-Console.md), a [web traffic trace](./Logs-WebTraffic.md), and the following information:

- Client topology type (onprem/online)
- Host domain name (eg. "app.contoso.com")
- AAD Client ID if online topology using OAuth through AAD
- ECS API key (used to select the appropriate 'flavor' of the Web SDK or Conversation Control)
- SDK version - find this by executing `Skype.Web.version` in the browser console

If your issue involves AV calling and you could not resolve the issue by looking at any of the logs mentioned in the previous section, then you should also include the [appropriate media logs](./Logs-Media.md) with your error report.

If your failure scenario involves interaction between your Web SDK app and another type of Skype for Business client, such as the Skype for Business desktop client, then you should also collect the [logs from that client](./Logs-DesktopClient.md) if possible.

<a name="related-topics"></a>
## Related Topics

- [Gathering Console Logs from the Skype Web SDK or Conversation Control](./Logs-Console.md)
- [Gathering Web Traffic Logs from the Skype Web SDK or Conversation Control](./Logs-WebTraffic.md)
- [Gathering Media Logs from the Skype Web SDK or Conversation Control](./Logs-Media.md)
- [Gathering Logs from a Skype for Business Desktop Client](./Logs-DesktopClient.md)

