
# onlineMeetingInvitationCustomization 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Represents the recommended custom values to use when an [onlineMeetingInvitation](onlineMeetingInvitation_ref.md) is sent.

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
|enterpriseHelpUrl|The URL in the scheduled [onlineMeeting](onlineMeeting_ref.md) RSVP for the default help page.The help page is intended for first-time users.|
|invitationFooterText|The text to display at the bottom of the scheduled [onlineMeeting](onlineMeeting_ref.md) RSVP.|
|invitationHelpUrl|The URL in the scheduled [onlineMeeting](onlineMeeting_ref.md) RSVP for the default help page.|
|invitationLegalUrl|The URL in the scheduled [onlineMeeting](onlineMeeting_ref.md) RSVP for the default legal information page.|
|invitationLogoUrl|The URL in the scheduled [onlineMeeting](onlineMeeting_ref.md) RSVP for the default logo.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the recommended custom values to use when an [onlineMeetingInvitation](onlineMeetingInvitation_ref.md) is sent.


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingInvitationCustomization HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 484
										{
 "rel" : "onlineMeetingInvitationCustomization",
 "enterpriseHelpUrl" : "http://meet.contoso.com/firstimehelp.html",
 "invitationFooterText" : "The information contained in this meeting invitation is confidential.",
 "invitationHelpUrl" : "http://meet.contoso.com/help",
 "invitationLegalUrl" : "http://meet.contoso.com/disclaimer.html",
 "invitationLogoUrl" : "http://meet.contoso.com/companylogo.png",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/onlineMeetings/onlineMeetingInvitationCustomization"
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/onlineMeetingInvitationCustomization HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 755
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="onlineMeetingInvitationCustomization" href="//v1/applications/833/onlineMeetings/onlineMeetingInvitationCustomization" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">onlineMeetingInvitationCustomization</property>
 <property name="enterpriseHelpUrl">http://meet.contoso.com/firstimehelp.html</property>
 <property name="invitationFooterText">The information contained in this meeting invitation is confidential.</property>
 <property name="invitationHelpUrl">http://meet.contoso.com/help</property>
 <property name="invitationLegalUrl">http://meet.contoso.com/disclaimer.html</property>
 <property name="invitationLogoUrl">http://meet.contoso.com/companylogo.png</property>
</resource>
									
```

