
# onlineMeetingExtension (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents custom data for the associated [onlineMeeting (UCWA)](onlineMeeting_ref.md) that can be used by an application.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

An onlineMeetingExtension resource can have zero or more optional programmer-defined properties that represent key-value pairs. An application can set and retrieve these properties at any time during the life of the [onlineMeeting (UCWA)](onlineMeeting_ref.md). Applications that understand a particular extension can use the data to enhance the user's meeting experience. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|id|The user-defined unique identifier for this extension.|
|type|The extension's data distribution policy, such as RoamedOrganizerData or RoamedParticipantData.The data distribution policy indicates whether the extension data will be shared onlywith the meeting organizer or with all meeting participants.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the data that is needed by a custom meeting extension, stored as a collection of key-value pair properties.


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: e1c1019b-5884-4be8-94bf-1b7fd3ea8773
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: bce53cf8-fc06-4b61-9799-04687a5687fa
										Content-Type: application/json
										Content-Length: 211
										{
  "rel" : "onlineMeetingExtension",
  "id" : "917823",
  "type" : "RoamedParticipantData",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: c5ba3bb3-0b56-4d4c-92b5-a7dec84c7d85
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 39730942-97c0-4498-b456-8f4e345ff67a
										Content-Type: application/xml
										Content-Length: 399
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;onlineMeetingExtension&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetingExtension&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;917823&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt;RoamedParticipantData&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


### DELETE

Removes an extension.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).


#### Examples




#### JSON Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension HTTP/1.1
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

										Delete https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```


### PUT

Modifies an existing extension.


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
|[onlineMeetingExtension (UCWA)](onlineMeetingExtension_ref.md)|Represents custom data for the associated [onlineMeeting (UCWA)](onlineMeeting_ref.md) that can be used by an application.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										Accept: application/json
										Content-Length: 46
										{
  "id" : "917823",
  "type" : "RoamedParticipantData"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: abd72945-dec9-4a81-b132-139f4017a903
										Content-Type: application/json
										Content-Length: 211
										{
  "rel" : "onlineMeetingExtension",
  "id" : "917823",
  "type" : "RoamedParticipantData",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension"
    }
  }
}
									
```


#### XML Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Accept: application/xml
										Content-Length: 198
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;input xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;917823&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt;RoamedParticipantData&amp;lt;/property&amp;gt;
&amp;lt;/input&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 580d1350-d028-4976-8832-38d2decc3994
										Content-Type: application/xml
										Content-Length: 399
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;onlineMeetingExtension&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/810/onlineMeetingExtensions/onlineMeetingExtension&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetingExtension&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;917823&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt;RoamedParticipantData&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

