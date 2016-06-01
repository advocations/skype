
# immediateForwardSettings (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the settings for a user to immediately forward incoming calls to a specified target. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The user's incoming calls can be forwarded to a contact, number, delegates, or voicemail, without ringing the user's work number. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|target|The number that calls will be forwarded to.Calls can be forwarded to a Contact, Delegates, or Voicemail.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|immediateForwardToContact|Immediately forward all incoming calls to a user-provided number or contact.|
|immediateForwardToDelegates|Immediately forward all incoming calls to the user's delegates.|
|immediateForwardToVoicemail|Immediately forward all incoming calls to the user's voicemail.|

## Operations
<a name="sectionSection2"> </a>




### GET

Represents the settings for a user to immediately forward incoming calls to a specified target.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Indicates that the user is not enabled for enterprise voice or is anonymous.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/immediateForwardSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: a0eae570-18a6-4ac4-a264-543159c8ab2a
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: f06fdf19-541e-4ec6-aaeb-ce45f49d5976
										Content-Type: application/json
										Content-Length: 628
										{
  "rel" : "immediateForwardSettings",
  "target" : "None",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings"
    },
    "contact" : {
      "href" : "//v1/applications/833/people/166"
    },
    "immediateForwardToContact" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToContact"
    },
    "immediateForwardToDelegates" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToDelegates"
    },
    "immediateForwardToVoicemail" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToVoicemail"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/immediateForwardSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 3aae9535-5615-4e23-bd6b-000366d4d1d0
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 8f638eae-55f0-4279-b240-30174a9a6628
										Content-Type: application/xml
										Content-Length: 827
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;immediateForwardSettings&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/immediateForwardSettings&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;contact&amp;quot; href=&amp;quot;//v1/applications/833/people/166&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;immediateForwardToContact&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToContact&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;immediateForwardToDelegates&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToDelegates&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;immediateForwardToVoicemail&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/immediateForwardSettings/immediateForwardToVoicemail&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;immediateForwardSettings&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;target&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

