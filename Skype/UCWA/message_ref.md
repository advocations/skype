
# message 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 
Represents an instant message sent or received by the local participant. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

Message is started in the event channel for both incoming and outgoing scenarios. For outgoing instant messages, the message delivery status can be tracked via the event channel. When the message is part of a peer-to-peer conversation, the delivery status merely indicates whether the message was delivered to the remote participant. In the multi-party case, the delivery status indicates which of the remote participants failed to receive the message. For incoming instant messages, message captures information such as the remote participant who sent the message, the time stamp, and the body of the message. If an incoming instant message is received by UCWA but is not fetched by the application via the event channel in a timely fashion (within 30 seconds), the message will time out and the app will not be able to receive it. Additionally, the sender of the message will be notified that the message was not received.


### Properties





|**Name**|**Description**|
|:-----|:-----|
|direction|The direction of this message, either incoming or outgoing.|
|htmlMessage|If populated, indicates an HTML message body.|
|operationId|A application-supplied identifier to correlate an outgoing message started in the event channel using [sendMessage](sendMessage_ref.md).|
|status|The delivery status of this message.|
|plainMessage|If populated, indicates a plain text message body.|
|timeStamp|The message's time stamp.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|failedDeliveryParticipant|Represents a [participant](participant_ref.md) that failed to receive an instant message sent by the user.|
|messaging|Represents the instant messaging modality in a [conversation](conversation_ref.md).|
|participant|Represents a remote participant in a [conversation](conversation_ref.md).|

## Events
<a name="sectionSection2"> </a>




### started





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|message|High|conversation|Delivered when a message is started for an incoming instant message.|
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
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/conversations/271",
 "events" : [
 {
 "link" : {
 "rel" : "message",
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/conversations/271/messaging/messages/142"
 },
 "type" : "started"
 }
 ]
 }
 ]
}
					
```


### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|message|High|conversation|Delivered when the message is completed for an incoming instant message.|
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
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/conversations/271",
 "events" : [
 {
 "link" : {
 "rel" : "message",
 "href" : "https://fe1.contoso.com:443//v1/applications/316/communication/conversations/271/messaging/messages/142"
 },
 "type" : "completed"
 }
 ]
 }
 ]
}
					
```


#### Asynchronous reason codes

The **completed** event is sent on the event channel when the operation is finished. A status value of "success" indicates that the operation completed successfully.A status value of "failure" indicates that the operation failed. In case of failure, the error code and subcode are sent on the event channel.The following table shows the errors that are possible for this resource.

It is recommended that applications handle the error codes shown here. Applications can optionally display subcodes and messages in their user interface.


##### Conflict
 

|**Subcode**|**Reason**|
|:-----|:-----|
|AlreadyExists|The already exists error.|
|None|The request was too large.|
|None|Un-supported Service/Resource/API error.|
|TooManyGroups|The too many groups error.|

##### EntityTooLarge
 

|**Subcode**|**Reason**|
|:-----|:-----|
|None|The request was too large.|

##### Informational
 

|**Subcode**|**Reason**|
|:-----|:-----|
|Ended|The online meeting has ended.|

##### RemoteFailure
 

|**Subcode**|**Reason**|
|:-----|:-----|
|NotAllowed|The message body was not understood by the remote participant.|
|Timeout|The operation has timed out on the callee's end.|

##### ServiceFailure
 

|**Subcode**|**Reason**|
|:-----|:-----|
|CallbackChannelError|The remote event channel is not reachable|
|InvalidExchangeServerVersion|Invalid exchange server version.|
|None|The message delivery failed due to an Internal Server Error.|

## Operations
<a name="sectionSection3"> </a>




### GET

Operation description coming soon...


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

 Get https://fe1.contoso.com:443//v1/applications/316/communication/conversations/271/messaging/messages/142 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/json
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/json
 Content-Length: 754
 {
 "rel" : "message",
 "direction" : "Incoming",
 "operationId" : "74cb7404e0a247d5a2d4eb0376a47dbf",
 "status" : "Pending",
 "timeStamp" : "\/Date(1436927669509)\/",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/316/communication/conversations/271/messaging/messages/142"
 },
 "htmlMessage" : {
 "href" : "data:text/html;base64,base64-encoded-htmlmessage"
 },
 "plainMessage" : {
 "href" : "data:text/plain;charset=utf8,URLEncodedMessageString"
 },
 "contact" : {
 "href" : "//v1/applications/316/people/420"
 },
 "failedDeliveryParticipant" : [
 {
 "href" : "//v1/applications/316/communication/conversations/271/participants/156"
 }
 ],
 "messaging" : {
 "href" : "//v1/applications/316/communication/conversations/271/messaging"
 },
 "participant" : {
 "href" : "//v1/applications/316/communication/conversations/271/participants/127"
 }
 }
}
									
```


#### XML Request


```

 Get https://fe1.contoso.com:443//v1/applications/316/communication/conversations/271/messaging/messages/142 HTTP/1.1
 Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
 Host: fe1.contoso.com
 Accept: application/xml
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 1029
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="message" href="//v1/applications/316/communication/conversations/271/messaging/messages/142" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="htmlMessage" href="data:text/html;base64,base64-encoded-htmlmessage" />
 <link rel="plainMessage" href="data:text/plain;charset=utf8,URLEncodedMessageString" />
 <link rel="contact" href="//v1/applications/316/people/420" />
 <link rel="failedDeliveryParticipant" href="//v1/applications/316/communication/conversations/271/participants/966" />
 <link rel="messaging" href="//v1/applications/316/communication/conversations/271/messaging" />
 <link rel="participant" href="//v1/applications/316/communication/conversations/271/participants/127" />
 <property name="rel">message</property>
 <property name="direction">Incoming</property>
 <property name="operationId">74cb7404e0a247d5a2d4eb0376a47dbf</property>
 <property name="status">Pending</property>
 <property name="timeStamp">2015-07-14T21:34:29.5100719-05:00</property>
</resource>
									
```

