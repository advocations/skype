
# conversation (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents the local participants perspective on a multi-modal, multi-party communication. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

A dashboard of the current capabilities that are dynamically aggregated based on the corresponding [application (UCWA)](application_ref.md)'s permissions, the user's role, and the capabilities of the remote participants and service components that are involved in the communication. While a conversation can be multi-modal and multi-party, it can also represent a basic call with one remote participant. A conversation is created by the server following an invitation. Note that terminating a conversation simply means that the user is leaving the communication; other participants might still be able to communicate. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|activeModalities|The active media in the conversation.|
|audienceMessaging|Whether the audience messaging modality is enabled/disabled in the current conversation.|
|audienceMute|The audio mute status of the local participant.|
|created|Creation time stamp in UTC.|
|expirationTime|The expiry time of the conversation.|
|importance|The importance of the conversation.|
|participantCount|The number of participants in the conversation.|
|readLocally|Whether the conversation was read locally.|
|recording|Whether the conversation is being recorded.|
|state|The state of the conversation.|
|subject|The subject of the conversation.|
|threadId|The thread ID of the conversation.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|addParticipant|Invites a [contact (UCWA)](contact_ref.md) to participate in a multiparty[conversation (UCWA)](conversation_ref.md).|
|applicationSharing|Represents the application sharing modality in the corresponding [conversation (UCWA)](conversation_ref.md).|
|attendees|Represents a view of the [participant (UCWA)](participant_ref.md)s having the attendee role in an [onlineMeeting (UCWA)](onlineMeeting_ref.md).|
|audioVideo|Represents the audio/video modality in the corresponding [conversation (UCWA)](conversation_ref.md).|
|dataCollaboration|Represents the data collaboration modality in the corresponding [conversation (UCWA)](conversation_ref.md).|
|disableAudienceMessaging|Disables the [messaging (UCWA)](messaging_ref.md) modality for all members of a[conversation (UCWA)](conversation_ref.md).|
|disableAudienceMuteLock|Disables the forced mute of attendees in a [conversation (UCWA)](conversation_ref.md).|
|enableAudienceMessaging|Enables the [messaging (UCWA)](messaging_ref.md) modality for all members of a[conversation (UCWA)](conversation_ref.md).|
|enableAudienceMuteLock|Enables the forced mute of attendees in a [conversation (UCWA)](conversation_ref.md).|
|leaders|Represents a view of the [participant (UCWA)](participant_ref.md)s in the leader role in an [onlineMeeting (UCWA)](onlineMeeting_ref.md).|
|lobby|Represents a view of the [participant (UCWA)](participant_ref.md)s who have not yet been admitted to an [onlineMeeting (UCWA)](onlineMeeting_ref.md).|
|localParticipant|Represents the user as a local [participant (UCWA)](participant_ref.md) in a specific[conversation (UCWA)](conversation_ref.md).|
|messaging|Represents the instant messaging modality in a [conversation (UCWA)](conversation_ref.md).|
|onlineMeeting|Represents a read-only version of the [onlineMeeting (UCWA)](onlineMeeting_ref.md) associated with this[conversation (UCWA)](conversation_ref.md).|
|phoneAudio|Represents the phone audio modality in a [conversation (UCWA)](conversation_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|conversation|High|communication|Delivered when a new conversation resource is added.|
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
            "rel" : "conversation",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802"
          },
          "type" : "added"
        }
      ]
    }
  ]
}
					
```


### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|conversation|High|communication|Delivered when the conversation resource is updated.|
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
            "rel" : "conversation",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802"
          },
          "type" : "updated"
        }
      ]
    }
  ]
}
					
```


### deleted





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|conversation|High|communication|Delivered when the conversation resource is deleted.|
Sample of returned event data.




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
            "rel" : "conversation",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802"
          },
          "type" : "deleted"
        }
      ]
    }
  ]
}
					
```


## Operations
<a name="sectionSection3"> </a>




### GET

Returns a representation of the local participant's perspective on a multi-modal, multi-party communication.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802 HTTP/1.1
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
  "created" : "\/Date(1436925244429)\/",
  "expirationTime" : "\/Date(1326337402743)\/",
  "importance" : "Normal",
  "participantCount" : 33,
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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802 HTTP/1.1
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
  &amp;lt;property name=&amp;quot;created&amp;quot;&amp;gt;2015-07-14T20:54:04.4355587-05:00&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2012-01-11T21:03:22.7433336-06:00&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;importance&amp;quot;&amp;gt;Normal&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;participantCount&amp;quot;&amp;gt;89&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;readLocally&amp;quot;&amp;gt;False&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;recording&amp;quot;&amp;gt;False&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;state&amp;quot;&amp;gt;Disconnected&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;subject&amp;quot;&amp;gt;Skype for Business&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;threadId&amp;quot;&amp;gt;534e445ee854436a8abe02c24985f78a&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


### DELETE

Removes the user from the communication, which ends the conversation. This operation tears down all active modalities.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).


#### Examples




#### JSON Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802 HTTP/1.1
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

										Delete https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```

