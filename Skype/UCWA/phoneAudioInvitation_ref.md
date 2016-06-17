
# phoneAudioInvitation 



_**Applies to:** Skype for Business 2015_

Represents an invitation to a [conversation](conversation_ref.md) for the [phoneAudio](phoneAudio_ref.md) modality.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource can be incoming or outgoing. If outgoing, the phoneAudioInvitation can be created in one of two ways. First, [startPhoneAudio](startPhoneAudio_ref.md) will create a phoneAudioInvitation that also creates a [conversation](conversation_ref.md).Second, [addPhoneAudio](addPhoneAudio_ref.md) will attempt to add the [phoneAudio](phoneAudio_ref.md) modality to an existing [conversation](conversation_ref.md). An outgoing invitation will first ring the user on the supplied phone number. After the user answers the call, the phoneAudioInvitation will be then be sent to the target. This resource assists in keeping track of the invitation status; for example, the invitation could be forwarded or sent to all members of the invitee's team (team ring). Ultimately, the phoneAudioInvitation will complete with success or failure (in which case a [reason](reason_ref.md) is supplied). If the phoneAudioInvitation succeeds, the participant ( [acceptedByParticipant](acceptedByParticipant_ref.md)) who accepts the call can be different from the original target ( [to](to_ref.md)). The application can determine when the target is different by comparing the [contact](contact_ref.md) in the [acceptedByParticipant](acceptedByParticipant_ref.md) with the contact represented by the [to](to_ref.md) resource. In the case of [addPhoneAudio](addPhoneAudio_ref.md), the corresponding phoneAudioInvitation will cause the creation of a new, related conversation ( [derivedConversation](derivedConversation_ref.md)) with the new remote [participant](participant_ref.md)s. If incoming, the phoneAudioInvitation might create a new [conversation](conversation_ref.md) or attempt to add the [phoneAudio](phoneAudio_ref.md) modality to an existing [conversation](conversation_ref.md). Note that a phoneAudioInvitation cannot be accepted using the API; instead it is accepted when the user answers the phone call. It can, however, be declined using the API. Additionally, an incoming phoneAudioInvitation can be the result of being transferred by a contact ( [transferredBy](transferredBy_ref.md)) or by being forwarded by by a contact ( [forwardedBy](forwardedBy_ref.md)). It can also be received on behalf of another user ( [onBehalfOf](onBehalfOf_ref.md)) of the calling party ( [from](from_ref.md)). 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|customContent|Custom Content.|
|direction|The direction of the invitation.|
|importance|The importance.|
|joinAudioMuted|The audio mute status upon joining the online meeting.|
|operationId|The operation ID as supplied by the client.The maximum length is 50 characters.|
|phoneNumber|The telephone number of the local user.|
|privateLine|Whether this invitation was received on a private line of the local participant.|
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
|acceptedByContact|Represents the [contact](contact_ref.md) who ultimately accepted an incoming invitation.|
|cancel|Cancels the corresponding invitation.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|decline|Declines an incoming invitation.|
|derivedConversation|Represents a related conversation with a different [participant](participant_ref.md) than the one of the original conversation.|
|derivedPhoneAudio|Represents the [phoneAudio](phoneAudio_ref.md) modality in a [derivedConversation](derivedConversation_ref.md).|
|forwardedBy|Represents the [contact](contact_ref.md) who last forwarded the invitation before it was received by the user.|
|from|Represents the [participant](participant_ref.md) that sent an invitation.|
|onBehalfOf|Represents the [contact](contact_ref.md) on whose behalf the invitation was received.|
|phoneAudio|Represents the phone audio modality in a [conversation](conversation_ref.md).|
|to|Represents the originally intended target of the invitation as a [contact](contact_ref.md).|
|transferredBy|Represents the [contact](contact_ref.md) who transferred the call.|
|acceptedByParticipant|Represents the remote participant who accepted the invitation of the user.|
|from|Represents the [participant](participant_ref.md) that sent an invitation.|

## Events
<a name="sectionSection2"> </a>




