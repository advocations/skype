# Gathering Web Traffic Traces from the Skype Web SDK or Conversation Control

There are a couple other sources of logs which can provide additional useful debugging information to developers.

## Fiddler Traces

If the developer console indicates that HTTP requests are failing and you believe that that could be causing your issue, a Fiddler trace can help the Skype Web SDK developers further debug the issue. Download Fiddler here: 

[https://www.telerik.com/download/fiddler](https://www.telerik.com/download/fiddler)

After the download completes, start Fiddler, select **Tools > Fiddler Options > HTTPS** and check the boxes marked **Capture HTTPS CONNECTs** and **Decrypt HTTPS Traffic.** Accept any warning messages and restart Fiddler. Then reproduce the scenario, go to **File > Save > All Sessions...**, name the Fiddler trace, and include it with the issue report.
