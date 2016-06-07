
# unansweredCallSettings 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents a user's settings to send unanswered calls to a specified target. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The user's incoming calls can be sent to a contact, number, delegates, or team members, if the user does not respond. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|ringDelay|The total time to wait for the the user or any target (delegates/team/custom) to answerbefore an incoming call is finally transferred to the target number.This value can range from 5 seconds to 60 seconds.|
|target|The currently active target for unanswered calls.This can be a custom number or "Voicemail". The default value is "Voicemail".|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|resetUnansweredCallSettings|Resets unanswered call settings to the default values.|
|unansweredCallToContact|Forward all incoming calls to a user-provided number or contact if the user does not respond.|
|unansweredCallToVoicemail|Forward all incoming calls to the user's voicemail if she does not respond.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a user's settings to send unanswered calls to a specified target.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Forbidden exception that occurs when the logged-on user is not enabled for enterprise voice or tries to set unanswered calls for whichthe current setting is ImmediateForward (see CallForwardingState).|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/unansweredCallSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: a9fad04e-7bc2-4b0e-863e-17faa5193928
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 7c6a8faf-fda2-4a1c-a29c-3a759168c7fb
										Content-Type: application/json
										Content-Length: 624
										{
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
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/unansweredCallSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 6774bba0-15c8-4315-814f-2b3d53bd79a2
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 72bab224-6419-4774-8a5f-c3795bec8c1f
										Content-Type: application/xml
										Content-Length: 846
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="unansweredCallSettings" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="resetUnansweredCallSettings" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/resetUnansweredCallSettings" />
 <link rel="unansweredCallToContact" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/unansweredCallToContact" />
 <link rel="unansweredCallToVoicemail" href="//v1/applications/833/me/callForwardingSettings/unansweredCallSettings/unansweredCallToVoicemail" />
 <property name="rel">unansweredCallSettings</property>
 <property name="ringDelay">5</property>
 <property name="target">None</property>
</resource>
									
```


### PUT

Modifies a user's settings to send unanswered calls to a specified target.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Forbidden exception that occurs when the logged-on user is not enabled for enterprise voice or tries to set unanswered calls for whichthe current setting is ImmediateForward (see CallForwardingState).|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/unansweredCallSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										if-match: bbabb06e-0558-4a5a-b98f-ed51375b785d
										Content-Length: 62
										{
 "rel" : "unansweredCallSettings",
 "ringDelay" : 5,
 "target" : "None"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```


#### XML Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/unansweredCallSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										if-match: 4398cb14-6a03-4a8f-baa1-4c02549f32af
										Content-Length: 245
										<?xml version="1.0" encoding="utf-8"?>
<resource xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">unansweredCallSettings</property>
 <property name="ringDelay">5</property>
 <property name="target">None</property>
</resource>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```

