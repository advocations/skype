
# participant (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents a remote participant in a [conversation (UCWA)](conversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|
|title|The display name or normalized phone number of the participant, if available.|

## Resource description
<a name="sectionSection1"> </a>

A participant resource is the transient representation of a [contact (UCWA)](contact_ref.md) that captures attributes such as role and capabilities (e.g. promoting to leader or admitting from lobby). A participant's lifetime is controlled by the server and starts when the participant is present upon joining an[onlineMeeting (UCWA)](onlineMeeting_ref.md) or added later on to a[conversation (UCWA)](conversation_ref.md). This resource is removed when the participant leaves the [conversation (UCWA)](conversation_ref.md). 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|anonymous|Whether the participant is anonymous.|
|name|The participant's display name.|
|organizer|Whether the participant is an organizer.An organizer can never be locked out of her own meeting.|
|otherPhoneNumber|The participant's Other Phone.|
|role|The participant's role (Role), such as Attendee or Leader.|
|sourceNetwork|The participant's source network (SourceNetwork), such as SameEnterprise or PublicCloud (for example, a Skype contact).|
|uri|The participant's URI.|
|workPhoneNumber|The participant's Phone URI.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|admit|Admits the corresponding [participant (UCWA)](participant_ref.md) into the[onlineMeeting (UCWA)](onlineMeeting_ref.md).|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|contactPhoto|The photo of a contact.|
|contactPresence|Represents a [contact (UCWA)](contact_ref.md)'s availability and activity.|
|conversation|Represents the local participants perspective on a multi-modal, multi-party communication.|
|demote|Demotes the corresponding [participant (UCWA)](participant_ref.md) from the leader role to the attendee role.|
|eject|Ejects the corresponding [participant (UCWA)](participant_ref.md) from the[onlineMeeting (UCWA)](onlineMeeting_ref.md).|
|me|Represents the user.|
|participantApplicationSharing|Represents whether a participant is using the application sharing modality in a conversation.|
|participantAudio|Represents whether a participant is using the audio modality in a conversation.|
|participantDataCollaboration|Represents whether a participant is using the data collaboration modality in a conversation.|
|participantMessaging|Used to determine whether a participant is using the instant messaging modality in a conversation.|
|participantPanoramicVideo|Represents whether a participant is using the panoramic video modality in a conversation.|
|participantVideo|Represents whether a participant is using the main video modality in a conversation.|
|promote|Promotes the corresponding [participant (UCWA)](participant_ref.md) from the attendee role to the leader role.|
|reject|Denies the corresponding [participant (UCWA)](participant_ref.md) access to the[onlineMeeting (UCWA)](onlineMeeting_ref.md).|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|participant|High|conversation|Indicates that the [participant (UCWA)](participant_ref.md) has joined the[conversation (UCWA)](conversation_ref.md). The application can choose to retrieve the updated information.|
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
            "rel" : "participant",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
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
|participant|High|conversation|Indicates that the [participant (UCWA)](participant_ref.md) has been updated. The application can choose to retrieve the updated information.|
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
            "rel" : "participant",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
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
|participant|High|conversation|Indicates that the [participant (UCWA)](participant_ref.md) has left a[conversation (UCWA)](conversation_ref.md).|
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
            "rel" : "participant",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575"
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

Returns a representation of the participant resource.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 1926
										{
  "rel" : "participant",
  "anonymous" : true,
  "name" : "Joe Smith",
  "organizer" : true,
  "otherPhoneNumber" : "tel:+14251111111",
  "role" : "Attendee",
  "sourceNetwork" : "SameEnterprise",
  "uri" : "sip:john@contoso.com",
  "workPhoneNumber" : "tel:+14251111111",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575"
    },
    "admit" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/admit"
    },
    "contact" : {
      "href" : "//v1/applications/833/people/166"
    },
    "contactPhoto" : {
      "href" : "//v1/applications/833/people/166/contactPhoto"
    },
    "contactPresence" : {
      "href" : "//v1/applications/833/people/166/contactPresence"
    },
    "conversation" : {
      "href" : "//v1/applications/833/communication/conversations/802"
    },
    "demote" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/demote"
    },
    "eject" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/eject"
    },
    "me" : {
      "href" : "//v1/applications/833/me"
    },
    "participantApplicationSharing" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantApplicationSharing"
    },
    "participantAudio" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantAudio"
    },
    "participantDataCollaboration" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantDataCollaboration"
    },
    "participantMessaging" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantMessaging"
    },
    "participantPanoramicVideo" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantPanoramicVideo"
    },
    "participantVideo" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/participantVideo"
    },
    "promote" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/promote"
    },
    "reject" : {
      "href" : "//v1/applications/833/communication/conversations/802/participants/575/reject"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/participants/575 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 2373
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;participant&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;admit&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/admit&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contact&amp;quot; href=&amp;quot;//v1/applications/833/people/166&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactPhoto&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactPhoto&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactPresence&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactPresence&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;conversation&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;demote&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/demote&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;eject&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/eject&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;me&amp;quot; href=&amp;quot;//v1/applications/833/me&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;participantApplicationSharing&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantApplicationSharing&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;participantAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantAudio&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;participantDataCollaboration&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantDataCollaboration&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;participantMessaging&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantMessaging&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;participantPanoramicVideo&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantPanoramicVideo&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;participantVideo&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/participantVideo&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;promote&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/promote&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;reject&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802/participants/575/reject&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;participant&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;anonymous&amp;quot;&amp;gt;True&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;name&amp;quot;&amp;gt;Joe Smith&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;organizer&amp;quot;&amp;gt;True&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;otherPhoneNumber&amp;quot;&amp;gt;tel:+14251111111&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;role&amp;quot;&amp;gt;Attendee&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;sourceNetwork&amp;quot;&amp;gt;SameEnterprise&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;uri&amp;quot;&amp;gt;sip:john@contoso.com&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;workPhoneNumber&amp;quot;&amp;gt;tel:+14251111111&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

