
# from 


 _**Applies to:** Skype for Business 2015_

Represents the [participant](participant_ref.md) that sent an invitation.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource is present in both incoming and outgoing invitations. In an incoming invitation, this resource can contain additional contact information that the application can use for display purposes. 


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
|contact|Represents a person or service that the user can communicate and collaborate with.|
|contactPhoto|The photo of a contact.|
|contactPresence|Represents a [contact](contact_ref.md)'s availability and activity.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|eject|Ejects the corresponding [participant](participant_ref.md) from the [onlineMeeting](onlineMeeting_ref.md).|
|me|Represents the user.|
|participantApplicationSharing|Represents whether a participant is using the application sharing modality in a conversation.|
|participantAudio|Represents whether a participant is using the audio modality in a conversation.|
|participantDataCollaboration|Represents whether a participant is using the data collaboration modality in a conversation.|
|participantMessaging|Used to determine whether a participant is using the instant messaging modality in a conversation.|
|participantPanoramicVideo|Represents whether a participant is using the panoramic video modality in a conversation.|
|participantVideo|Represents whether a participant is using the main video modality in a conversation.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the [participant](participant_ref.md) that sent an invitation.


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
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/420 HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json

```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
 HTTP/1.1 200 OK
 Content-Type: application/json
 Content-Length: 1527
 {
 "rel" : "from",
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
 "href" : "//v1/applications/833/communication/conversations/802/participants/420"
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
 }
 }
}
									
```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/420 HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 1935
 <?xml version="1.0" encoding="utf-8"?>
 <resource rel="from" href="//v1/applications/833/communication/conversations/802/participants/420" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
 <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
 <link rel="conversation" href="//v1/applications/833/communication/conversations/802" />
 <link rel="eject" href="//v1/applications/833/communication/conversations/802/participants/575/eject" />
 <link rel="me" href="//v1/applications/833/me" />
 <link rel="participantApplicationSharing" href="//v1/applications/833/communication/conversations/802/participants/575/participantApplicationSharing" />
 <link rel="participantAudio" href="//v1/applications/833/communication/conversations/802/participants/575/participantAudio" />
 <link rel="participantDataCollaboration" href="//v1/applications/833/communication/conversations/802/participants/575/participantDataCollaboration" />
 <link rel="participantMessaging" href="//v1/applications/833/communication/conversations/802/participants/575/participantMessaging" />
 <link rel="participantPanoramicVideo" href="//v1/applications/833/communication/conversations/802/participants/575/participantPanoramicVideo" />
 <link rel="participantVideo" href="//v1/applications/833/communication/conversations/802/participants/575/participantVideo" />
 <property name="rel">from</property>
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

