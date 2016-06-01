
# onlineMeetingEligibleValues (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the eligible values that the application can choose from when scheduling a [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>




### Properties





|**Name**|**Description**|
|:-----|:-----|
|accessLevels|The allowed values for access level, such as SameEnterprise or Everyone.In a Locked online meeting, only the organizer and pre-set leaders are allowed to join the online meeting.All other participants who attempt to join the online meeting are placed in the lobby.Leaders can use this capability to prepare their online meeting while their attendees wait in the lobby.Note that scheduling locked online meetings is supported by Microsoft Lync Server 2010 or later.An administrator can also prevent specific users from using the AccessLevel.Everyone access level when thoseusers schedule online meetings.|
|automaticLeaderAssignments|The allowed values for automatic leader assignment, such as Disabled or SameEnterprise.Automatic promotion specifies which users are automatically promoted to the leaderrole as they join the online meeting.|
|eligibleOnlineMeetingRels|The allowed values for the scheduling template that is used to create meetings.|
|entryExitAnnouncements|The allowed values for entry/exit announcements.|
|lobbyBypassForPhoneUsersSettings|The allowed values for lobby bypass, indicating whether phone users must wait in the lobbyor are automatically admitted.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|myAssignedOnlineMeeting|Represents a user's [onlineMeeting (UCWA)](onlineMeeting_ref.md) that is commonly used for scheduled meetings with other[contact (UCWA)](contact_ref.md)s.|
|myOnlineMeetings|Represents the set of [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md)s currently on the user's calendar.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representatation of the eligible values that the application can choose from when scheduling a [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md).


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingEligibleValues HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 516
										{
  "rel" : "onlineMeetingEligibleValues",
  "accessLevels" : [
    "Locked"
  ],
  "automaticLeaderAssignments" : [
    "Disabled"
  ],
  "eligibleOnlineMeetingRels" : [
    "myOnlineMeetings"
  ],
  "entryExitAnnouncements" : [
    "Unsupported"
  ],
  "lobbyBypassForPhoneUsersSettings" : [
    "Disabled"
  ],
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings/onlineMeetingEligibleValues"
    },
    "myAssignedOnlineMeeting" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/318"
    },
    "myOnlineMeetings" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingEligibleValues HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 890
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;onlineMeetingEligibleValues&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/onlineMeetingEligibleValues&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;myAssignedOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/318&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;myOnlineMeetings&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetingEligibleValues&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;accessLevels&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Invited&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;propertyList name=&amp;quot;automaticLeaderAssignments&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Disabled&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;propertyList name=&amp;quot;eligibleOnlineMeetingRels&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;myOnlineMeetings&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;propertyList name=&amp;quot;entryExitAnnouncements&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Unsupported&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;propertyList name=&amp;quot;lobbyBypassForPhoneUsersSettings&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Disabled&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

