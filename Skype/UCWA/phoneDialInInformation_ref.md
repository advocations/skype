
# phoneDialInInformation 

**Last modified:** July 14, 2015

_**Applies to:** Skype for Business 2015_

Represents phone access information for an [onlineMeeting](onlineMeeting_ref.md). 

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
|conferenceId|The conference ID for use when a participant joins the online meeting by dialing in from a phone line.|
|defaultRegion|The default region to use when the online meeting is joined by dialing in from a phone line.|
|externalDirectoryUri|A URL to the externally-accessible web page that contains dial-in information.|
|internalDirectoryUri|A URL to the internally-accessible web page that contains dial-in information.|
|isAudioConferenceProviderEnabled|Whether the online meeting supports using an audio conference provider (ACP).|
|participantPassCode|The participant password required to connect to the Audio Conference Provider.|
|tollFreeNumbers|The toll-free number to connect to the Audio Conference Provider.|
|tollNumber|The toll number to connect to the Audio Conference Provider.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|dialInRegion|Represents access information for phone users who wish to join an [onlineMeeting](onlineMeeting_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the phone access information for an [onlineMeeting](onlineMeeting_ref.md).


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

Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/phoneDialInInformation HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json


```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 633
{
"rel" : "phoneDialInInformation",
"conferenceId" : "12983487",
"defaultRegion" : "Redmond",
"externalDirectoryUri" : "https://dial.contoso.com",
"internalDirectoryUri" : "https://dial.contoso.com",
"isAudioConferenceProviderEnabled" : false,
"participantPassCode" : "samplevalue",
"tollFreeNumbers" : [
"samplevalue"
],
"tollNumber" : "samplevalue",
"_links" : {
"self" : {
"href" : "//v1/applications/833/onlineMeetings/phoneDialInInformation"
}
},
"_embedded" : {
"dialInRegion" : [
{
"rel" : "dialInRegion",
"languages" : [
"en-US",
"fr-FR"
],
"name" : "Redmond",
"number" : "tel:+14255550001",
"_links" : {
"self" : {
"href" : "//v1/applications/833/onlineMeetings/phoneDialInInformation/505"
}
}
}
]
}
}

```


#### XML Request


```

Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/phoneDialInInformation HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml


```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 1086
<?xml version="1.0" encoding="utf-8"?>
<resource rel="phoneDialInInformation" href="//v1/applications/833/onlineMeetings/phoneDialInInformation" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="rel">phoneDialInInformation</property>
<property name="conferenceId">12983487</property>
<property name="defaultRegion">Redmond</property>
<property name="externalDirectoryUri">https://dial.contoso.com</property>
<property name="internalDirectoryUri">https://dial.contoso.com</property>
<property name="isAudioConferenceProviderEnabled">False</property>
<property name="participantPassCode">samplevalue</property>
<propertyList name="tollFreeNumbers">
<item>samplevalue</item>
</propertyList>
<property name="tollNumber">samplevalue</property>
<resource rel="dialInRegion" href="//v1/applications/833/onlineMeetings/phoneDialInInformation/505">
<property name="rel">dialInRegion</property>
<propertyList name="languages">
<item>en-US</item>
<item>fr-FR</item>
</propertyList>
<property name="name">Redmond</property>
<property name="number">tel:+14255550001</property>
</resource>
</resource>

```

