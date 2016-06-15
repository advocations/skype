
# myAssignedOnlineMeeting 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_


Represents a user's [onlineMeeting](onlineMeeting_ref.md) that is commonly used for scheduled meetings with other [contact](contact_ref.md)s. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource might not be available based on admin policies. When available, the [onlineMeeting](onlineMeeting_ref.md) attributes are defined by the admin.


### Properties





|**Name**|**Description**|
|:-----|:-----|
|accessLevel|The access level that controls admission to the online meeting.|
|attendees|The list of online meeting attendees.|
|automaticLeaderAssignment|The policy that determines which participants are automatically promoted to leaders.An online meeting organizer can schedule a meeting so that users are automatically promoted to theleader role when they join the meeting. For example, if the meeting is scheduled withautomatic promotion policy set to AutomaticLeaderAssignment.SameEnterprise, then any participants from the organizer's company are automaticallypromoted to leaders when they join the meeting. Conference leaders can still promote specific users to the leader role,including anonymous users.|
|conferenceId|The conference ID for the online meeting.Attendees who dial into the online meeting by using a PSTN phone use the conference ID.|
|description|The long description of the online meeting's purpose.|
|entryExitAnnouncement|The attendance announcements status for the online meeting.When attendance announcements are enabled, the online meeting will announce the names of the participantswho join the meeting through audio.|
|expirationTime|The absolute Coordinated Universal Time (UTC) date and time after which the online meeting can be deleted.The day and time must be between one year before, and ten years after, thecurrent date and time on the server.|
|joinUrl|The URL that is used when the online meeting is joined from the web.|
|leaders|The list of online meeting leaders.The organizer will automatically be added to the leaders list.|
|lobbyBypassForPhoneUsers|The lobby bypass setting for this online meeting.|
|onlineMeetingId|The online meeting ID that identifies this meeting among the other online meetings that arescheduled by the organizer.The online meeting ID is unique within the organizer's list of scheduled online meetings.|
|onlineMeetingRel|The scheduling template that the organizer uses to schedule this online meeting.|
|onlineMeetingUri|The online meeting URI.The online meeting URI is used by participants to join this online meeting.|
|organizerUri|The URI of the online meeting organizer: the person who scheduled the meeting.Organizers can enumerate or change only the conferences that they organize.|
|phoneUserAdmission|Whether participants can join the online meeting over the phone.Setting this property to true means that online meeting participants can join the meetingover the phone through the Conferencing Auto Attendant (CAA) service.|
|subject|The subject of the online meeting.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|onlineMeetingExtensions|Represents the set of [onlineMeetingExtension](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting](onlineMeeting_ref.md).|
|onlineMeetingExtensions|Represents the set of [onlineMeetingExtension](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting](onlineMeeting_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a user's [onlineMeeting](onlineMeeting_ref.md) that is commonly used for scheduled meetings with other [contact](contact_ref.md)s.


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

 Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/318 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/json
 if-none-match: 1a858907-e923-4b08-a3ce-842c526fcc1a
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Etag: c0fdc371-ca49-45e4-8744-c34c124a3d9e
 Content-Type: application/json
 Content-Length: 1284
 {
 "rel" : "myAssignedOnlineMeeting",
 "accessLevel" : "Invited",
 "attendees" : [
 "sip:johndoe@contoso.com",
 "sip:janedoe@contoso.com"
 ],
 "automaticLeaderAssignment" : "SameEnterprise",
 "conferenceId" : "12983487",
 "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
 "entryExitAnnouncement" : "Disabled",
 "expirationTime" : "\/Date(1436925243056)\/",
 "joinUrl" : "https://meet.contoso.com/bmauldin/IB88RLLY",
 "leaders" : [
 "sip:aikc@contoso.com",
 "sip:lenea@contoso.com"
 ],
 "lobbyBypassForPhoneUsers" : "Disabled",
 "onlineMeetingId" : "IB88RLLY",
 "onlineMeetingRel" : "myOnlineMeetings",
 "onlineMeetingUri" : "sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY",
 "organizerUri" : "sip:bmauldin@contoso.com",
 "phoneUserAdmission" : "Disabled",
 "subject" : "Quarterly sales numbers",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/318"
 },
 "onlineMeetingExtensions" : {
 "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions"
 }
 },
 "_embedded" : {
 "onlineMeetingExtension" : [
 {
 "rel" : "onlineMeetingExtension",
 "id" : "917823",
 "type" : "RoamedParticipantData",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"
 }
 }
 }
 ]
 }
}
									
