
# onlineMeetingPolicies (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the admin policies for the user's online meetings ([myOnlineMeetings (UCWA)](myOnlineMeetings_ref.md)). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>




### Properties





|**Name**|**Description**|
|:-----|:-----|
|entryExitAnnouncement|The ability to enable or disable attendance announcements.|
|externalUserMeetingRecording|The ability of external users to record online meetings.|
|meetingRecording|The ability of internal users to record online meetings.|
|meetingSize|The maximum number of meeting participants that can be invited before a warning should be shown to the user.|
|phoneUserAdmission|The ability to access online meetings by phone.|
|voipAudio|The ability to schedule an online meeting using VoIP audio.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the admin policies for the user's online meetings.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingPolicies HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 277
										{
  "rel" : "onlineMeetingPolicies",
  "entryExitAnnouncement" : "None",
  "externalUserMeetingRecording" : "None",
  "meetingRecording" : "None",
  "meetingSize" : 5,
  "phoneUserAdmission" : "None",
  "voipAudio" : "None",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings/onlineMeetingPolicies"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingPolicies HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 558
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;onlineMeetingPolicies&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/onlineMeetingPolicies&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetingPolicies&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;externalUserMeetingRecording&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;meetingRecording&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;meetingSize&amp;quot;&amp;gt;5&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;phoneUserAdmission&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;voipAudio&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

