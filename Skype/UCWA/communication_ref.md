
# communication (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents the dashboard for communication capabilities. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource exposes the modalities and settings available to the user, including the ability to join an [onlineMeeting (UCWA)](onlineMeeting_ref.md) or create an ad-hoc[onlineMeeting (UCWA)](onlineMeeting_ref.md). Please note that this resource will be the sender for all events pertaining to [conversation (UCWA)](conversation_ref.md)s and modality invitations ([messagingInvitation (UCWA)](messagingInvitation_ref.md) or[phoneAudioInvitation (UCWA)](phoneAudioInvitation_ref.md)). 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|conversationHistory|Gets or sets the conversation history policy.|
|phoneNumber|The phone number of the device the user wishes to be reached on.The maximum length is 100 characters.|
|supportedMessageFormats|The message formats (MessageFormat) that are supported by this application.|
|supportedModalities|The list of incoming modalities (ModalityType) of interest to the user.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|conversationLogs|Represents the user's past conversation logs (both peer-to-peer and conferences).|
|conversations|Represents the user's ongoing [conversation (UCWA)](conversation_ref.md)s.|
|joinOnlineMeeting|Joins an online meeting.|
|missedItems|A collection of unread voicemails and conversations.|
|startMessaging|Starts a [messagingInvitation (UCWA)](messagingInvitation_ref.md) that adds the[messaging (UCWA)](messaging_ref.md) modality to a new[conversation (UCWA)](conversation_ref.md).|
|startOnlineMeeting|Creates and joins an ad-hoc multiparty conversation.|
|startPhoneAudio|Initiates a call-via-work.|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|communication|Medium|communication|Indicates that the communication resource has been updated.|
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
      "rel" : "communication",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/communication",
      "events" : [
        {
          "link" : {
            "rel" : "communication",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication"
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

Returns a representation of the dashboard for communication capabilities.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: 2e75ac4e-eb8a-4cfd-a2d5-473a440e05a3
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: fa99b354-8578-49c8-9846-e42efa21fd68
										Content-Type: application/json
										Content-Length: 852
										{
  "simultaneousRingNumberMatch" : "Disabled",
  "rel" : "communication",
  "conversationHistory" : "Disabled",
  "phoneNumber" : "tel:+14255552222",
  "supportedMessageFormats" : [
    "Plain",
    "Html"
  ],
  "supportedModalities" : [
    "PhoneAudio",
    "Messaging"
  ],
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/communication"
    },
    "conversationLogs" : {
      "href" : "//v1/applications/833/communication/conversationLogs"
    },
    "conversations" : {
      "href" : "//v1/applications/833/communication/conversations"
    },
    "joinOnlineMeeting" : {
      "href" : "//v1/applications/833/communication/joinOnlineMeeting"
    },
    "missedItems" : {
      "href" : "//v1/applications/833/communication/missedItems"
    },
    "startMessaging" : {
      "href" : "//v1/applications/833/communication/startMessaging"
    },
    "startOnlineMeeting" : {
      "href" : "//v1/applications/833/communication/startOnlineMeeting"
    },
    "startPhoneAudio" : {
      "href" : "//v1/applications/833/communication/startPhoneAudio"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: c7b6e188-96d6-4be8-9bc5-08efac31ba45
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 5362defe-6ebd-4274-8a18-ea521a43c291
										Content-Type: application/xml
										Content-Length: 1214
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;communication&amp;quot; href=&amp;quot;//v1/applications/833/communication&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;conversationLogs&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;conversations&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;joinOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/communication/joinOnlineMeeting&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;missedItems&amp;quot; href=&amp;quot;//v1/applications/833/communication/missedItems&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;startMessaging&amp;quot; href=&amp;quot;//v1/applications/833/communication/startMessaging&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;startOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/communication/startOnlineMeeting&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;startPhoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/startPhoneAudio&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;simultaneousRingNumberMatch&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;communication&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;conversationHistory&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;phoneNumber&amp;quot;&amp;gt;tel:+14255552222&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;supportedMessageFormats&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Plain&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;Html&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;propertyList name=&amp;quot;supportedModalities&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;PhoneAudio&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;Messaging&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


### PUT

Modifies the dashboard for communication capabilities.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/communication HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										if-match: a373bf35-baf5-4086-814a-a0830629a162
										Content-Length: 222
										{
  "simultaneousRingNumberMatch" : "Disabled",
  "rel" : "communication",
  "conversationHistory" : "Disabled",
  "phoneNumber" : "tel:+14255552222",
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

										HTTP/1.1 200 OK
										
									
```


#### XML Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/communication HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										if-match: 38a30f2e-4ca7-4603-80c0-33569e846d35
										Content-Length: 530
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;simultaneousRingNumberMatch&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;communication&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;conversationHistory&amp;quot;&amp;gt;Disabled&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;phoneNumber&amp;quot;&amp;gt;tel:+14255552222&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;supportedMessageFormats&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Plain&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;Html&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;propertyList name=&amp;quot;supportedModalities&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;PhoneAudio&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;Messaging&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```

