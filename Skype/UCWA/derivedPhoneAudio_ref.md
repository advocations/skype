
# derivedPhoneAudio (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the [phoneAudio (UCWA)](phoneAudio_ref.md) modality in a[derivedConversation (UCWA)](derivedConversation_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource indicates that the [phoneAudio (UCWA)](phoneAudio_ref.md) modality will be served from a different[conversation (UCWA)](conversation_ref.md) because the[acceptedByParticipant (UCWA)](acceptedByParticipant_ref.md) is different from the current remote[participant (UCWA)](participant_ref.md) of the conversation where[phoneAudio (UCWA)](phoneAudio_ref.md) was added.


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the [phoneAudio (UCWA)](phoneAudio_ref.md) modality in a[derivedConversation (UCWA)](derivedConversation_ref.md).


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/invitations/630/derivedPhoneAudio HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 559
										{
  "rel" : "phoneAudio",
  "state" : "Connecting",
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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/invitations/630/derivedPhoneAudio HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 751
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;phoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/phoneAudio&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;addPhoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/phoneAudio/addPhoneAudio&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;conversation&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversations/802&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;holdPhoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/phoneAudio/holdPhoneAudio&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;resumePhoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/phoneAudio/resumePhoneAudio&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;stopPhoneAudio&amp;quot; href=&amp;quot;//v1/applications/833/communication/phoneAudio/stopPhoneAudio&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;phoneAudio&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;state&amp;quot;&amp;gt;Connected&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

