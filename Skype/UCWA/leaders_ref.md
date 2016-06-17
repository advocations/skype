
# leaders 


 _**Applies to:** Skype for Business 2015_

Represents a view of the [participant](participant_ref.md)s in the leader role in an [onlineMeeting](onlineMeeting_ref.md). 

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
|participant|Represents a remote participant in a [conversation](conversation_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participant|High|conversation|Indicates that a [participant](participant_ref.md) was added to the list of leader participants.|
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
 "rel" : "conversation",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802",
 "events" : [
 {
 "link" : {
 "rel" : "participant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
 },
 "in" : {
 "rel" : "leaders",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/leaders"
 },
 "type" : "added"
 }
 ]
 }
 ]
}
					
```


### deleted





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participant|High|conversation|Indicates that a [participant](participant_ref.md) was removed from the list of leader participants.|
Sample of returned event data.




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
 "rel" : "conversation",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802",
 "events" : [
 {
 "link" : {
 "rel" : "participant",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
 },
 "in" : {
 "rel" : "leaders",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/leaders"
 },
 "type" : "deleted"
 }
 ]
 }
 ]
}
					
```


## Operations
<a name="sectionSection3"> </a>




### GET

Returns a representation of a view of the [participant](participant_ref.md)s whose role is leader in an [onlineMeeting](onlineMeeting_ref.md).


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
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/leaders HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json

```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 206
{
"rel" : "leaders",
"_links" : {
"self" : {
"href" : "//v1/applications/833/communication/conversations/802/leaders"
},
"participant" : [
{
"href" : "//v1/applications/833/communication/conversations/802/participants/191"
}
]
}
}
									
```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/leaders HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 339
<?xml version="1.0" encoding="utf-8"?>
<resource rel="leaders" href="//v1/applications/833/communication/conversations/802/leaders" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<link rel="participant" href="//v1/applications/833/communication/conversations/802/participants/278" />
<property name="rel">leaders</property>
</resource>

```

