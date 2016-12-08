# Gathering Debug Information

 _**Applies to:** Skype for Business 2015_

 **In this article**
- [General Debugging Information](#general-info) 
- [Gathering Logs from a Skype for Business Desktop Client](#sfb-desktop)
- [Gathering Media Logs from the Skype Web SDK or Conversation Control](#sdk-media)
- [Gathering Console Logs from the Skype Web SDK or Conversation Control](#sdk-console)
- [Other Logs](#other-logs)

This file provides instructions on how developers and users of apps built with the Skype Web SDK can gather various types of information and logs to help the Skype Web SDK developers root-cause issues more easily.

See the appropriate section below for gathering logs for specific clients.

---
<a name="general-info"></a>
## General Debugging Information

Any issues reported to the Skype Web SDK team should include the following information:

- Client topology type (onprem/online)
- Host domain name (eg. "app.contoso.com")
- AAD Client ID if online topology using OAuth through AAD
- ECS API key (used to select the appropriate 'flavor' of the Web SDK or Conversation Control)
- SDK version - find this by executing `Skype.Web.version` in the browser console 

---
<a name="sfb-desktop"></a>
## Gathering Logs from a Skype for Business Desktop Client

There are 2 types of logs available from the desktop client: **.UccApilog** files contain general usage information, and **.etl** files contain media-specific log information. For any bugs related to Audio/Video, please attach both log types if possible. For bugs not related to Audio/Video, the **.UccApilog** files should be sufficient.

On a Windows machine, the logs for a Skype for business desktop client will be located in the following directory:

>**%LOCALAPPDATA%\Microsoft\Office\16.0\Lync\Tracing\Lync-UccApi-[[n]].UccApilog** where **[[n]]**
should be replaced by a number 0-2.

On a Mac Machine, the location is _**Coming Soon!**_

After reproducing the issue and closing the client, navigate to this directory and select the log file with the most recent timestamp. This is the file you should submit with any bug report.

---
<a name="sdk-media"></a>
## Gathering Media Logs from the Skype Web SDK or Conversation Control

If you're problem scenario involves using Audio/Video with the Skype Web SDK or Conversation Control, please include the appropriate media logs in your bug report. 

Depending on the browser and OS in which you're running the Skype Web SDK or Conversation Control, the location of media logs will vary. See below for the instructions specific to your browser.

### Internet Explorer

Using Audio/Video in Internet Explorer requires the Skype For Business media plug-in. The location of the logs will depend on where the plug-in is installed. If the plug-in is installed in the default install location on a Windows machine, the path of the log files looks like this:

>**%LOCALAPPDATA%\Microsoft\SkypeForBusinessPlugin\Tracing**

After reproducing the scenario, close the browser, navigate to this directory and select the 2 most recently modified files with the extension **.etl**. Their names should look like this:

>**PluginHost_MediaStack-\<BUILD\_NUMBER\>-releases_CL2016_R12-x86fre-U.etl** <br>
**PluginHost_MediaStackETW-\<BUILD\_NUMBER\>-releases_CL2016_R12-x86fre-U.etl**

Include both files in the issue report.

### Microsoft Edge

Using Audio/Video in the Skype Web SDK in Microsoft Edge uses the Microsoft Edge native implementation of the ORTC (Object Real-Time Communications) protocol. In order to collect media logs for Audio/Video activity in Microsoft Edge, you must first enable Microsoft Edge ORTC media logging by setting a registry key. On a Windows machine, you can do so by running this script: 

[Enable ORTC Media Logging in Edge](../../../utils/EnableEdgeLogging.ps1)

This script will enable media logging in Microsoft Edge until you delete or set the registry key added here to 0.

After enabling media logging in this way, restart Microsoft Edge, reproduce the failing scenario, close the the browser and run the following script:

[PullEdgeLogs.ps1](../../../utils/pullEdgeLogs-external.ps1)

This will copy the 2 most recent media log files from the default location where Microsoft Edge ORTC media logs are written into a folder in the home directory of your machine. Copy the entire folder containing these logs and include it in the issue report.

### Safari _**TODO: FIX THIS**_

Audio/Video support in Safari is provided by the Skype for Business Meetings Plugin, so the media logs are available in a tracing directory within the directory where the plugin is installed.

### Other Browsers

Once AV support expands to other browsers like Chrome and Firefox, we will add instructions on capturing media logs for these browsers.

---
<a name="sdk-console"></a>
## Gathering Console Logs from the Skype Web SDK or Conversation Control

Console logs are invaluable for troubleshooting any issue related to the Skype Web SDK. Please include console logs with any issue report. 

On a page with the Skype Web SDK loaded, open the developer console and enter the following: 

``` js
Skype.Web.Settings.timestamps = true;
Skype.Web.Settings.saveConsole = true;
```

These statements will cause the output of all debugging statements to be saved to a circular buffer. The maximum size of the buffer is 4MB. If a new logging statement will cause the buffer to exceed its maximum size, logs will be removed from the beginning of the buffer to ensure that there is space for the new statement. So by default, the buffer will contain the most recent 4MB of debugging statements at any time after the `saveConsole` flag is turned on.

After turning on logging, reproduce your issue, then run the following command in the developer console to download the contents of the log buffer:

``` js
Skype.Web.Utils.debug.saveConsole('<DESCRIPTIVE_FILE_NAME>');
```

Include the downloaded log file with your issue report.

>**Note about Browser Compatibility:** The implementation of this feature is different across different browsers and may not be supported in uncommon or older browsers. In **Safari**, after typing this command, you have to click anywhere in the page, and a new tab should open to a page that contains the text of the log buffer. You then need to manually save this page as a text file.

If you'd like to enable the debugging statements to be logged to the console in real-time as well as being saved in the buffer, you can do so with the following statements:

``` js
Skype.Web.Settings.logRequests = true;
Skype.Web.Settings.logEvents = true;
Skype.Web.Settings.logModel = true;
Skype.Web.Settings.logMedia = true;
```

---
<a name="other-logs"></a>
## Other Logs

There are a couple other sources of logs which can provide additional useful debugging information to developers.

### Fiddler Traces

If the developer console indicates that HTTP requests are failing and you believe that that could be causing your issue, a Fiddler trace can help the Skype Web SDK developers further debug the issue. Download Fiddler here: 

[https://www.telerik.com/download/fiddler](https://www.telerik.com/download/fiddler)

After the download completes, start Fiddler, select **Tools > Fiddler Options > HTTPS** and check the boxes marked **Capture HTTPS CONNECTs** and **Decrypt HTTPS Traffic.** Accept any warning messages and restart Fiddler. Then reproduce the scenario, go to **File > Save > All Sessions...**, name the Fiddler trace, and include it with the issue report.