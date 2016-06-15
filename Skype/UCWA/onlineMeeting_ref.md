
# onlineMeeting 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_


Represents a read-only version of the [onlineMeeting](onlineMeeting_ref.md) associated with this [conversation](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The resource captures information about the meeting, including the join URL, the attendees list, and the description. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|accessLevel|The access level that controls admission to the online meeting.|
|attendees|The list of online meeting attendees.|
|automaticLeaderAssignment|The policy that determines which participants are automatically promoted to leaders.An online meeting organizer can schedule a meeting so that users are automatically promoted to theleader role when they join the meeting. For example, if the meeting is scheduled withautomatic promotion policy set to AutomaticLeaderAssignment.SameEnterprise, then any participants from the organizer's company are automaticallypromoted to leaders when they join the meeting. Conference leaders can still promote specific users to the leader role,including anonymous users.|
|conferenceId|The conference ID for the online meeting.Attendees who dial into the online meeting by using a PSTN phone use the conference ID.|
|description|The long description of the online meeting's purpose.|
|disclaimerBody|The online meeting's disclaimer text.|
|disclaimerTitle|The online meeting's disclaimer title.|
|entryExitAnnouncement|The attendance announcements status for the online meeting.When attendance announcements are enabled, the online meeting will announce the names of the participantswho join the meeting through audio.|
|expirationTime|The absolute Coordinated Universal Time (UTC) date and time after which the online meeting can be deleted.The day and time must be between one year before, and ten years after, thecurrent date and time on the server.|
|hostingNetwork|The online meeting's hosting network.|
|joinUrl|The URL that is used when the online meeting is joined from the web.|
|largeMeeting|Whether large meeting mode is enabled or disabled for this online meeting.|
|leaders|The list of online meeting leaders.The organizer will automatically be added to the leaders list.|
|lobbyBypassForPhoneUsers|The lobby bypass setting for this online meeting.|
|onlineMeetingId|The online meeting ID that identifies this meeting among the other online meetings that arescheduled by the organizer.The online meeting ID is unique within the organizer's list of scheduled online meetings.|
|onlineMeetingRel|The scheduling template that the organizer uses to schedule this online meeting.|
|onlineMeetingUri|The online meeting URI.The online meeting URI is used by participants to join this online meeting.|
|organizerName|The display name of the contact who scheduled the online meeting.|
|organizerUri|The URI of the online meeting organizer: the person who scheduled the meeting.Organizers can enumerate or change only the conferences that they organize.|
|phoneUserAdmission|Whether participants can join the online meeting over the phone.Setting this property to true means that online meeting participants can join the meetingover the phone through the Conferencing Auto Attendant (CAA) service.|
|subject|The subject of the online meeting.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|organizer|Represents the organizer of the online meeting.|
|phoneDialInInformation|Represents phone access information for an [onlineMeeting](onlineMeeting_ref.md).|
|onlineMeetingExtensions|Represents the set of [onlineMeetingExtension](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting](onlineMeeting_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|onlineMeeting|High|conversation|Indicates that the corresponding onlineMeeting has been added to a conversation.|
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
 "rel" : "onlineMeeting",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting"
 },
 "in" : {
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
|onlineMeeting|High|conversation|Indicates that the corresponding onlineMeeting has been updated in a conversation.|
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
 "rel" : "onlineMeeting",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting"
 },
 "in" : {
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


## Operations
<a name="sectionSection3"> </a>




### GET

Returns a read-only version of the [onlineMeeting](onlineMeeting_ref.md) associated with this [conversation](conversation_ref.md).


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

 Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/json
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/json
 Content-Length: 1654
 {
 "rel" : "onlineMeeting",
 "accessLevel" : "Invited",
 "attendees" : [
 "sip:johndoe@contoso.com",
 "sip:janedoe@contoso.com"
 ],
 "automaticLeaderAssignment" : "SameEnterprise",
 "conferenceId" : "12983487",
 "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
 "disclaimerBody" : "The matters of this meeting are confidential.",
 "disclaimerTitle" : "Meeting Confidentiality",
 "entryExitAnnouncement" : "Unsupported",
 "expirationTime" : "\/Date(1436925244129)\/",
 "hostingNetwork" : "https://meet.contoso.com",
 "joinUrl":"https : //meet.contoso.com/bmauldin/IB88RLLY","largeMeeting":"Unknown","leaders": ["sip : aikc@contoso.com","sip : lenea@contoso.com"],"lobbyBypassForPhoneUsers":"Disabled","onlineMeetingId":"IB88RLLY","onlineMeetingRel":"myOnlineMeetings","onlineMeetingUri":"sip : bmauldin@contoso.com;gruu;opaque=app : conf : focus : id : IB88RLLY","organizerName":"BillMauldin","organizerUri":"sip : bmauldin@contoso.com","phoneUserAdmission":"Disabled","subject":"Quarterlysalesnumbers","_links":{"self":{"href":"//v1/applications/833/communication/conversations/802/onlineMeeting"},"conversation":{"href":"//v1/applications/833/communication/conversations/802"},"organizer":{"href":"//v1/applications/833/communication/conversations/802/onlineMeeting/organizer"},"phoneDialInInformation":{"href":"//v1/applications/833/onlineMeetings/phoneDialInInformation"}},"_embedded":{"onlineMeetingExtension": [{"rel":"onlineMeetingExtension","id":"917823","type":"RoamedParticipantData","_links":{"self":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"}}}]}}
									
```


#### XML Request


```

 Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/xml
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 2408
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="onlineMeeting" href="//v1/applications/833/communication/conversations/802/onlineMeeting" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="conversation" href="//v1/applications/833/communication/conversations/802" />
 <link rel="organizer" href="//v1/applications/833/communication/conversations/802/onlineMeeting/organizer" />
 <link rel="phoneDialInInformation" href="//v1/applications/833/onlineMeetings/phoneDialInInformation" />
 <property name="rel">onlineMeeting</property>
 <property name="accessLevel">Locked</property>
 <propertyList name="attendees">
 <item>sip:johndoe@contoso.com</item>
 <item>sip:janedoe@contoso.com</item>
 </propertyList>
 <property name="automaticLeaderAssignment">SameEnterprise</property>
 <property name="conferenceId">12983487</property>
 <property name="description">We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.</property>
 <property name="disclaimerBody">The matters of this meeting are confidential.</property>
 <property name="disclaimerTitle">Meeting Confidentiality</property>
 <property name="entryExitAnnouncement">Disabled</property>
 <property name="expirationTime">2015-07-14T20:54:04.1345384-05:00</property>
 <property name="hostingNetwork">https://meet.contoso.com</property>
 <property name="joinUrl">https://meet.contoso.com/bmauldin/IB88RLLY</property>
 <property name="largeMeeting">Disabled</property>
 <propertyList name="leaders">
 <item>sip:aikc@contoso.com</item>
 <item>sip:lenea@contoso.com</item>
 </propertyList>
 <property name="lobbyBypassForPhoneUsers">Disabled</property>
 <property name="onlineMeetingId">IB88RLLY</property>
 <property name="onlineMeetingRel">myOnlineMeetings</property>
 <property name="onlineMeetingUri">sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY</property>
 <property name="organizerName">Bill Mauldin</property>
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