```


#### XML Request


```

 Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/318 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/xml
 if-none-match: 66142d43-295e-4742-b17f-da5717891845
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Etag: 77f6f303-b61f-46c2-8641-ba65dd8b58d4
 Content-Type: application/xml
 Content-Length: 1914
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="myAssignedOnlineMeeting" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/318" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="onlineMeetingExtensions" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions" />
 <property name="rel">myAssignedOnlineMeeting</property>
 <property name="accessLevel">Invited</property>
 <propertyList name="attendees">
 <item>sip:johndoe@contoso.com</item>
 <item>sip:janedoe@contoso.com</item>
 </propertyList>
 <property name="automaticLeaderAssignment">Disabled</property>
 <property name="conferenceId">12983487</property>
 <property name="description">We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.</property>
 <property name="entryExitAnnouncement">Disabled</property>
 <property name="expirationTime">2015-07-14T20:54:03.0653146-05:00</property>
 <property name="joinUrl">https://meet.contoso.com/bmauldin/IB88RLLY</property>
 <propertyList name="leaders">
 <item>sip:aikc@contoso.com</item>
 <item>sip:lenea@contoso.com</item>
 </propertyList>
 <property name="lobbyBypassForPhoneUsers">Disabled</property>
 <property name="onlineMeetingId">IB88RLLY</property>
 <property name="onlineMeetingRel">myOnlineMeetings</property>
 <property name="onlineMeetingUri">sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY</property>
 <property name="organizerUri">sip:bmauldin@contoso.com</property>
 <property name="phoneUserAdmission">Disabled</property>
 <property name="subject">Quarterly sales numbers</property>
 <resource rel="onlineMeetingExtension" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension">
 <property name="rel">onlineMeetingExtension</property>
 <property name="id">917823</property>
 <property name="type">RoamedParticipantData</property>
 </resource>
</resource>
									
```


### DELETE

Removes a scheduled meeting from the user's calendar.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).


#### Examples




#### JSON Request


```

 Delete https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/318 HTTP/1.1
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

 Delete https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/318 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 204 No Content
 
									
