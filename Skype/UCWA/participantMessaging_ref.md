
# participantMessaging (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Used to determine whether a participant is using the instant messaging modality in a conversation. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The application can use this resource to monitor when a participant joins or leaves the [messaging (UCWA)](messaging_ref.md) modality.


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|participant|Represents a remote participant in a [conversation (UCWA)](conversation_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participantMessaging|High|conversation|Indicates that a participant is now using the instant messaging modality.|
|participantMessaging|High|conversation|Indicates that the user is now using the instant messaging modality.|
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
            "rel" : "participantMessaging",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575/participantMessaging"
          },
          "in" : {
            "rel" : "localParticipant",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting/665"
          },
          "type" : "added"
        }
      ]
    }
  ]
}
					
```


### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participantMessaging|High|conversation|Indicates that a participant's instant messaging modality has changed.|
|participantMessaging|High|conversation|Indicates that the user's instant messaging modality has changed.|
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
            "rel" : "participantMessaging",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575/participantMessaging"
          },
          "in" : {
            "rel" : "localParticipant",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting/665"
          },
          "type" : "updated"
        }
      ]
    }
  ]
}
					
```


### deleted





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participantMessaging|High|conversation|Indicates that a participant is no longer using the instant messaging modality.|
|participantMessaging|High|conversation|Indicates that the user is no longer using the instant messaging modality.|
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
            "rel" : "participantMessaging",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575/participantMessaging"
          },
          "in" : {
            "rel" : "localParticipant",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting/665"
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

Returns a representation of the instant messaging modality for a participant.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575/participantMessaging HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 247
										{
  "rel" : "participantMessaging",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantMessaging"
    },
    "participant" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575/participantMessaging HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 395
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;participantMessaging&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantMessaging&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;participant&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;participantMessaging&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

