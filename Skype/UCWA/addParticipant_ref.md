
# addParticipant 


 _**Applies to:** Skype for Business 2015_

Invites a [contact](contact_ref.md) to participate in a multiparty [conversation](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

When a conversation is in peer-to-peer mode, addParticipant will first escalate the conversation from two-party to conferencing, and will then invite the contact to the conversation. When a conversation is multiparty, addParticipant merely invites the contact to the conversation. 


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Starts a [participantInvitation](participantInvitation_ref.md) in the event channel.


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [participantInvitation](participantInvitation_ref.md)|Represents an invitation to an existing [conversation](conversation_ref.md) for an additional participant.|

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
Post https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/addParticipant HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Content-Type: application/json
Content-Length: 78
{
"operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
"to" : "sip:john@contoso.com"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 201 Created
Location: //v1/applications/833/communication/invitations/646
									
```


#### XML Request


```
Post https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/addParticipant HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Content-Type: application/xml
Content-Length: 230
<?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="operationId">74cb7404e0a247d5a2d4eb0376a47dbf</property>
<property name="to">sip:john@contoso.com</property>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 201 Created
Location: //v1/applications/833/communication/invitations/646
									
```

