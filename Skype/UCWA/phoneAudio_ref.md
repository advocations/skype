
# phoneAudio 



_**Applies to:** Skype for Business 2015_

Represents the phone audio modality in a [conversation](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

Phone audio refers to communication that is delivered via a public switched telephone network (PSTN). When present, the resource indicates the status of the phone audio channel and can provide capabilities to start or stop the phone call via a user-supplied phone number, as well as to place the call on hold. phoneAudio will be updated whenever the state and capabilities of the modality change. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|state|The state of the modality, such as Connecting, Connected, or Disconnected.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|addPhoneAudio|Adds phone audio to an existing conversation.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|holdPhoneAudio|Places a phone call on hold.|
|resumePhoneAudio|Resumes a phone call that was placed on hold.|
|stopPhoneAudio|Stops the corresponding phone audio modality that is currently connecting or connected.|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|phoneAudio|High|conversation|The phoneAudio resource has changed.|
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
"rel" : "phoneAudio",
"href" : "https://fe1.contoso.com:443//v1/applications/833/communication/phoneAudio"
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

Returns a representation of the phone audio modality in a [conversation](conversation_ref.md).


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

Get https://fe1.contoso.com:443//v1/applications/833/communication/phoneAudio HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json


```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 561
{
"rel" : "phoneAudio",
"state" : "Disconnected",
"_links" : {
"self" : {
"href" : "//v1/applications/833/communication/phoneAudio"
},
"addPhoneAudio" : {
"href" : "//v1/applications/833/communication/phoneAudio/addPhoneAudio"
},
"conversation" : {
"href" : "//v1/applications/833/communication/conversations/802"
},
"holdPhoneAudio" : {
"href" : "//v1/applications/833/communication/phoneAudio/holdPhoneAudio"
},
"resumePhoneAudio" : {
"href" : "//v1/applications/833/communication/phoneAudio/resumePhoneAudio"
},
"stopPhoneAudio" : {
"href" : "//v1/applications/833/communication/phoneAudio/stopPhoneAudio"
}
}
}

```


#### XML Request


```

Get https://fe1.contoso.com:443//v1/applications/833/communication/phoneAudio HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml


```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 754
<?xml version="1.0" encoding="utf-8"?>
<resource rel="phoneAudio" href="//v1/applications/833/communication/phoneAudio" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<link rel="addPhoneAudio" href="//v1/applications/833/communication/phoneAudio/addPhoneAudio" />
<link rel="conversation" href="//v1/applications/833/communication/conversations/802" />
<link rel="holdPhoneAudio" href="//v1/applications/833/communication/phoneAudio/holdPhoneAudio" />
<link rel="resumePhoneAudio" href="//v1/applications/833/communication/phoneAudio/resumePhoneAudio" />
<link rel="stopPhoneAudio" href="//v1/applications/833/communication/phoneAudio/stopPhoneAudio" />
<property name="rel">phoneAudio</property>
<property name="state">Transferring</property>
</resource>

```

