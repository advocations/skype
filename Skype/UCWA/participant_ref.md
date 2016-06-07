
# participant 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents a remote participant in a [conversation](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|
|title|The display name or normalized phone number of the participant, if available.|

## Resource description
<a name="sectionSection1"> </a>

A participant resource is the transient representation of a [contact](contact_ref.md) that captures attributes such as role and capabilities (e.g. promoting to leader or admitting from lobby). A participant's lifetime is controlled by the server and starts when the participant is present upon joining an [onlineMeeting](onlineMeeting_ref.md) or added later on to a [conversation](conversation_ref.md). This resource is removed when the participant leaves the [conversation](conversation_ref.md). 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|anonymous|Whether the participant is anonymous.|
|name|The participant's display name.|
|organizer|Whether the participant is an organizer.An organizer can never be locked out of her own meeting.|
|otherPhoneNumber|The participant's Other Phone.|
|role|The participant's role (Role), such as Attendee or Leader.|
|sourceNetwork|The participant's source network (SourceNetwork), such as SameEnterprise or PublicCloud (for example, a Skype contact).|
|uri|The participant's URI.|
|workPhoneNumber|The participant's Phone URI.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|admit|Admits the corresponding [participant](participant_ref.md) into the [onlineMeeting](onlineMeeting_ref.md).|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|contactPhoto|The photo of a contact.|
|contactPresence|Represents a [contact](contact_ref.md)'s availability and activity.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|demote|Demotes the corresponding [participant](participant_ref.md) from the leader role to the attendee role.|
|eject|Ejects the corresponding [participant](participant_ref.md) from the [onlineMeeting](onlineMeeting_ref.md).|
|me|Represents the user.|
|participantApplicationSharing|Represents whether a participant is using the application sharing modality in a conversation.|
|participantAudio|Represents whether a participant is using the audio modality in a conversation.|
|participantDataCollaboration|Represents whether a participant is using the data collaboration modality in a conversation.|
|participantMessaging|Used to determine whether a participant is using the instant messaging modality in a conversation.|
|participantPanoramicVideo|Represents whether a participant is using the panoramic video modality in a conversation.|
|participantVideo|Represents whether a participant is using the main video modality in a conversation.|
|promote|Promotes the corresponding [participant](participant_ref.md) from the attendee role to the leader role.|
|reject|Denies the corresponding [participant](participant_ref.md) access to the [onlineMeeting](onlineMeeting_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participant|High|conversation|Indicates that the [participant](participant_ref.md) has joined the [conversation](conversation_ref.md). The application can choose to retrieve the updated information.|
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
|participant|High|conversation|Indicates that the [participant](participant_ref.md) has been updated. The application can choose to retrieve the updated information.|
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
|participant|High|conversation|Indicates that the [participant](participant_ref.md) has left a [conversation](conversation_ref.md).|
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

Returns a representation of the participant resource.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575 HTTP/1.1
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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575 HTTP/1.1
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

