
# me (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents the user. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The me resource will be updated whenever the application becomes ready for incoming calls and leaves lurker mode ([makeMeAvailable (UCWA)](makeMeAvailable_ref.md)). Note that me will not be updated if any of its properties, such as emailAddresses or title, change while the application is active. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|department|The user's department.|
|emailAddresses|The user's e-mail addresses.|
|name|The user's display name.|
|title|The user's title.|
|uri|The user's URI.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|callForwardingSettings|Represents settings that govern call forwarding.|
|location|Represents the user's location.|
|makeMeAvailable|Makes the user available for incoming communications.|
|note|Represents the user's personal or out-of-office note.|
|phones|A collection of phone resources that represent the phone numbers of the logged-on user.|
|photo|Represents the user's photo.|
|presence|Represents the user's availability and activity.|
|reportMyActivity|Indicates that the user is actively using this application.|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|me|Medium|me|The application is no longer in lurker mode and is therefore visible to contacts. The application can now set things such as the user's presence and note.|
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
      "rel" : "me",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/me",
      "events" : [
        {
          "link" : {
            "rel" : "me",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/me"
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

Returns a representation of the user.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Conflict|409|None|Returned when an application is in the process of initializing or terminating.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 696
										{
  "rel" : "me",
  "department" : "Sales",
  "emailAddresses" : [
    "johndoe@contoso.com"
  ],
  "name" : "John Doe",
  "title" : "Senior Manager",
  "uri" : "sip:johndoe@contoso.com",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/me"
    },
    "callForwardingSettings" : {
      "href" : "//v1/applications/833/me/callForwardingSettings"
    },
    "location" : {
      "href" : "//v1/applications/833/me/location"
    },
    "makeMeAvailable" : {
      "href" : "//v1/applications/833/communication/makeMeAvailable"
    },
    "note" : {
      "href" : "//v1/applications/833/me/note"
    },
    "phones" : {
      "href" : "//v1/applications/833/me/phones"
    },
    "photo" : {
      "href" : "//v1/applications/833/photo"
    },
    "presence" : {
      "href" : "//v1/applications/833/me/presence"
    },
    "reportMyActivity" : {
      "href" : "//v1/applications/833/reportMyActivity"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 1016
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;me&amp;quot; href=&amp;quot;//v1/applications/833/me&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;callForwardingSettings&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;location&amp;quot; href=&amp;quot;//v1/applications/833/me/location&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;makeMeAvailable&amp;quot; href=&amp;quot;//v1/applications/833/communication/makeMeAvailable&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;note&amp;quot; href=&amp;quot;//v1/applications/833/me/note&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;phones&amp;quot; href=&amp;quot;//v1/applications/833/me/phones&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;photo&amp;quot; href=&amp;quot;//v1/applications/833/photo&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;presence&amp;quot; href=&amp;quot;//v1/applications/833/me/presence&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;reportMyActivity&amp;quot; href=&amp;quot;//v1/applications/833/reportMyActivity&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;me&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;department&amp;quot;&amp;gt;Sales&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;emailAddresses&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;johndoe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;name&amp;quot;&amp;gt;John Doe&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;title&amp;quot;&amp;gt;Senior Manager&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;uri&amp;quot;&amp;gt;sip:johndoe@contoso.com&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