### started





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|phoneAudioInvitation|High|communication|Delivered when a phone audio invitation is started. This occurs when the application adds the local participant's phone to a conversation.|
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
"rel" : "phoneAudioInvitation",
"href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/162"
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
|phoneAudioInvitation|High|communication|Delivered when the phone audio invitation is updated.|
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
"rel" : "phoneAudioInvitation",
"href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/162"
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
|phoneAudioInvitation|High|communication|Delivered when the phone audio invitation completes.|
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
"rel" : "phoneAudioInvitation",
"href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/162"
},
"type" : "completed"
}
]
}
]
}

```


#### Asynchronous reason codes

The **completed** event is sent on the event channel when the operation is finished. A status value of "success" indicates that the operation completed successfully.A status value of "failure" indicates that the operation failed. In case of failure, the error code and subcode are sent on the event channel.The following table shows the errors that are possible for this resource.

It is recommended that applications handle the error codes shown here. Applications can optionally display subcodes and messages in their user interface.


##### BadRequest


|**Subcode**|**Reason**|
|:-----|:-----|
|NormalizationFailed|The phone normalization failed.|

##### Conflict


|**Subcode**|**Reason**|
|:-----|:-----|
|AlreadyExists|The already exists error.|
|AlreadyExists|There was a problem joining the conference focus.|
|None|Un-supported Service/Resource/API error.|
|None|The resource is being deleted.|
|None|There was a problem joining the conference focus.|
|TooManyGroups|The too many groups error.|

##### EntityTooLarge


|**Subcode**|**Reason**|
|:-----|:-----|
|None|The request was too large.|

##### Forbidden


|**Subcode**|**Reason**|
|:-----|:-----|
|AnonymousNotAllowed|This meeting does not allow dial-out by attendees.|
|DialoutNotAllowed|This meeting does not allow dial-out by attendees.|
|FederationRequired|Federation required.|
|InviteesOnly|User not allowed in closed meeting.|
|ModalityNotSupported|The requested modality is not allowed in the conference.|
|ModalityNotSupported|The remote client does not support the requested modality.|
|None|Participant is not connected to meeting.|
|Unreachable|The destination is not reachable.|

##### Informational


|**Subcode**|**Reason**|
|:-----|:-----|
|AutoAccepted|Invitation was auto-accepted|
|Canceled|Request was canceled.|
|ConnectedElsewhere|The invitation was accepted at another location.|
|DerivedConversation|A derived conversation was created.|
|MediaFallback|The invitation was cancelled by the media fallback logic.|
|Missed|The invitation was missed.|
|Redirected|The invitation was redirected to another [contact](contact_ref.md).|

##### LocalFailure


|**Subcode**|**Reason**|
|:-----|:-----|
|Canceled|The invitation was cancelled by the local user.|
|Declined|The invitation was declined by the local user.|
|None|Local failure.|
|PstnCallFailed|For an outgoing call scenario, the first stage, PSTN call establishment, failed.|
|Timeout|The invitation timed out locally.|

##### NotFound


|**Subcode**|**Reason**|
|:-----|:-----|
|DestinationNotFound|The destination identity could not be found.|

##### RemoteFailure


|**Subcode**|**Reason**|
|:-----|:-----|
|AnotherOperationPending|Remote Failure with another operation pending.|
|Busy|The remote side indicated that it is too busy at this time to accept the invitation.|
|Canceled|The invitation was cancelled by a remote user.|
|Declined|The outgoing invitation was declined.|
|DoNotDisturb|The remote party does not want to be disturbed at this time.|
|InsufficientBandwidth|The outgoing phoneAudioInvitation was rejected by the remote client due to insufficient bandwidth.|
|MediaEncryptionMismatch|There was a media encryption mismatch between local and remote clients.|
|MediaFailure|The remote client experienced a media failure while processing the request.|
|None|Remote failure.|
|NotAcceptable|The remote client is unable to accept the call at this time or context.|
|NotAllowed|The remote party is not allowed to process this request due to policy.|
|RepliedWithOtherModality|Replied with another modality.|
|TemporarilyUnavailable|Some service is temporarily unavailable.|
|TemporarilyUnavailable|The remote is temporarily unavailable.|
|ThreadIdAlreadyExists|The invitation was not accepted as the remote is already in a conversation with the same thread ID.|
|Timeout|The operation has timed out on the callee's end.|
|UnsupportedMediaType|Unsupported media.|

##### ServiceFailure


|**Subcode**|**Reason**|
|:-----|:-----|
|CallbackChannelError|The remote event channel is not reachable|
|EscalationFailed|Escalation failed.|
|InvalidExchangeServerVersion|Invalid exchange server version.|
|None|Internal server error.|
|PhoneNumberConflict|There are multiple users associated with the destination phone number.|
|PstnCallFailed|For an incoming call fallback from VoIP scenario, the last stage, PSTN call establishment, failed.|
|Timeout|The operation timed out.|
|Unavailable|There is no suitable service available for this modality in this conference.|

##### Timeout


|**Subcode**|**Reason**|
|:-----|:-----|
|None|Remote failure.|
|None|The operation has timed out.|

## Operations
<a name="sectionSection3"> </a>




### GET

Returns a representation of the invitation to the [phoneAudio](phoneAudio_ref.md) modality for a [conversation](conversation_ref.md).


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

Get https://fe1.contoso.com:443//v1/applications/316/communication/invitations/162 HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json


```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 5361
{
"rel" : "phoneAudioInvitation",
"direction" : "Incoming",
"importance" : "Normal",
"joinAudioMuted" : false,
"operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
"phoneNumber" : "tel:+14255551234",
"privateLine" : false,
"state" : "Connected",
"subject" : "Strategy for next quarter",
"threadId" : "292e0aaef36c426a97757f43dda19d06",
"to" : "sip:john@contoso.com",
"_links" : {
"self" : {
"href" : "//v1/applications/316/communication/invitations/162"
},
"customContent" : {
"href" : "data:application/sdp;base64,base64-encoded-sdp"
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
"derivedConversation" : {
"href" : "//v1/applications/316/communication/invitations/190/derivedConversation"
},
"derivedPhoneAudio" : {
"href" : "//v1/applications/316/communication/invitations/190/derivedPhoneAudio"
},
"forwardedBy" : {
"href" : "//v1/applications/316/people/725"
},
"onBehalfOf" : {
"href" : "//v1/applications/316/people/367"
},
"phoneAudio" : {
"href" : "//v1/applications/316/communication/phoneAudio"
},
"to" : {
"href" : "//v1/applications/316/people/387"
},
"transferredBy" : {
"href" : "//v1/applications/316/people/785"
}
},
"_embedded" : {
"acceptedByParticipant" : [
{
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
],
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

Get https://fe1.contoso.com:443//v1/applications/316/communication/invitations/162 HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml


```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 6512
<?xml version="1.0" encoding="utf-8"?>
<resource rel="phoneAudioInvitation" href="//v1/applications/316/communication/invitations/162" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<link rel="customContent" href="data:application/sdp;base64,base64-encoded-sdp" />
<link rel="from" href="//v1/applications/316/communication/conversations/271/participants/485" />
<link rel="accept" href="//v1/applications/316/communication/invitations/190/accept" />
<link rel="acceptedByContact" href="//v1/applications/316/people/905" />
<link rel="cancel" href="//v1/applications/316/communication/invitations/190/cancel" />
<link rel="conversation" href="//v1/applications/316/communication/conversations/271" />
<link rel="decline" href="//v1/applications/316/communication/invitations/190/decline" />
<link rel="derivedConversation" href="//v1/applications/316/communication/invitations/190/derivedConversation" />
<link rel="derivedPhoneAudio" href="//v1/applications/316/communication/invitations/190/derivedPhoneAudio" />
<link rel="forwardedBy" href="//v1/applications/316/people/725" />
<link rel="onBehalfOf" href="//v1/applications/316/people/367" />
<link rel="phoneAudio" href="//v1/applications/316/communication/phoneAudio" />
<link rel="to" href="//v1/applications/316/people/387" />
<link rel="transferredBy" href="//v1/applications/316/people/785" />
<property name="rel">phoneAudioInvitation</property>
<property name="direction">Incoming</property>
<property name="importance">Normal</property>
<property name="joinAudioMuted">False</property>
<property name="operationId">74cb7404e0a247d5a2d4eb0376a47dbf</property>
<property name="phoneNumber">tel:+14255551234</property>
<property name="privateLine">False</property>
<property name="state">Connecting</property>
<property name="subject">Strategy for next quarter</property>
<property name="threadId">292e0aaef36c426a97757f43dda19d06</property>
<property name="to">sip:john@contoso.com</property>
<resource rel="acceptedByParticipant" href="//v1/applications/316/communication/conversations/271/participants/127">
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

