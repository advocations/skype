
# simultaneousRingSettings (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents a user's settings to simultaneously send incoming calls to a specified target. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The user's incoming calls can be simultaneously sent to a contact, delegates, or team, as well as to the user. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|ringDelay|The wait time before a call simultaneously rings to the designated target numbers.|
|target|The currently active simultaneous ring target.This can be a custom number, delegates, or other members of the logged-on user's team.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|simultaneousRingToContact|Simultaneously send all incoming calls to a user-provided number or contact in addition to the user.|
|simultaneousRingToDelegates|Simultaneously send all incoming calls to a user's delegates in addition to the user.|
|simultaneousRingToTeam|Simultaneously send all incoming calls to a user's team, in addition to the user.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a user's settings to simultaneously send incoming calls to a specified target.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Indicates that the user is not enabled for enterprise voice.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: dc9e88a9-5992-4933-8f48-aa5ec28588d6
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 5fe9f878-f78c-43e2-8658-2d54b8947047
										Content-Type: application/json
										Content-Length: 632
										{
  "rel" : "simultaneousRingSettings",
  "ringDelay" : 5,
  "target" : "None",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings"
    },
    "contact" : {
      "href" : "//v1/applications/833/people/166"
    },
    "simultaneousRingToContact" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToContact"
    },
    "simultaneousRingToDelegates" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToDelegates"
    },
    "simultaneousRingToTeam" : {
      "href" : "//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToTeam"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: b5f90b0f-f61f-4dbf-ac1c-c3cd76b5c941
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 1d2dcd3c-0b0f-4431-bd09-4873b3db27a9
										Content-Type: application/xml
										Content-Length: 856
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;simultaneousRingSettings&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;contact&amp;quot; href=&amp;quot;//v1/applications/833/people/166&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;simultaneousRingToContact&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToContact&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;simultaneousRingToDelegates&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToDelegates&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;simultaneousRingToTeam&amp;quot; href=&amp;quot;//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToTeam&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;simultaneousRingSettings&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;ringDelay&amp;quot;&amp;gt;5&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;target&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


### PUT

Modifies a user's settings to simultaneously send incoming calls to a specified target.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Indicates that the user is not enabled for enterprise voice.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										if-match: e1280ec6-9ad3-4fc3-b110-52078738a905
										Content-Length: 64
										{
  "rel" : "simultaneousRingSettings",
  "ringDelay" : 5,
  "target" : "None"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```


#### XML Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/me/callForwardingSettings/simultaneousRingSettings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										if-match: d0cf8e60-2cee-4061-a060-b3bae954696d
										Content-Length: 247
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;simultaneousRingSettings&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;ringDelay&amp;quot;&amp;gt;5&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;target&amp;quot;&amp;gt;None&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```

