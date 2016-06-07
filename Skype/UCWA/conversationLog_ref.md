
# conversationLog

 **Last modified:** July 14, 2015

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Represents the user's view of an instance of past conversation. 


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
|creationTime|The time when conversation log was delivered to Exchange.|
|direction|The direction of the call logs.|
|importance|The importance of the past conversation.|
|modalities|The modalities in the past conversation.|
|onlineMeetingUri|The online meeting URI.|
|previewMessage|The truncated messages of the conversation.|
|status|The conversation response status.|
|subject|The subject of the past conversation.|
|threadId|The thread ID of the conversation.|
|totalRecipientsCount|The number of recipients in the conversation log.|
|type|The conversation log type.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|continueMessaging|Continues instant messaging modality of a past conversation.|
|continuePhoneAudio|Continues phone audio modality of a past conversation.|
|conversationLogTranscripts|The (archived) messages from Exchange.|
|markAsRead|Marks a [conversationLog](conversationLog_ref.md) as read in Exchange.|
|conversationLogRecipient|Represents a recipient within a [conversationLog](conversationLog_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the past conversation instance.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 1416
										{
 "rel" : "conversationLog",
 "creationTime" : "\/Date(1436925244208)\/",
 "direction" : "Incoming",
 "importance" : "Normal",
 "modalities" : [
 "Messaging",
 "Audio",
 "Video",
 "ApplicationSharing"
 ],
 "onlineMeetingUri" : "samplevalue",
 "previewMessage" : "samplevalue",
 "status" : "Archived",
 "subject" : "Conversation with xxx.",
 "threadId" : "534e445ee854436a8abe02c24985f78a",
 "totalRecipientsCount" : 88,
 "type" : "AudioLog",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/communication/conversationLogs/conversationLog"
 },
 "continueMessaging" : {
 "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/continueMessaging"
 },
 "continuePhoneAudio" : {
 "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/continuePhoneAudio"
 },
 "conversationLogTranscripts" : {
 "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts"
 },
 "markAsRead" : {
 "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/markAsRead"
 }
 },
 "_embedded" : {
 "conversationLogRecipient" : [
 {
 "rel" : "conversationLogRecipient",
 "displayName" : "samplevalue",
 "sipUri" : "samplevalue",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogRecipient"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "contactPhoto" : {
 "href" : "//v1/applications/833/people/166/contactPhoto"
 },
 "contactPresence" : {
 "href" : "//v1/applications/833/people/166/contactPresence"
 }
 }
 }
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 1975
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="conversationLog" href="//v1/applications/833/communication/conversationLogs/conversationLog" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="continueMessaging" href="//v1/applications/833/communication/conversationLogs/conversationLog/continueMessaging" />
 <link rel="continuePhoneAudio" href="//v1/applications/833/communication/conversationLogs/conversationLog/continuePhoneAudio" />
 <link rel="conversationLogTranscripts" href="//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts" />
 <link rel="markAsRead" href="//v1/applications/833/communication/conversationLogs/conversationLog/markAsRead" />
 <property name="rel">conversationLog</property>
 <property name="creationTime">2015-07-14T20:54:04.2145620-05:00</property>
 <property name="direction">Incoming</property>
 <property name="importance">Normal</property>
 <propertyList name="modalities">
 <item>Messaging</item>
 <item>Audio</item>
 <item>Video</item>
 <item>ApplicationSharing</item>
 </propertyList>
 <property name="onlineMeetingUri">samplevalue</property>
 <property name="previewMessage">samplevalue</property>
 <property name="status">Archived</property>
 <property name="subject">Conversation with xxx.</property>
 <property name="threadId">534e445ee854436a8abe02c24985f78a</property>
 <property name="totalRecipientsCount">55</property>
 <property name="type">AudioLog</property>
 <resource rel="conversationLogRecipient" href="//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogRecipient">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
 <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
 <property name="rel">conversationLogRecipient</property>
 <property name="displayName">samplevalue</property>
 <property name="sipUri">samplevalue</property>
 </resource>
</resource>
									
```


### DELETE

Removes the past conversation instance.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).


#### Examples




#### JSON Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```


#### XML Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```

