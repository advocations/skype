
# myOnlineMeeting (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents a scheduled meeting on the user's calendar. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

These meetings can be created and managed via the API. The resource captures information about the meeting, including the join URL, the attendees list, and the description. 


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
|onlineMeetingExtensions|Represents the set of [onlineMeetingExtension (UCWA)](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting (UCWA)](onlineMeeting_ref.md).|
|onlineMeetingExtensions|Represents the set of [onlineMeetingExtension (UCWA)](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting (UCWA)](onlineMeeting_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a scheduled meeting on the user's calendar.


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: 244f40c5-2a61-42f0-86db-bdf454e47e6a
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: d831c13d-9649-4b30-8a29-979c6a86a447
										Content-Type: application/json
										Content-Length: 1276
										{
  "rel" : "myOnlineMeeting",
  "accessLevel" : "Invited",
  "attendees" : [
    "sip:johndoe@contoso.com",
    "sip:janedoe@contoso.com"
  ],
  "automaticLeaderAssignment" : "SameEnterprise",
  "conferenceId" : "12983487",
  "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
  "entryExitAnnouncement" : "Disabled",
  "expirationTime" : "\/Date(1436925248513)\/",
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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 60a2f129-93fa-4343-b8f8-6ec4c66e7648
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: c3a5d9a0-ad50-4481-b5cb-64a6073a7cbe
										Content-Type: application/xml
										Content-Length: 1897
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;myOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingExtensions&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myOnlineMeeting&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;Locked&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;conferenceId&amp;quot;&amp;gt;12983487&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:08.5148072-05:00&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;joinUrl&amp;quot;&amp;gt;https://meet.contoso.com/bmauldin/IB88RLLY&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;leaders&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:aikc@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:lenea@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;lobbyBypassForPhoneUsers&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;onlineMeetingId&amp;quot;&amp;gt;IB88RLLY&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;onlineMeetingRel&amp;quot;&amp;gt;myOnlineMeetings&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;onlineMeetingUri&amp;quot;&amp;gt;sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;organizerUri&amp;quot;&amp;gt;sip:bmauldin@contoso.com&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;phoneUserAdmission&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;subject&amp;quot;&amp;gt;Quarterly sales numbers&amp;lt;/property&amp;gt;
  &amp;lt;resource rel=&amp;quot;onlineMeetingExtension&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension&amp;quot;&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetingExtension&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;917823&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt;RoamedParticipantData&amp;lt;/property&amp;gt;
  &amp;lt;/resource&amp;gt;
&amp;lt;/resource&amp;gt;
									
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

										Delete https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810 HTTP/1.1
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

										Delete https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810 HTTP/1.1
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
|[myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md)|Represents a scheduled meeting on the user's calendar.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810 HTTP/1.1
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
  "expirationTime" : "\/Date(1436925248543)\/",
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
										Etag: 27be40fa-f026-4ac0-a90f-f14c1e8e1456
										Content-Type: application/json
										Content-Length: 1277
										{
  "rel" : "myOnlineMeeting",
  "accessLevel" : "SameEnterprise",
  "attendees" : [
    "sip:johndoe@contoso.com",
    "sip:janedoe@contoso.com"
  ],
  "automaticLeaderAssignment" : "Disabled",
  "conferenceId" : "12983487",
  "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
  "entryExitAnnouncement" : "Disabled",
  "expirationTime" : "\/Date(1436925248543)\/",
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

										Put https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Accept: application/xml
										Content-Length: 911
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;input xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Unsupported&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:08.5458113-05:00&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;leaders&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:aikc@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:lenea@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;lobbyBypassForPhoneUsers&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;phoneUserAdmission&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;subject&amp;quot;&amp;gt;Quarterly sales numbers&amp;lt;/property&amp;gt;
&amp;lt;/input&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: e4147866-edbc-4a73-ad24-8b54cab1b8b8
										Content-Type: application/xml
										Content-Length: 1907
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;myOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingExtensions&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myOnlineMeeting&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;Invited&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;SameEnterprise&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;conferenceId&amp;quot;&amp;gt;12983487&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Unsupported&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:08.5468110-05:00&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;joinUrl&amp;quot;&amp;gt;https://meet.contoso.com/bmauldin/IB88RLLY&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;leaders&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:aikc@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:lenea@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;lobbyBypassForPhoneUsers&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;onlineMeetingId&amp;quot;&amp;gt;IB88RLLY&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;onlineMeetingRel&amp;quot;&amp;gt;myOnlineMeetings&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;onlineMeetingUri&amp;quot;&amp;gt;sip:bmauldin@contoso.com;gruu;opaque=app:conf:focus:id:IB88RLLY&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;organizerUri&amp;quot;&amp;gt;sip:bmauldin@contoso.com&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;phoneUserAdmission&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;subject&amp;quot;&amp;gt;Quarterly sales numbers&amp;lt;/property&amp;gt;
  &amp;lt;resource rel=&amp;quot;onlineMeetingExtension&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension&amp;quot;&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetingExtension&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;917823&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt;RoamedParticipantData&amp;lt;/property&amp;gt;
  &amp;lt;/resource&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

