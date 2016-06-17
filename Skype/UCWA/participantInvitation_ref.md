
# participantInvitation 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_


Represents an invitation to an existing [conversation](conversation_ref.md) for an additional participant.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource can be incoming or outgoing. If outgoing, the participantInvitation can be created using [addParticipant](addParticipant_ref.md). This resource assists in keeping track of the invitation status; for example, the invitation could be accepted, declined, or ignored. An outgoing participantInvitation will be in the 'Connecting' state while waiting for the recipient to accept or decline it. Note that if the recipient does not respond in approximately thirty seconds, the participantInvitation will complete with failure. Ultimately, the participantInvitation will complete with success or failure (in which case a [reason](reason_ref.md) is supplied). The participantInvitation will complete with success only after the [participant](participant_ref.md) appears in the roster. There is no incoming participantInvitation; it will instead appear as an [onlineMeetingInvitation](onlineMeetingInvitation_ref.md). 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|customContent|Custom Content.|
|direction|The direction of the invitation.|
|importance|The importance.|
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
|cancel|Cancels the corresponding invitation.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|from|Represents the [participant](participant_ref.md) that sent an invitation.|
|participant|Represents a remote participant in a [conversation](conversation_ref.md).|
|to|Represents the originally intended target of the invitation as a [contact](contact_ref.md).|
|acceptedByParticipant|Represents the remote participant who accepted the invitation of the user.|
|from|Represents the [participant](participant_ref.md) that sent an invitation.|

## Events
<a name="sectionSection2"> </a>




### started





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participantInvitation|High|communication|Delivered when a participant invitation is started. This occurs when the application adds a participant to a conversation.|
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
 "rel" : "participantInvitation",
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/746"
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
|participantInvitation|High|communication|Delivered when the participant invitation is updated.|
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
 "rel" : "participantInvitation",
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/746"
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
|participantInvitation|High|communication|Delivered when the participant invitation completes.|
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
 "rel" : "participantInvitation",
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/invitations/746"
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
|DialoutNotAllowed|Returned when an anonymous user or an attendee is not allowed to add a participant via telephone number.|
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

##### LocalFailure
 

|**Subcode**|**Reason**|
|:-----|:-----|
|Canceled|The invitation was cancelled by the local user.|
|Declined|The invitation was declined by the local user.|
|None|Local failure.|
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
|None|Remote failure.|
|NotAcceptable|The remote client is unable to accept the call at this time or context.|
|NotAllowed|The remote party is not allowed to process this request due to policy.|
|RepliedWithOtherModality|Replied with another modality.|
|TemporarilyUnavailable|The remote is temporarily unavailable.|
|TemporarilyUnavailable|Some service is temporarily unavailable.|
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
|Timeout|The operation timed out.|
|Unavailable|There is no suitable service available for this modality in this conference.|

##### Timeout
 

|**Subcode**|**Reason**|
|:-----|:-----|
|None|The operation has timed out.|
|None|Remote failure.|

## Operations
<a name="sectionSection3"> </a>




### GET

Returns a representation of an invitation to an existing [conversation](conversation_ref.md) for an additional participant.


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

 Get https://fe1.contoso.com:443//v1/applications/316/communication/invitations/746 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/json
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/json
 Content-Length: 4775
 {
 "rel" : "participantInvitation",
 "direction" : "Incoming",
 "importance" : "Normal",
 "operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
 "state" : "Connected",
 "subject" : "Strategy for next quarter",
 "threadId" : "292e0aaef36c426a97757f43dda19d06",
 "to" : "sip:john@contoso.com",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/316/communication/invitations/746"
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
 "cancel" : {
 "href" : "//v1/applications/316/communication/invitations/190/cancel"
 },
 "conversation" : {
 "href" : "//v1/applications/316/communication/conversations/271"
 },
 "participant" : {
 "href" : "//v1/applications/316/communication/conversations/271/participants/127"
 },
 "to" : {
 "href" : "//v1/applications/316/people/387"
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

 Get https://fe1.contoso.com:443//v1/applications/316/communication/invitations/746 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/xml
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 5798
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="participantInvitation" href="//v1/applications/316/communication/invitations/746" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="customContent" href="data:application/sdp;base64,base64-encoded-sdp" />
 <link rel="message" href="data:text/plain;base64,somebase64encodedmessage" />
 <link rel="from" href="//v1/applications/316/communication/conversations/271/participants/485" />
 <link rel="cancel" href="//v1/applications/316/communication/invitations/190/cancel" />
 <link rel="conversation" href="//v1/applications/316/communication/conversations/271" />
 <link rel="participant" href="//v1/applications/316/communication/conversations/271/participants/127" />
 <link rel="to" href="//v1/applications/316/people/387" />
 <property name="rel">participantInvitation</property>
 <property name="direction">Incoming</property>
 <property name="importance">Normal</property>
 <property name="operationId">74cb7404e0a247d5a2d4eb0376a47dbf</property>
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

