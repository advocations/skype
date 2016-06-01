
# accept (UCWA)

 **Last modified:** July 15, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Accepts an incoming invitation. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource is used to accept an incoming [messagingInvitation (UCWA)](messagingInvitation_ref.md) or[onlineMeetingInvitation (UCWA)](onlineMeetingInvitation_ref.md) as part of a new or existing[conversation (UCWA)](conversation_ref.md). An application can determine whether the invitation was successfully accepted based on whether the corresponding invitation completed with success. For an incoming [messagingInvitation (UCWA)](messagingInvitation_ref.md), accept will change the status of the instant messaging modality to "Connected" in the corresponding conversation. Subsequently the application will be able to send and receive messages and typing notifications.For an incoming [onlineMeetingInvitation (UCWA)](onlineMeetingInvitation_ref.md), accept causes the user to join the corresponding [onlineMeeting (UCWA)](onlineMeeting_ref.md). The [conversation (UCWA)](conversation_ref.md) state will change to "Conferenced". Note that the application is then responsible for joining a modality.


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Accepts an incoming invitation.


#### Request body

None


#### Response body

None


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

										Post https://fe1.contoso.com:443//v1/applications/706/communication/invitations/350/accept HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```


#### XML Request


```

										Post https://fe1.contoso.com:443//v1/applications/706/communication/invitations/350/accept HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```

