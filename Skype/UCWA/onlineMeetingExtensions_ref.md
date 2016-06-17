
# onlineMeetingExtensions 


 _**Applies to:** Skype for Business 2015_


Represents the set of [onlineMeetingExtension](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting](onlineMeeting_ref.md). 

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

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|onlineMeetingExtension|Represents custom data for the associated [onlineMeeting](onlineMeeting_ref.md) that can be used by an application.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the set of [onlineMeetingExtension](onlineMeetingExtension_ref.md)s for the associated [onlineMeeting](onlineMeeting_ref.md).


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

 Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/json
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/json
 Content-Length: 397
 {
 "rel" : "onlineMeetingExtensions",
 "_links" : {
 "self" : {
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

 Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/xml
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 594
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="onlineMeetingExtensions" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">onlineMeetingExtensions</property>
 <resource rel="onlineMeetingExtension" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension">
 <property name="rel">onlineMeetingExtension</property>
 <property name="id">917823</property>
 <property name="type">RoamedParticipantData</property>
 </resource>
</resource>
									
```


### POST

Creates a new [onlineMeetingExtension](onlineMeetingExtension_ref.md) for the associated [onlineMeeting](onlineMeeting_ref.md).


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [onlineMeetingExtension](onlineMeetingExtension_ref.md)|Represents custom data for the associated [onlineMeeting](onlineMeeting_ref.md) that can be used by an application.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

 Post https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Content-Type: application/json
 Accept: application/json
 Content-Length: 46
 {
 "id" : "917823",
 "type" : "RoamedParticipantData"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 201 Created
 Etag: dbc0f5e9-44cc-41c7-8680-ea73b48810c6
 Content-Type: application/json
 Content-Length: 211
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
									
```


#### XML Request


```

 Post https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Content-Type: application/xml
 Accept: application/xml
 Content-Length: 198
 <?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="id">917823</property>
 <property name="type">RoamedParticipantData</property>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 201 Created
 Etag: b8b44498-199b-4a8a-8463-150ad7e73f56
 Content-Type: application/xml
 Content-Length: 399
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="onlineMeetingExtension" href="//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">onlineMeetingExtension</property>
 <property name="id">917823</property>
 <property name="type">RoamedParticipantData</property>
</resource>
									
```

