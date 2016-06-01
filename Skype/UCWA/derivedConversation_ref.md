
# derivedConversation (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents a related conversation with a different [participant (UCWA)](participant_ref.md) than the one of the original conversation.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

A derivedConversation is created when a new modality is added to an existing [conversation (UCWA)](conversation_ref.md) but is answered by another participant (perhaps due to[simultaneousRingSettings (UCWA)](simultaneousRingSettings_ref.md)). 


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

Returns a representation of a related conversation with a different [participant (UCWA)](participant_ref.md) than the original conversation.


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
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;conversation&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;addParticipant&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/addParticipant&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;applicationSharing&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/applicationSharing&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;attendees&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/attendees&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;audioVideo&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/audioVideo&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;dataCollaboration&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/dataCollaboration&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;disableAudienceMessaging&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/messaging/disableAudienceMessaging&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;disableAudienceMuteLock&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/disableAudienceMuteLock&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;enableAudienceMessaging&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/messaging/enableAudienceMessaging&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;enableAudienceMuteLock&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/enableAudienceMuteLock&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;leaders&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/leaders&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;lobby&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/lobby&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;localParticipant&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/onlineMeeting/665&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;messaging&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/messaging&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/onlineMeeting&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;phoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/phoneAudio&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;conversation&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;activeModalities&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Messaging&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;Audio&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;Video&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;ApplicationSharing&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;audienceMessaging&amp;quot;&amp;gt;Enabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;audienceMute&amp;quot;&amp;gt;Unknown&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;created&amp;quot;&amp;gt;2015-07-14T20:54:04.7195713-05:00&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2012-01-11T21:03:22.7433336-06:00&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;importance&amp;quot;&amp;gt;Normal&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;participantCount&amp;quot;&amp;gt;95&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;readLocally&amp;quot;&amp;gt;False&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;recording&amp;quot;&amp;gt;False&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;state&amp;quot;&amp;gt;Disconnected&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;subject&amp;quot;&amp;gt;Skype for Business&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;threadId&amp;quot;&amp;gt;534e445ee854436a8abe02c24985f78a&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

