# Gathering Console Logs from the Skype Web SDK or Conversation Control

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
