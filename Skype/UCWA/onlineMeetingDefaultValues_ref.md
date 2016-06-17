
# onlineMeetingDefaultValues 


 _**Applies to:** Skype for Business 2015_

 
Represents the values of [myOnlineMeeting](myOnlineMeeting_ref.md) properties if not specified at scheduling time.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

These default values may be configured by Administrator. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|accessLevel|The recommended setting for access level, such as SameEnterprise or Everyone.An administrator can specify the default access level to be used by schedulingapplications. Applications can still schedule online meetings using other access level values,as long as as the other values are among the eligible values.|
|automaticLeaderAssignment|The recommended setting for automatic leader assignment.An administrator can specify the default leader assignment value to be used by schedulingapplications. Applications can still schedule online meetings using other automatic leaderassignment values, as long as the other values are among the eligible values.|
|defaultOnlineMeetingRel|The recommended setting for the scheduling template that is used to create online meetings.|
|entryExitAnnouncement|The recommended setting for entry/exit announcements.An administrator can specify the recommended setting for entry/exit announcements to be used by schedulingapplications. Applications can still schedule online meetings using a different setting, as long as theother values are among the eligible values.|
|lobbyBypassForPhoneUsers|The recommended setting for lobby bypass, indicating whether phone users must wait in the lobby or be automatically admitted, bypassing the lobby.|
|participantsWarningThreshold|The maximum number of participants that the meeting organizer can invite without triggering a warning.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the values of [myOnlineMeeting](myOnlineMeeting_ref.md) properties if not specified at scheduling time.


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

 Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingDefaultValues HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/json
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/json
 Content-Length: 343
 {
 "rel" : "onlineMeetingDefaultValues",
 "accessLevel" : "None",
 "automaticLeaderAssignment" : "Disabled",
 "defaultOnlineMeetingRel" : "myOnlineMeetings",
 "entryExitAnnouncement" : "Unsupported",
 "lobbyBypassForPhoneUsers" : "Enabled",
 "participantsWarningThreshold" : 45,
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/onlineMeetings/onlineMeetingDefaultValues"
 }
 }
}
									
```


#### XML Request


```

 Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingDefaultValues HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/xml
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 631
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="onlineMeetingDefaultValues" href="//v1/applications/833/onlineMeetings/onlineMeetingDefaultValues" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">onlineMeetingDefaultValues</property>
 <property name="accessLevel">Locked</property>
 <property name="automaticLeaderAssignment">Disabled</property>
 <property name="defaultOnlineMeetingRel">myOnlineMeetings</property>
 <property name="entryExitAnnouncement">Unsupported</property>
 <property name="lobbyBypassForPhoneUsers">Enabled</property>
 <property name="participantsWarningThreshold">80</property>
</resource>
									
```

