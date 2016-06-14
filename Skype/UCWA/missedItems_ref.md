
# missedItems

 **Last modified:** July 14, 2015


A collection of unread voicemails and conversations. 


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
|conversationLogsCount|The number of conversation logs.|
|conversationLogsNotifications|Gets or sets the conversation logs notifications.|
|missedConversationsCount|The number of missed conversations.|
|unreadMissedConversationsCount|The number of unread missed conversations.|
|unreadVoicemailsCount|The number of unread voicemails.|
|voiceMailsCount|The number of voicemails.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|missedItems|High|communication|Delivered when there is an update for the missed items resource.|
Sample of returned event data.

This sample is given only as an illustration of event syntax. The semantic content is not guaranteed to correspond to a valid scenario.




```

{
 "_links" : {
 "self" : {
 "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=1"
 },
 "next" : {
 "href" : "http://sample:80/ucwa/v1/applications/appId/events?ack=2"
 }
 },
 "sender" : [
 {
 "rel" : "communication",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication",
 "events" : [
 {
 "link" : {
 "rel" : "missedItems",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/missedItems"
 },
 "type" : "updated"
 }
 ]
 }
 ]
}
					
```


## Operations
<a name="sectionSection3"> </a>




### GET

Operation description coming soon...


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/missedItems HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 280
										{
 "rel" : "missedItems",
 "conversationLogsCount" : 93,
 "conversationLogsNotifications" : "Disabled",
 "missedConversationsCount" : 33,
 "unreadMissedConversationsCount" : 6,
 "unreadVoicemailsCount" : 4,
 "voiceMailsCount" : 78,
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/communication/missedItems"
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/missedItems HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 559
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="missedItems" href="//v1/applications/833/communication/missedItems" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">missedItems</property>
 <property name="conversationLogsCount">76</property>
 <property name="conversationLogsNotifications">Disabled</property>
 <property name="missedConversationsCount">67</property>
 <property name="unreadMissedConversationsCount">8</property>
 <property name="unreadVoicemailsCount">19</property>
 <property name="voiceMailsCount">5</property>
</resource>
									
```

