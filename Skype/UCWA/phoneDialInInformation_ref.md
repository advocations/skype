
# phoneDialInInformation (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents phone access information for an [onlineMeeting (UCWA)](onlineMeeting_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>




### Properties





|**Name**|**Description**|
|:-----|:-----|
|conferenceId|The conference ID for use when a participant joins the online meeting by dialing in from a phone line.|
|defaultRegion|The default region to use when the online meeting is joined by dialing in from a phone line.|
|externalDirectoryUri|A URL to the externally-accessible web page that contains dial-in information.|
|internalDirectoryUri|A URL to the internally-accessible web page that contains dial-in information.|
|isAudioConferenceProviderEnabled|Whether the online meeting supports using an audio conference provider (ACP).|
|participantPassCode|The participant password required to connect to the Audio Conference Provider.|
|tollFreeNumbers|The toll-free number to connect to the Audio Conference Provider.|
|tollNumber|The toll number to connect to the Audio Conference Provider.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|dialInRegion|Represents access information for phone users who wish to join an [onlineMeeting (UCWA)](onlineMeeting_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the phone access information for an [onlineMeeting (UCWA)](onlineMeeting_ref.md).


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/phoneDialInInformation HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 633
										{
  "rel" : "phoneDialInInformation",
  "conferenceId" : "12983487",
  "defaultRegion" : "Redmond",
  "externalDirectoryUri" : "https://dial.contoso.com",
  "internalDirectoryUri" : "https://dial.contoso.com",
  "isAudioConferenceProviderEnabled" : false,
  "participantPassCode" : "samplevalue",
  "tollFreeNumbers" : [
    "samplevalue"
  ],
  "tollNumber" : "samplevalue",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings/phoneDialInInformation"
    }
  },
  "_embedded" : {
    "dialInRegion" : [
      {
        "rel" : "dialInRegion",
        "languages" : [
          "en-US",
          "fr-FR"
        ],
        "name" : "Redmond",
        "number" : "tel:+14255550001",
        "_links" : {
          "self" : {
            "href" : "//v1/applications/833/onlineMeetings/phoneDialInInformation/505"
          }
        }
      }
    ]
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/phoneDialInInformation HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 1086
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;phoneDialInInformation&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/phoneDialInInformation&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;phoneDialInInformation&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;conferenceId&amp;quot;&amp;gt;12983487&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;defaultRegion&amp;quot;&amp;gt;Redmond&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;externalDirectoryUri&amp;quot;&amp;gt;https://dial.contoso.com&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;internalDirectoryUri&amp;quot;&amp;gt;https://dial.contoso.com&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;isAudioConferenceProviderEnabled&amp;quot;&amp;gt;False&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;participantPassCode&amp;quot;&amp;gt;samplevalue&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;tollFreeNumbers&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;samplevalue&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;tollNumber&amp;quot;&amp;gt;samplevalue&amp;lt;/property&amp;gt;
  &amp;lt;resource rel=&amp;quot;dialInRegion&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/phoneDialInInformation/505&amp;quot;&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;dialInRegion&amp;lt;/property&amp;gt;
    &amp;lt;propertyList name=&amp;quot;languages&amp;quot;&amp;gt;
      &amp;lt;item&amp;gt;en-US&amp;lt;/item&amp;gt;
      &amp;lt;item&amp;gt;fr-FR&amp;lt;/item&amp;gt;
    &amp;lt;/propertyList&amp;gt;
    &amp;lt;property name=&amp;quot;name&amp;quot;&amp;gt;Redmond&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;number&amp;quot;&amp;gt;tel:+14255550001&amp;lt;/property&amp;gt;
  &amp;lt;/resource&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

