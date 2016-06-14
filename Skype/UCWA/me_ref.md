
# me 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents the user. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The me resource will be updated whenever the application becomes ready for incoming calls and leaves lurker mode ( [makeMeAvailable](makeMeAvailable_ref.md)). Note that me will not be updated if any of its properties, such as emailAddresses or title, change while the application is active. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|department|The user's department.|
|emailAddresses|The user's e-mail addresses.|
|name|The user's display name.|
|title|The user's title.|
|uri|The user's URI.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|callForwardingSettings|Represents settings that govern call forwarding.|
|location|Represents the user's location.|
|makeMeAvailable|Makes the user available for incoming communications.|
|note|Represents the user's personal or out-of-office note.|
|phones|A collection of phone resources that represent the phone numbers of the logged-on user.|
|photo|Represents the user's photo.|
|presence|Represents the user's availability and activity.|
|reportMyActivity|Indicates that the user is actively using this application.|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|me|Medium|me|The application is no longer in lurker mode and is therefore visible to contacts. The application can now set things such as the user's presence and note.|
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
 "rel" : "me",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/me",
 "events" : [
 {
 "link" : {
 "rel" : "me",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/me"
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

Returns a representation of the user.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Conflict|409|None|Returned when an application is in the process of initializing or terminating.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```
Get https://fe1.contoso.com:443//v1/applications/833/me HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json

```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 696
{
"rel" : "me",
"department" : "Sales",
"emailAddresses" : [
"johndoe@contoso.com"
],
"name" : "John Doe",
"title" : "Senior Manager",
"uri" : "sip:johndoe@contoso.com",
"_links" : {
"self" : {
"href" : "//v1/applications/833/me"
},
"callForwardingSettings" : {
"href" : "//v1/applications/833/me/callForwardingSettings"
},
"location" : {
"href" : "//v1/applications/833/me/location"
},
"makeMeAvailable" : {
"href" : "//v1/applications/833/communication/makeMeAvailable"
},
"note" : {
"href" : "//v1/applications/833/me/note"
},
"phones" : {
"href" : "//v1/applications/833/me/phones"
},
"photo" : {
"href" : "//v1/applications/833/photo"
},
"presence" : {
"href" : "//v1/applications/833/me/presence"
},
"reportMyActivity" : {
"href" : "//v1/applications/833/reportMyActivity"
}
}
}
							
```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/me HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml

```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 1016
<?xml version="1.0" encoding="utf-8"?>
<resource rel="me" href="//v1/applications/833/me" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<link rel="callForwardingSettings" href="//v1/applications/833/me/callForwardingSettings" />
<link rel="location" href="//v1/applications/833/me/location" />
<link rel="makeMeAvailable" href="//v1/applications/833/communication/makeMeAvailable" />
<link rel="note" href="//v1/applications/833/me/note" />
<link rel="phones" href="//v1/applications/833/me/phones" />
<link rel="photo" href="//v1/applications/833/photo" />
<link rel="presence" href="//v1/applications/833/me/presence" />
<link rel="reportMyActivity" href="//v1/applications/833/reportMyActivity" />
<property name="rel">me</property>
<property name="department">Sales</property>
<propertyList name="emailAddresses">
<item>johndoe@contoso.com</item>
</propertyList>
<property name="name">John Doe</property>
<property name="title">Senior Manager</property>
<property name="uri">sip:johndoe@contoso.com</property>
</resource>
									
```

