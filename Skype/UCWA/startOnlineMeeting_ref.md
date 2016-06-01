
# startOnlineMeeting (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Creates and joins an ad-hoc multiparty conversation. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

startOnlineMeeting allows an application to create and join an ad-hoc online meeting. This is particularly useful when a user invites a group of contacts to the meeting. 


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Starts an [onlineMeetingInvitation (UCWA)](onlineMeetingInvitation_ref.md) in the event channel.


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
|[onlineMeetingInvitation (UCWA)](onlineMeetingInvitation_ref.md)|Represents an invitation to a new or existing [onlineMeeting (UCWA)](onlineMeeting_ref.md).|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/communication/startOnlineMeeting HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										Content-Length: 149
										{
  "operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
  "importance" : "Urgent",
  "subject" : "Skype for Business",
  "threadId" : "292e0aaef36c426a97757f43dda19d06"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Location: //v1/applications/833/communication/invitations/715
										
									
```


#### XML Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/communication/startOnlineMeeting HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Content-Length: 347
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;input xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;operationId&amp;quot;&amp;gt;74cb7404e0a247d5a2d4eb0376a47dbf&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;importance&amp;quot;&amp;gt;Urgent&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;subject&amp;quot;&amp;gt;Skype for Business&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;threadId&amp;quot;&amp;gt;292e0aaef36c426a97757f43dda19d06&amp;lt;/property&amp;gt;
&amp;lt;/input&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Location: //v1/applications/833/communication/invitations/715
										
									
```