```


### PUT

Updates a scheduled meeting on the user's calendar.


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [myOnlineMeeting](myOnlineMeeting_ref.md)|Represents a scheduled meeting on the user's calendar.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

 Put https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/318 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Content-Type: application/json
 Accept: application/json
 Content-Length: 519
 {
 "accessLevel" : "SameEnterprise",
 "attendees" : [
 "sip:johndoe@contoso.com",
 "sip:janedoe@contoso.com"
 ],
 "automaticLeaderAssignment" : "Disabled",
 "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
 "entryExitAnnouncement" : "Disabled",
 "expirationTime" : "\/Date(1436925243103)\/",
 "leaders" : [
 "sip:aikc@contoso.com",
 "sip:lenea@contoso.com"
 ],
 "lobbyBypassForPhoneUsers" : "Disabled",
 "phoneUserAdmission" : "Disabled",
 "subject" : "Quarterly sales numbers"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Etag: a7e266c6-79ea-43da-8d87-43f9f6473815
 Content-Type: application/json
 Content-Length: 1272
 {
 "rel" : "myOnlineMeeting",
 "accessLevel" : "Locked",
 "attendees" : [
 "sip:johndoe@contoso.com",
 "sip:janedoe@contoso.com"
 ],
 "automaticLeaderAssignment" : "Disabled",
 "conferenceId" : "12983487",
 "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
 "entryExitAnnouncement" : "Unsupported",
 "expirationTime" : "\/Date(1436925243105)\/",
 "joinUrl" : "https://meet.contoso.com/bmauldin/IB88RLLY",
 "leaders" : [
 "sip:aikc@contoso.com",
 "sip:lenea@contoso.com"
 ],
 "lobbyBypassForPhoneUsers" : "Disabled",
 "onlineMeetingId" : "IB88RLLY",
 "onlineMeetingRel" : "myOnlineMeetings",
 "onlineMeetingUri" : "sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY",
 "organizerUri" : "sip:bmauldin@contoso.com",
 "phoneUserAdmission" : "Disabled",
 "subject" : "Quarterly sales numbers",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810"
 },
 "onlineMeetingExtensions" : {
 "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions"
 }
 },
 "_embedded" : {
 "onlineMeetingExtension" : [
 {
 "rel" : "onlineMeetingExtension",
 "id" : "917823",
 "type" : "RoamedParticipantData",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"
 }
 }
 }
 ]
 }
}
									
```


#### XML Request


```

 Put https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/318 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Content-Type: application/xml
 Accept: application/xml
 Content-Length: 913
 <?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="accessLevel">Locked</property>
 <propertyList name="attendees">
 <item>sip:johndoe@contoso.com</item>
 <item>sip:janedoe@contoso.com</item>
 </propertyList>
 <property name="automaticLeaderAssignment">Disabled</property>
 <property name="description">We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.</property>
 <property name="entryExitAnnouncement">Unsupported</property>
 <property name="expirationTime">2015-07-14T20:54:03.1093192-05:00</property>
 <propertyList name="leaders">
 <item>sip:aikc@contoso.com</item>
 <item>sip:lenea@contoso.com</item>
 </propertyList>
 <property name="lobbyBypassForPhoneUsers">Disabled</property>
 <property name="phoneUserAdmission">Disabled</property>
 <property name="subject">Quarterly sales numbers</property>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Etag: e18bab97-c291-4b9c-a4a3-eb136ea0522f
 Content-Type: application/xml
 Content-Length: 1908
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="myOnlineMeeting" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="onlineMeetingExtensions" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions" />
 <property name="rel">myOnlineMeeting</property>
 <property name="accessLevel">SameEnterprise</property>
 <propertyList name="attendees">
 <item>sip:johndoe@contoso.com</item>
 <item>sip:janedoe@contoso.com</item>
 </propertyList>
 <property name="automaticLeaderAssignment">Disabled</property>
 <property name="conferenceId">12983487</property>
 <property name="description">We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.</property>
 <property name="entryExitAnnouncement">Unsupported</property>
 <property name="expirationTime">2015-07-14T20:54:03.1103197-05:00</property>
 <property name="joinUrl">https://meet.contoso.com/bmauldin/IB88RLLY</property>
 <propertyList name="leaders">
 <item>sip:aikc@contoso.com</item>
 <item>sip:lenea@contoso.com</item>
 </propertyList>
 <property name="lobbyBypassForPhoneUsers">Disabled</property>
 <property name="onlineMeetingId">IB88RLLY</property>
 <property name="onlineMeetingRel">myOnlineMeetings</property>
 <property name="onlineMeetingUri">sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY</property>
 <property name="organizerUri">sip:bmauldin@contoso.com</property>
 <property name="phoneUserAdmission">Disabled</property>
 <property name="subject">Quarterly sales numbers</property>
 <resource rel="onlineMeetingExtension" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension">
 <property name="rel">onlineMeetingExtension</property>
 <property name="id">917823</property>
 <property name="type">RoamedParticipantData</property>
 </resource>
</resource>
									
```

