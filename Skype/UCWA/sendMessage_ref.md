
# sendMessage 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Sends an instant message to the [participant](participant_ref.md)s in a [conversation](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

 Applications can use sendMessage to compose an outgoing instant message. This link is available only when the [messaging](messaging_ref.md) modality is connected.


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Passes an HTML body to the server, and starts a [message](message_ref.md) operation in the event channel.


#### Query parameters





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|operationId|An application-supplied identifier to track the message resource created by the server.|Yes|

#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [message](message_ref.md)|Represents an instant message sent or received by the local participant.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples

Only server-supplied query parameters, if any, are shown in the request sample.


#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/messaging/sendMessage HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: text/html
										Content-Length: 12
										<h>Hello</h>
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Location: //v1/applications/833/communication/conversations/802/messaging/messages/812
										
									
```


#### XML Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/messaging/sendMessage HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: text/html
										Content-Length: 12
										<h>Hello</h>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Location: //v1/applications/833/communication/conversations/802/messaging/messages/812
										
									
```

