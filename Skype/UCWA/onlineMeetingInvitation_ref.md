
# onlineMeetingInvitation (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents an invitation to a new or existing [onlineMeeting (UCWA)](onlineMeeting_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource can be incoming or outgoing. If outgoing, the onlineMeetingInvitation can be created using [joinOnlineMeeting (UCWA)](joinOnlineMeeting_ref.md). This resource assists in keeping track of the invitation status; for example, the invitation could be accepted, declined, or ignored. An outgoing onlineMeetingInvitation will be in the 'Connecting' state while the invitation is being processed. Note that the onlineMeetingInvitation will not complete until the user has been admitted ([admit (UCWA)](admit_ref.md)). Even after the user is in the [lobby (UCWA)](lobby_ref.md), the onlineMeetingInvitation will still be in the 'Connecting' state. The onlineMeetingInvitation will complete with success if the user is admitted from the lobby or with failure if he or she is rejected. Ultimately, the onlineMeetingInvitation will complete with success or failure (in which case a [reason (UCWA)](reason_ref.md) is supplied). The onlineMeetingInvitation will complete with success only after the[participant (UCWA)](participant_ref.md) appears in the roster. If incoming, the onlineMeetingInvitation was created after the user accepted a[participantInvitation (UCWA)](participantInvitation_ref.md). Note that this is the only way an incoming onlineMeetingInvitation can occur. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|anonymousDisplayName|The display name for anonymous users. This is required for anonymous users and should not be set for authenticated users.The maximum length is 250 characters.|
|availableModalities|The available modality types in the conference.|
|customContent|Custom Content.|
|direction|The direction of the invitation.|
|importance|The importance.|
|onlineMeetingUri|The URI of the meeting to join.|
|message|The first message represented in this invitation.|
|operationId|The operation ID as supplied by the client.The maximum length is 50 characters.|
|state|The invitation state.|
|subject|The subject.The maximum length is 250 characters.|
|threadId|The thread ID of the conversation.|
|to|The target of this invitation.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|accept|Accepts an incoming invitation.|
|acceptedByContact|Represents the [contact (UCWA)](contact_ref.md) who ultimately accepted an incoming invitation.|
|cancel|Cancels the corresponding invitation.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|decline|Declines an incoming invitation.|
|from|Represents the [participant (UCWA)](participant_ref.md) that sent an invitation.|
|onBehalfOf|Represents the [contact (UCWA)](contact_ref.md) on whose behalf the invitation was received.|
|to|Represents the originally intended target of the invitation as a [contact (UCWA)](contact_ref.md).|
|from|Represents the [participant (UCWA)](participant_ref.md) that sent an invitation.|

## Events
<a name="sectionSection2"> </a>




### started





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|onlineMeetingInvitation|High|communication|Delivered when an online meeting invitation is started. This occurs when the application joins the [onlineMeeting (UCWA)](onlineMeeting_ref.md) modality.|
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
      "href" : "https://fe1.contoso.com:443//v1/applications/316/communication",
      "events" : [
        {
          "link" : {
            "rel" : "onlineMeetingInvitation",
            "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/668"
          },
          "type" : "started"
        }
      ]
    }
  ]
}
					
```


### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|onlineMeetingInvitation|High|communication|Delivered when the online meeting invitation is updated.|
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
      "href" : "https://fe1.contoso.com:443//v1/applications/316/communication",
      "events" : [
        {
          "link" : {
            "rel" : "onlineMeetingInvitation",
            "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/668"
          },
          "type" : "updated"
        }
      ]
    }
  ]
}
					
```


### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|onlineMeetingInvitation|High|communication|Delivered when the online meeting invitation completes.|
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
      "href" : "https://fe1.contoso.com:443//v1/applications/316/communication",
      "events" : [
        {
          "link" : {
            "rel" : "onlineMeetingInvitation",
            "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/668"
          },
          "type" : "completed"
        }
      ]
    }
  ]
}
					
