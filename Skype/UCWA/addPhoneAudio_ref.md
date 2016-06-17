
# addPhoneAudio 


 _**Applies to:** Skype for Business 2015_

Adds phone audio to an existing conversation. 

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

None


## Operations
<a name="sectionSection2"> </a>




### POST

Adds audio to a [conversation](conversation_ref.md) through call-via-work and starts a [phoneAudioInvitation](phoneAudioInvitation_ref.md).


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [phoneAudioInvitation](phoneAudioInvitation_ref.md)|Represents an invitation to a [conversation](conversation_ref.md) for the [phoneAudio](phoneAudio_ref.md) modality.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|BadRequest|400|NormalizationFailed|The phone normalization failed.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```
Post https://fe1.contoso.com:443//v1/applications/833/communication/phoneAudio/addPhoneAudio HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Content-Type: application/json
Content-Length: 111
{
"operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
"phoneNumber" : "tel:+14255551234",
"to" : "sip:john@contoso.com"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 201 Created
Location: //v1/applications/833/communication/invitations/596
									
```


#### XML Request


```
Post https://fe1.contoso.com:443//v1/applications/833/communication/phoneAudio/addPhoneAudio HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Content-Type: application/xml
Content-Length: 286
<?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="operationId">74cb7404e0a247d5a2d4eb0376a47dbf</property>
<property name="phoneNumber">tel:+14255551234</property>
<property name="to">sip:john@contoso.com</property>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 201 Created
Location: //v1/applications/833/communication/invitations/596
									
```

