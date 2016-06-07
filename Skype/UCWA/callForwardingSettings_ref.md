
# callForwardingSettings 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Represents settings that govern call forwarding. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource can be used to set up rules on how to route audio calls for call forwarding and simultaneous ring. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|activePeriod|The time period in which these rules are in effect, either during workhours or always.|
|activeSetting|The currently active call forwarding setting.|
|unansweredCallHandling|Indicates whether unanswered calls will be forwarded.This setting is disabled when the active setting is ImmediateForward.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|turnOffCallForwarding|Turns off call forwarding.|
|immediateForwardSettings|Represents the settings for a user to immediately forward incoming calls to a specified target.|
|simultaneousRingSettings|Represents a user's settings to simultaneously send incoming calls to a specified target.|
|unansweredCallSettings|Represents a user's settings to send unanswered calls to a specified target.|

## Operations
<a name="sectionSection2"> </a>




### GET

Operation description coming soon...


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Forbidden exception that occurs when the logged-on user is not enabled for enterprise voice.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: 130a589c-6b0b-46f6-90bf-9c65048a2877
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 8a9e4d1d-b086-4acc-9dcb-4798842e2eaf
										Content-Type: application/json
										Content-Length: 2291
										{
 "rel" : "callForwardingSettings",
 "activePeriod" : "Workhours",
 "activeSetting" : "ImmediateForward",
 "unansweredCallHandling" : "Enabled",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/me/callForwardingSettings"
 },
 "turnOffCallForwarding" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/turnOffCallForwarding"
 }
 },
 "_embedded" : {
 "immediateForwardSettings" : {
 "rel" : "immediateForwardSettings",
 "target" : "None",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "immediateForwardToContact" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToContact"
 },
 "immediateForwardToDelegates" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToDelegates"
 },
 "immediateForwardToVoicemail" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToVoicemail"
 }
 }
 },
 "simultaneousRingSettings" : {
 "rel" : "simultaneousRingSettings",
 "ringDelay" : 5,
 "target" : "None",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "simultaneousRingToContact" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToContact"
 },
 "simultaneousRingToDelegates" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToDelegates"
 },
 "simultaneousRingToTeam" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToTeam"
 }
 }
 },
 "unansweredCallSettings" : {
 "rel" : "unansweredCallSettings",
 "ringDelay" : 5,
 "target" : "None",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/unansweredCallSettings"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "resetUnansweredCallSettings" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/resetUnansweredCallSettings"
 },
 "unansweredCallToContact" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/unansweredCallToContact"
 },
 "unansweredCallToVoicemail" : {
 "href" : "//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/unansweredCallToVoicemail"
 }
 }
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 7a16eab0-bc77-4056-ad5d-79e8207b4404
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: e7494b61-d648-4416-9098-e4b0b90fd3e6
										Content-Type: application/xml
										Content-Length: 2783
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="callForwardingSettings" href="//v1/applications/833/me/callForwardingSettings" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="turnOffCallForwarding" href="//v1/applications/833/me/callForwardingSettings/turnOffCallForwarding" />
 <property name="rel">callForwardingSettings</property>
 <property name="activePeriod">Workhours</property>
 <property name="activeSetting">ImmediateForward</property>
 <property name="unansweredCallHandling">Enabled</property>
 <resource rel="immediateForwardSettings" href="//v1/applications/833/me/callForwardingSettings/immediateForwardSettings">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="immediateForwardToContact" href="//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToContact" />
 <link rel="immediateForwardToDelegates" href="//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToDelegates" />
 <link rel="immediateForwardToVoicemail" href="//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToVoicemail" />
 <property name="rel">immediateForwardSettings</property>
 <property name="target">None</property>
 </resource>
 <resource rel="simultaneousRingSettings" href="//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="simultaneousRingToContact" href="//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToContact" />
 <link rel="simultaneousRingToDelegates" href="//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToDelegates" />
 <link rel="simultaneousRingToTeam" href="//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToTeam" />
 <property name="rel">simultaneousRingSettings</property>
 <property name="ringDelay">5</property>
 <property name="target">None</property>
 </resource>
 <resource rel="unansweredCallSettings" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="resetUnansweredCallSettings" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/resetUnansweredCallSettings" />
 <link rel="unansweredCallToContact" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/unansweredCallToContact" />
 <link rel="unansweredCallToVoicemail" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/unansweredCallToVoicemail" />
 <property name="rel">unansweredCallSettings</property>
 <property name="ringDelay">5</property>
 <property name="target">None</property>
 </resource>
</resource>
									
```


### PUT

Operation description coming soon...


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Forbidden exception that occurs when the logged-on user is not enabled for enterprise voice.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										if-match: 02c611fb-a06d-4fac-b398-7af99d1eea4f
										Content-Length: 129
										{
 "rel" : "callForwardingSettings",
 "activePeriod" : "Workhours",
 "activeSetting" : "ImmediateForward",
 "unansweredCallHandling" : "Enabled"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```


#### XML Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										if-match: fa72460c-e0d8-4e61-80ac-fb61f20a075a
										Content-Length: 333
										<?xml version="1.0" encoding="utf-8"?>
<resource xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">callForwardingSettings</property>
 <property name="activePeriod">Workhours</property>
 <property name="activeSetting">ImmediateForward</property>
 <property name="unansweredCallHandling">Enabled</property>
</resource>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```

