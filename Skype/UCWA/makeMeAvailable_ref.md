
# makeMeAvailable 


 _**Applies to:** Skype for Business 2015_

Makes the user available for incoming communications. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource lets the user share her availability and allows her to receive incoming invitations for the modalities of her choice. Please note that a user can initiate communications, such as joining an [onlineMeeting](onlineMeeting_ref.md) or starting a phone call, without invoking this capability.


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Makes the user available for incoming communications.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Conflict|409|AlreadyExists|Multiple invocations of this operation is not valid.|
|Forbidden|403|None|The application is attempting to use modalities other than Messaging and Phone Audio.|
|Forbidden|403|AnonymousNotAllowed|The application is attempting make an anonymous user available.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```
Post https://fe1.contoso.com:443//v1/applications/833/communication/makeMeAvailable HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Content-Type: application/json
Content-Length: 145
{
"phoneNumber" : "4255552222",
"signInAs" : "BeRightBack",
"supportedMessageFormats" : [
"Plain",
"Html"
],
"supportedModalities" : [
"PhoneAudio",
"Messaging"
]
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 204 No Content
									
```


#### XML Request


```
Post https://fe1.contoso.com:443//v1/applications/833/communication/makeMeAvailable HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Content-Type: application/xml
Content-Length: 394
<?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="phoneNumber">4255552222</property>
<property name="signInAs">Away</property>
<propertyList name="supportedMessageFormats">
<item>Plain</item>
<item>Html</item>
</propertyList>
<propertyList name="supportedModalities">
<item>PhoneAudio</item>
<item>Messaging</item>
</propertyList>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 204 No Content

```

