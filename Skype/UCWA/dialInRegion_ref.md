
# dialInRegion 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents access information for phone users who wish to join an [onlineMeeting](onlineMeeting_ref.md). 

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
|languages|A collection of languages that are associated with the number.|
|name|The name of the region that is associated with the number.|
|number|The phone number associated with this dialInRegion.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the access information for phone users who wish to join an [onlineMeeting](onlineMeeting_ref.md).


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
Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/phoneDialInInformation/505 HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 190
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
									
```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/phoneDialInInformation/505 HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml

```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 420
<?xml version="1.0" encoding="utf-8"?>
<resource rel="dialInRegion" href="//v1/applications/833/onlineMeetings/phoneDialInInformation/505" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="rel">dialInRegion</property>
<propertyList name="languages">
<item>en-US</item>
<item>fr-FR</item>
</propertyList>
<property name="name">Redmond</property>
<property name="number">tel:+14255550001</property>
</resource>
									
```

