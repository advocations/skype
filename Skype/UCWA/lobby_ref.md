
# lobby 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Events](#sectionSection2)
 [Operations](#sectionSection3)


Represents a view of the [participant](participant_ref.md)s who have not yet been admitted to an [onlineMeeting](onlineMeeting_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

A [participant](participant_ref.md) in the lobby can be admitted by another participant in the organizer or presenter role. A participant in the lobby who is not admitted will eventually be disconnected. Lobby settings are controlled by the meeting organizer using the accessLevel property of [onlineMeeting](onlineMeeting_ref.md). 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|participant|Represents a remote participant in a [conversation](conversation_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participant|High|conversation|Indicates that a [participant](participant_ref.md) was added to the lobby.|
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
 "rel" : "participant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
 },
 "in" : {
 "rel" : "lobby",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/lobby"
 },
 "type" : "added"
 }
 ]
 }
 ]
}
					
```


### deleted





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participant|High|conversation|Indicates that a [participant](participant_ref.md) was removed from the lobby.|
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
 "rel" : "participant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
 },
 "in" : {
 "rel" : "lobby",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/lobby"
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

Returns a representation of a view of the [participant](participant_ref.md)s who have not yet been admitted to an [onlineMeeting](onlineMeeting_ref.md).


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/lobby HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 2061
										{
 "rel" : "lobby",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/communication/conversations/802/lobby"
 }
 },
 "_embedded" : {
 "participant" : [
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
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/lobby HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 2510
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="lobby" href="//v1/applications/833/communication/conversations/802/lobby" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">lobby</property>
 <resource rel="participant" href="//v1/applications/833/communication/conversations/802/participants/575">
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
</resource>
									
```