```


#### Asynchronous reason codes

The  **completed** event is sent on the event channel when the operation is finished. A status value of "success" indicates that the operation completed successfully.A status value of "failure" indicates that the operation failed. In case of failure, the error code and subcode are sent on the event channel.The following table shows the errors that are possible for this resource.

It is recommended that applications handle the error codes shown here. Applications can optionally display subcodes and messages in their user interface.


- Conflict
    

|**Subcode**|**Reason**|
|:-----|:-----|
|AlreadyExists|The already exists error.|
|AlreadyExists|There was a problem joining the conference focus.|
|None|The resource is being deleted.|
|None|There was a problem joining the conference focus.|
|None|Un-supported Service/Resource/API error.|
|TooManyGroups|The too many groups error.|
|TooManyLobbyParticipants|There are already too many partcipants in the lobby.|
|TooManyParticipants|There are already too many participants in this meeting. The meeting limit has been exceeded.|
- EntityTooLarge
    

|**Subcode**|**Reason**|
|:-----|:-----|
|None|The request was too large.|
- Forbidden
    

|**Subcode**|**Reason**|
|:-----|:-----|
|AnonymousNotAllowed|This meeting does not allow dial-out by attendees.|
|DialoutNotAllowed|This meeting does not allow dial-out by attendees.|
|FederationRequired|Federation required.|
|InviteesOnly|The meeting is for invited participants only.|
|InviteesOnly|User not allowed in closed meeting.|
|ModalityNotSupported|The requested modality is not allowed in the conference.|
|ModalityNotSupported|The remote client does not support the requested modality.|
|None|Participant is not connected to meeting.|
|Unreachable|The destination is not reachable.|
- Informational
    

|**Subcode**|**Reason**|
|:-----|:-----|
|AutoAccepted|Invitation was auto-accepted|
|Canceled|Request was canceled.|
|ConnectedElsewhere|The invitation was accepted at another location.|
|DerivedConversation|A derived conversation was created.|
|Ended|The meeting has ended.|
|MediaFallback|The invitation was cancelled by the media fallback logic.|
|Missed|The invitation was missed.|
- LocalFailure
    

|**Subcode**|**Reason**|
|:-----|:-----|
|Canceled|The invitation was cancelled by the local user.|
|Declined|The invitation was declined by the local user.|
|None|Local failure.|
|Timeout|The invitation timed out locally.|
- NotFound
    

|**Subcode**|**Reason**|
|:-----|:-----|
|DestinationNotFound|The destination identity could not be found.|
- RemoteFailure
    

|**Subcode**|**Reason**|
|:-----|:-----|
|AnotherOperationPending|Remote Failure with another operation pending.|
|Busy|The remote side indicated that it is too busy at this time to accept the invitation.|
|Canceled|The invitation was cancelled by a remote user.|
|Declined|The outgoing invitation was declined.|
|DoNotDisturb|The remote party does not want to be disturbed at this time.|
|None|Remote failure.|
|NotAcceptable|The remote client is unable to accept the call at this time or context.|
|NotAllowed|The remote party is not allowed to process this request due to policy.|
|RepliedWithOtherModality|Replied with another modality.|
|TemporarilyUnavailable|The remote is temporarily unavailable.|
|TemporarilyUnavailable|Some service is temporarily unavailable.|
|ThreadIdAlreadyExists|The invitation was not accepted as the remote is already in a conversation with the same thread ID.|
|Timeout|The operation has timed out on the callee's end.|
|UnsupportedMediaType|Unsupported media.|
- ServiceFailure
    

|**Subcode**|**Reason**|
|:-----|:-----|
|CallbackChannelError|The remote event channel is not reachable|
|EscalationFailed|Escalation failed.|
|InvalidExchangeServerVersion|Invalid exchange server version.|
|None|Internal server error.|
|Timeout|The operation timed out.|
|Unavailable|There is no suitable service available for this modality in this conference.|
- Timeout
    

|**Subcode**|**Reason**|
|:-----|:-----|
|None|Remote failure.|
|None|The operation has timed out.|

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
|BadRequest|400|None|Something is wrong with the entire request (malformed XML/JSON, for example).|
|BadRequest|400|ParameterValidationFailure|Incorrect parameters were provided for the request (for example, the requested conference subject exceeds the maximum length).|
|Gone|410|None|The content-type is not supported.|
|NotFound|404|None|The resource does not exist.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/316/communication/invitations/668 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 3155
										{
  "rel" : "onlineMeetingInvitation",
  "anonymousDisplayName" : "Cathy Arnold",
  "availableModalities" : [
    "Messaging",
    "Audio",
    "ApplicationSharing"
  ],
  "direction" : "Incoming",
  "importance" : "Normal",
  "onlineMeetingUri" : "sip:john@contoso.com",
  "operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
  "state" : "Connecting",
  "subject" : "Strategy for next quarter",
  "threadId" : "292e0aaef36c426a97757f43dda19d06",
  "to" : "sip:john@contoso.com",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/316/communication/invitations/668"
    },
    "customContent" : {
      "href" : "data:application/sdp;base64,base64-encoded-sdp"
    },
    "message" : {
      "href" : "data:text/plain;base64,somebase64encodedmessage"
    },
    "from" : {
      "href" : "//v1/applications/316/communication/conversations/271/participants/485"
    },
    "accept" : {
      "href" : "//v1/applications/316/communication/invitations/190/accept"
    },
    "acceptedByContact" : {
      "href" : "//v1/applications/316/people/905"
    },
    "cancel" : {
      "href" : "//v1/applications/316/communication/invitations/190/cancel"
    },
    "conversation" : {
      "href" : "//v1/applications/316/communication/conversations/271"
    },
    "decline" : {
      "href" : "//v1/applications/316/communication/invitations/190/decline"
    },
    "onBehalfOf" : {
      "href" : "//v1/applications/316/people/367"
    },
    "to" : {
      "href" : "//v1/applications/316/people/387"
    }
  },
  "_embedded" : {
    "from" : {
      "rel" : "participant",
      "anonymous" : true,
      "name" : "Joe Smith",
      "organizer" : true,
      "otherPhoneNumber" : "tel:+14251111111",
      "role" : "Attendee",
      "sourceNetwork" : "SameEnterprise",
      "uri" : "sip:john@contoso.com",
      "workPhoneNumber" : "tel:+14251111111",
      "_links" : {
        "self" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127"
        },
        "admit" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/admit"
        },
        "contact" : {
          "href" : "//v1/applications/316/people/420"
        },
        "contactPhoto" : {
          "href" : "//v1/applications/316/people/420/contactPhoto"
        },
        "contactPresence" : {
          "href" : "//v1/applications/316/people/420/contactPresence"
        },
        "conversation" : {
          "href" : "//v1/applications/316/communication/conversations/271"
        },
        "demote" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/demote"
        },
        "eject" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/eject"
        },
        "me" : {
          "href" : "//v1/applications/316/me"
        },
        "participantApplicationSharing" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/participantApplicationSharing"
        },
        "participantAudio" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/participantAudio"
        },
        "participantDataCollaboration" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/participantDataCollaboration"
        },
        "participantMessaging" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/participantMessaging"
        },
        "participantPanoramicVideo" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/participantPanoramicVideo"
        },
        "participantVideo" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/participantVideo"
        },
        "promote" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/promote"
        },
        "reject" : {
          "href" : "//v1/applications/316/communication/conversations/271/participants/127/reject"
        }
      }
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/316/communication/invitations/668 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 3972
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="onlineMeetingInvitation" href="//v1/applications/316/communication/invitations/668" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
  <link rel="customContent" href="data:application/sdp;base64,base64-encoded-sdp" />
  <link rel="message" href="data:text/plain;base64,somebase64encodedmessage" />
  <link rel="from" href="//v1/applications/316/communication/conversations/271/participants/485" />
  <link rel="accept" href="//v1/applications/316/communication/invitations/190/accept" />
  <link rel="acceptedByContact" href="//v1/applications/316/people/905" />
  <link rel="cancel" href="//v1/applications/316/communication/invitations/190/cancel" />
  <link rel="conversation" href="//v1/applications/316/communication/conversations/271" />
  <link rel="decline" href="//v1/applications/316/communication/invitations/190/decline" />
  <link rel="onBehalfOf" href="//v1/applications/316/people/367" />
  <link rel="to" href="//v1/applications/316/people/387" />
  <property name="rel">onlineMeetingInvitation</property>
  <property name="anonymousDisplayName">Cathy Arnold</property>
  <propertyList name="availableModalities">
    <item>Messaging</item>
    <item>Audio</item>
    <item>ApplicationSharing</item>
  </propertyList>
  <property name="direction">Incoming</property>
  <property name="importance">Normal</property>
  <property name="onlineMeetingUri">sip:john@contoso.com</property>
  <property name="operationId">74cb7404e0a247d5a2d4eb0376a47dbf</property>
  <property name="state">Connected</property>
  <property name="subject">Strategy for next quarter</property>
  <property name="threadId">292e0aaef36c426a97757f43dda19d06</property>
  <property name="to">sip:john@contoso.com</property>
  <resource rel="from" href="//v1/applications/316/communication/conversations/271/participants/127">
    <link rel="admit" href="//v1/applications/316/communication/conversations/271/participants/127/admit" />
    <link rel="contact" href="//v1/applications/316/people/420" />
    <link rel="contactPhoto" href="//v1/applications/316/people/420/contactPhoto" />
    <link rel="contactPresence" href="//v1/applications/316/people/420/contactPresence" />
    <link rel="conversation" href="//v1/applications/316/communication/conversations/271" />
    <link rel="demote" href="//v1/applications/316/communication/conversations/271/participants/127/demote" />
    <link rel="eject" href="//v1/applications/316/communication/conversations/271/participants/127/eject" />
    <link rel="me" href="//v1/applications/316/me" />
    <link rel="participantApplicationSharing" href="//v1/applications/316/communication/conversations/271/participants/127/participantApplicationSharing" />
    <link rel="participantAudio" href="//v1/applications/316/communication/conversations/271/participants/127/participantAudio" />
    <link rel="participantDataCollaboration" href="//v1/applications/316/communication/conversations/271/participants/127/participantDataCollaboration" />
    <link rel="participantMessaging" href="//v1/applications/316/communication/conversations/271/participants/127/participantMessaging" />
    <link rel="participantPanoramicVideo" href="//v1/applications/316/communication/conversations/271/participants/127/participantPanoramicVideo" />
    <link rel="participantVideo" href="//v1/applications/316/communication/conversations/271/participants/127/participantVideo" />
    <link rel="promote" href="//v1/applications/316/communication/conversations/271/participants/127/promote" />
    <link rel="reject" href="//v1/applications/316/communication/conversations/271/participants/127/reject" />
    <property name="rel">participant</property>
    <property name="anonymous">True</property>
    <property name="name">Joe Smith</property>
    <property name="organizer">True</property>
    <property name="otherPhoneNumber">tel:+14251111111</property>
    <property name="role">Attendee</property>
    <property name="sourceNetwork">SameEnterprise</property>
    <property name="uri">sip:john@contoso.com</property>
    <property name="workPhoneNumber">tel:+14251111111</property>
  </resource>
</resource>
									
```

