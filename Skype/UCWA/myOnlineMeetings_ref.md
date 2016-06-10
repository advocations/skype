
# myOnlineMeetings (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the set of [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md)s currently on the user's calendar. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource can be used to create new [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md)s as well as to modify and delete existing ones. 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|myAssignedOnlineMeeting|Represents a user's [onlineMeeting (UCWA)](onlineMeeting_ref.md) that is commonly used for scheduled meetings with other[contact (UCWA)](contact_ref.md)s.|
|myOnlineMeeting|Represents a scheduled meeting on the user's calendar.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the set of [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md)s currently on the user's calendar.


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 2730
										{
  "rel" : "myOnlineMeetings",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings"
    }
  },
  "_embedded" : {
    "myAssignedOnlineMeeting" : [
      {
        "rel" : "myAssignedOnlineMeeting",
        "accessLevel" : "None",
        "attendees" : [
          "sip:johndoe@contoso.com",
          "sip:janedoe@contoso.com"
        ],
        "automaticLeaderAssignment" : "SameEnterprise",
        "conferenceId" : "12983487",
        "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
        "entryExitAnnouncement" : "Unsupported",
        "expirationTime" : "\/Date(1436925247778)\/",
        "joinUrl" : "https://meet.contoso.com/bmauldin/IB88RLLY",
        "leaders" : [
          "sip:aikc@contoso.com",
          "sip:lenea@contoso.com"
        ],
        "lobbyBypassForPhoneUsers" : "Disabled",
        "onlineMeetingId":"IB88RLLY","onlineMeetingRel":"myOnlineMeetings","onlineMeetingUri":"sip : bmauldin@contoso.com;gruu;opaque=app : conf : focus : id : IB88RLLY","organizerUri":"sip : bmauldin@contoso.com","phoneUserAdmission":"Disabled","subject":"Quarterlysalesnumbers","_links":{"self":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/318"},"onlineMeetingExtensions":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions"}},"_embedded":{"onlineMeetingExtension":[{"rel":"onlineMeetingExtension","id":"917823","type":"RoamedParticipantData","_links":{"self":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"}}}]}}],"myOnlineMeeting":[{"rel":"myOnlineMeeting","accessLevel":"Invited","attendees":["sip : johndoe@contoso.com","sip : janedoe@contoso.com"],"automaticLeaderAssignment":"Disabled","conferenceId":"12983487","description":"We\u0027llbemeetingtoreviewthesalesnumbersforthispastquarteranddiscussprojectionsforthenexttwoquarters.","entryExitAnnouncement":"Unsupported","expirationTime":"\/Date(1436925247785)\/","joinUrl":"https : //meet.contoso.com/bmauldin/IB88RLLY","leaders":["sip : aikc@contoso.com","sip : lenea@contoso.com"],"lobbyBypassForPhoneUsers":"Disabled","onlineMeetingId":"IB88RLLY","onlineMeetingRel":"myOnlineMeetings","onlineMeetingUri":"sip : bmauldin@contoso.com;gruu;opaque=app : conf : focus : id : IB88RLLY","organizerUri":"sip : bmauldin@contoso.com","phoneUserAdmission":"Disabled","subject":"Quarterlysalesnumbers","_links":{"self":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/810"},"onlineMeetingExtensions":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions"}},"_embedded":{"onlineMeetingExtension":[{"rel":"onlineMeetingExtension","id":"917823","type":"RoamedParticipantData","_links":{"self":{"href":"//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"}}}]}}]}}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 3895
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;myOnlineMeetings&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myOnlineMeetings&amp;lt;/property&amp;gt;
  &amp;lt;resource rel=&amp;quot;myAssignedOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/318&amp;quot;&amp;gt;
    &amp;lt;link rel=&amp;quot;onlineMeetingExtensions&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions&amp;quot; /&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myAssignedOnlineMeeting&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;Invited&amp;lt;/property&amp;gt;
    &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
      &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
      &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;/propertyList&amp;gt;
    &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;SameEnterprise&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;conferenceId&amp;quot;&amp;gt;12983487&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:07.7917456-05:00&amp;lt;/property&amp;gt;
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
  &amp;lt;resource rel=&amp;quot;myOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810&amp;quot;&amp;gt;
    &amp;lt;link rel=&amp;quot;onlineMeetingExtensions&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions&amp;quot; /&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myOnlineMeeting&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;SameEnterprise&amp;lt;/property&amp;gt;
    &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
      &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
      &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;/propertyList&amp;gt;
    &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;SameEnterprise&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;conferenceId&amp;quot;&amp;gt;12983487&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Unsupported&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:07.7927457-05:00&amp;lt;/property&amp;gt;
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
&amp;lt;/resource&amp;gt;
									
```


### POST

Creates a new [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md).


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
|Conflict|409|TooManyOnlineMeetings|Returned when this user has too many online meetings.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										Accept: application/json
										Content-Length: 511
										{
  "accessLevel" : "Locked",
  "attendees" : [
    "sip:johndoe@contoso.com",
    "sip:janedoe@contoso.com"
  ],
  "automaticLeaderAssignment" : "Disabled",
  "description" : "We\u0027ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.",
  "entryExitAnnouncement" : "Disabled",
  "expirationTime" : "\/Date(1436925247806)\/",
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

										HTTP/1.1 201 Created
										Etag: ad207a38-2c52-4443-9b01-8228f44c1eb7
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
  "expirationTime" : "\/Date(1436925247807)\/",
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

										Post https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Accept: application/xml
										Content-Length: 914
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;input xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;Invited&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Unsupported&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:07.8087468-05:00&amp;lt;/property&amp;gt;
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

										HTTP/1.1 201 Created
										Etag: edcfd822-4ebf-45e1-b2fa-a9e7a36e8ee4
										Content-Type: application/xml
										Content-Length: 1901
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;myOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingExtensions&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myOnlineMeeting&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;accessLevel&amp;quot;&amp;gt;Invited&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;attendees&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;sip:johndoe@contoso.com&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;sip:janedoe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;automaticLeaderAssignment&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;conferenceId&amp;quot;&amp;gt;12983487&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;description&amp;quot;&amp;gt;We&amp;#39;ll be meeting to review the sales numbers for this past quarter and discuss projections for the next two quarters.&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;entryExitAnnouncement&amp;quot;&amp;gt;Unsupported&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;expirationTime&amp;quot;&amp;gt;2015-07-14T20:54:07.8087468-05:00&amp;lt;/property&amp;gt;
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

