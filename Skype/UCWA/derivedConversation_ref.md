
# derivedConversation 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents a related conversation with a different [participant](participant_ref.md) than the one of the original conversation.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

A derivedConversation is created when a new modality is added to an existing [conversation](conversation_ref.md) but is answered by another participant (perhaps due to [simultaneousRingSettings](simultaneousRingSettings_ref.md)). 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a related conversation with a different [participant](participant_ref.md) than the original conversation.


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
Get https://fe1.contoso.com:443//v1/applications/833/communication/invitations/630/derivedConversation HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 1969
{
"rel" : "conversation",
"activeModalities" : [
"Messaging",
"Audio",
"Video",
"ApplicationSharing"
],
"audienceMessaging" : "Enabled",
"audienceMute" : "Unknown",
"created" : "\/Date(1436925244718)\/",
"expirationTime" : "\/Date(1326337402743)\/",
"importance" : "Normal",
"participantCount" : 53,
"readLocally" : false,
"recording" : false,
"state" : "Disconnected",
"subject" : "Skype for Business",
"threadId" : "534e445ee854436a8abe02c24985f78a",
"_links" : {
"self" : {
"href" : "//v1/applications/833/communication/conversations/802"
},
"addParticipant" : {
"href" : "//v1/applications/833/communication/conversations/802/addParticipant"
},
"applicationSharing" : {
"href" : "//v1/applications/833/communication/conversations/802/applicationSharing"
},
"attendees" : {
"href" : "//v1/applications/833/communication/conversations/802/attendees"
},
"audioVideo" : {
"href" : "//v1/applications/833/communication/conversations/802/audioVideo"
},
"dataCollaboration" : {
"href" : "//v1/applications/833/communication/conversations/802/dataCollaboration"
},
"disableAudienceMessaging" : {
"href" : "//v1/applications/833/communication/conversations/802/messaging/disableAudienceMessaging"
},
"disableAudienceMuteLock" : {
"href" : "//v1/applications/833/communication/conversations/802/disableAudienceMuteLock"
},
"enableAudienceMessaging" : {
"href" : "//v1/applications/833/communication/conversations/802/messaging/enableAudienceMessaging"
},
"enableAudienceMuteLock" : {
"href" : "//v1/applications/833/communication/conversations/802/enableAudienceMuteLock"
},
"leaders" : {
"href" : "//v1/applications/833/communication/conversations/802/leaders"
},
"lobby" : {
"href" : "//v1/applications/833/communication/conversations/802/lobby"
},
"localParticipant" : {
"href" : "//v1/applications/833/communication/conversations/802/onlineMeeting/665"
},
"messaging" : {
"href" : "//v1/applications/833/communication/conversations/802/messaging"
},
"onlineMeeting" : {
"href" : "//v1/applications/833/communication/conversations/802/onlineMeeting"
},
"phoneAudio" : {
"href" : "//v1/applications/833/communication/phoneAudio"
}
}
}

```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/communication/invitations/630/derivedConversation HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 2572
<?xml version="1.0" encoding="utf-8"?>
<resource rel="conversation" href="//v1/applications/833/communication/conversations/802" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<link rel="addParticipant" href="//v1/applications/833/communication/conversations/802/addParticipant" />
<link rel="applicationSharing" href="//v1/applications/833/communication/conversations/802/applicationSharing" />
<link rel="attendees" href="//v1/applications/833/communication/conversations/802/attendees" />
<link rel="audioVideo" href="//v1/applications/833/communication/conversations/802/audioVideo" />
<link rel="dataCollaboration" href="//v1/applications/833/communication/conversations/802/dataCollaboration" />
<link rel="disableAudienceMessaging" href="//v1/applications/833/communication/conversations/802/messaging/disableAudienceMessaging" />
<link rel="disableAudienceMuteLock" href="//v1/applications/833/communication/conversations/802/disableAudienceMuteLock" />
<link rel="enableAudienceMessaging" href="//v1/applications/833/communication/conversations/802/messaging/enableAudienceMessaging" />
<link rel="enableAudienceMuteLock" href="//v1/applications/833/communication/conversations/802/enableAudienceMuteLock" />
<link rel="leaders" href="//v1/applications/833/communication/conversations/802/leaders" />
<link rel="lobby" href="//v1/applications/833/communication/conversations/802/lobby" />
<link rel="localParticipant" href="//v1/applications/833/communication/conversations/802/onlineMeeting/665" />
<link rel="messaging" href="//v1/applications/833/communication/conversations/802/messaging" />
<link rel="onlineMeeting" href="//v1/applications/833/communication/conversations/802/onlineMeeting" />
<link rel="phoneAudio" href="//v1/applications/833/communication/phoneAudio" />
<property name="rel">conversation</property>
<propertyList name="activeModalities">
<item>Messaging</item>
<item>Audio</item>
<item>Video</item>
<item>ApplicationSharing</item>
</propertyList>
<property name="audienceMessaging">Enabled</property>
<property name="audienceMute">Unknown</property>
<property name="created">2015-07-14T20:54:04.7195713-05:00</property>
<property name="expirationTime">2012-01-11T21:03:22.7433336-06:00</property>
<property name="importance">Normal</property>
<property name="participantCount">95</property>
<property name="readLocally">False</property>
<property name="recording">False</property>
<property name="state">Disconnected</property>
<property name="subject">Skype for Business</property>
<property name="threadId">534e445ee854436a8abe02c24985f78a</property>
</resource>
									
```

