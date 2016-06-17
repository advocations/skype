
# audioVideo 


 _**Applies to:** Skype for Business 2015_

Represents the audio/video modality in the corresponding [conversation](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

In this version of the API, establishing audio/video calls is not supported. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|state|The state of the modality, such as Connecting, Connected, or Disconnected.|
|supportsReplaces|The replacementId for the audioVideo resource that can be used while doing consultative transfer|
|videoSourcesAllowed|The video sources allowed to contribute to the gallery (VideoSourcesAllowed).|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|videoLockedOnParticipant|Represents the [participant](participant_ref.md) on whom the video spotlight is locked in an [onlineMeeting](onlineMeeting_ref.md).|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|audioVideo|High|conversation|Indicates that the audio/video modality was updated.|
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
 "rel" : "audioVideo",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo"
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

Returns a representation of the audio/video modality in the corresponding [conversation](conversation_ref.md).


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
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 410
{
"rel" : "audioVideo",
"state" : "Transferring",
"supportsReplaces" : "None",
"videoSourcesAllowed" : "PresentersOnly",
"_links" : {
"self" : {
"href" : "//v1/applications/833/communication/conversations/802/audioVideo"
},
"conversation" : {
"href" : "//v1/applications/833/communication/conversations/802"
},
"videoLockedOnParticipant" : {
"href" : "//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant"
}
}
}
									
```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/audioVideo HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 622
<?xml version="1.0" encoding="utf-8"?>
<resource rel="audioVideo" href="//v1/applications/833/communication/conversations/802/audioVideo" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<link rel="conversation" href="//v1/applications/833/communication/conversations/802" />
<link rel="videoLockedOnParticipant" href="//v1/applications/833/communication/conversations/802/audioVideo/videoLockedOnParticipant" />
<property name="rel">audioVideo</property>
<property name="state">Connected</property>
<property name="supportsReplaces">None</property>
<property name="videoSourcesAllowed">PresentersOnly</property>
</resource>
									
```

