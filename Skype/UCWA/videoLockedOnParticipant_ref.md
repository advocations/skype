
# videoLockedOnParticipant 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents the [participant](participant_ref.md) on whom the video spotlight is locked in an [onlineMeeting](onlineMeeting_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

All participants in the [onlineMeeting](onlineMeeting_ref.md) who are viewing video should see this participant's video feed. This resource helps an application keep track of the participant in the video spotlight for the corresponding [onlineMeeting](onlineMeeting_ref.md) via the event channel.


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|videoLockedOnParticipant|High|conversation|Indicates that the video spotlight feature has been turned on and locked on a participant.|
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
 "rel" : "conversation",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802",
 "events" : [
 {
 "link" : {
 "rel" : "videoLockedOnParticipant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant"
 },
 "in" : {
 "rel" : "audioVideo",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo"
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
|videoLockedOnParticipant|High|conversation|Indicates that the video spotlight has moved to a different participant.|
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
 "rel" : "conversation",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802",
 "events" : [
 {
 "link" : {
 "rel" : "videoLockedOnParticipant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant"
 },
 "in" : {
 "rel" : "audioVideo",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo"
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
|videoLockedOnParticipant|High|conversation|Indicates that the video spotlight feature has been turned off.|
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
 "rel" : "conversation",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802",
 "events" : [
 {
 "link" : {
 "rel" : "videoLockedOnParticipant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant"
 },
 "in" : {
 "rel" : "audioVideo",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo"
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

Returns a representation of the [participant](participant_ref.md) on whom the video spotlight is locked in an [onlineMeeting](onlineMeeting_ref.md).


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 1926
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
 "href" : "//v1/applications/833/communication/conversations/802/participants/575"
 },
 "admit" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/admit"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "contactPhoto" : {
 "href" : "//v1/applications/833/people/166/contactPhoto"
 },
 "contactPresence" : {
 "href" : "//v1/applications/833/people/166/contactPresence"
 },
 "conversation" : {
 "href" : "//v1/applications/833/communication/conversations/802"
 },
 "demote" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/demote"
 },
 "eject" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/eject"
 },
 "me" : {
 "href" : "//v1/applications/833/me"
 },
 "participantApplicationSharing" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantApplicationSharing"
 },
 "participantAudio" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantAudio"
 },
 "participantDataCollaboration" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantDataCollaboration"
 },
 "participantMessaging" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantMessaging"
 },
 "participantPanoramicVideo" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantPanoramicVideo"
 },
 "participantVideo" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantVideo"
 },
 "promote" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/promote"
 },
 "reject" : {
 "href" : "//v1/applications/833/communication/conversations/802/participants/575/reject"
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 2373
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="participant" href="//v1/applications/833/communication/conversations/802/participants/575" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="admit" href="//v1/applications/833/communication/conversations/802/participants/575/admit" />
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
 <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
 <link rel="conversation" href="//v1/applications/833/communication/conversations/802" />
 <link rel="demote" href="//v1/applications/833/communication/conversations/802/participants/575/demote" />
 <link rel="eject" href="//v1/applications/833/communication/conversations/802/participants/575/eject" />
 <link rel="me" href="//v1/applications/833/me" />
 <link rel="participantApplicationSharing" href="//v1/applications/833/communication/conversations/802/participants/575/participantApplicationSharing" />
 <link rel="participantAudio" href="//v1/applications/833/communication/conversations/802/participants/575/participantAudio" />
 <link rel="participantDataCollaboration" href="//v1/applications/833/communication/conversations/802/participants/575/participantDataCollaboration" />
 <link rel="participantMessaging" href="//v1/applications/833/communication/conversations/802/participants/575/participantMessaging" />
 <link rel="participantPanoramicVideo" href="//v1/applications/833/communication/conversations/802/participants/575/participantPanoramicVideo" />
 <link rel="participantVideo" href="//v1/applications/833/communication/conversations/802/participants/575/participantVideo" />
 <link rel="promote" href="//v1/applications/833/communication/conversations/802/participants/575/promote" />
 <link rel="reject" href="//v1/applications/833/communication/conversations/802/participants/575/reject" />
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
									
```

