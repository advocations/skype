
# phone (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents one of the user's phone numbers. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

These phone numbers can be used as targets for a user's incoming calls or made visible as part of the user's contact card. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|includeInContactCard|Indicates whether this phone number is shared in contact card.|
|number|The phone number.|
|type|The type of phone number: Work/Home/Other/Mobile.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|changeNumber|Changes or clears the number stored in the corresponding [phone (UCWA)](phone_ref.md) resource.|
|changeVisibility|Changes the visibility of a phone number to other contacts.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of one of the user's phone numbers.


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

										Get https://fe1.contoso.com:443//v1/applications/833/me/phones/phone HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: ebf356da-c8a5-4bd5-8401-7ad5a8df6cea
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: b00fb720-d8fa-4d80-bc5e-ea55eef1d863
										Content-Type: application/json
										Content-Length: 325
										{
  "rel" : "phone",
  "includeInContactCard" : false,
  "number" : " tel:+1425554321;ext=54321",
  "type" : "Work",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/me/phones/phone"
    },
    "changeNumber" : {
      "href" : "//v1/applications/833/me/phones/phone/changeNumber"
    },
    "changeVisibility" : {
      "href" : "//v1/applications/833/me/phones/phone/changeVisibility"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/me/phones/phone HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 91d20fdd-501a-49ca-befb-e030b187f5ec
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 1974d869-4dbe-4bba-95b0-1f69699a404d
										Content-Type: application/xml
										Content-Length: 538
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;phone&amp;quot; href=&amp;quot;//v1/applications/833/me/phones/phone&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;changeNumber&amp;quot; href=&amp;quot;//v1/applications/833/me/phones/phone/changeNumber&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;changeVisibility&amp;quot; href=&amp;quot;//v1/applications/833/me/phones/phone/changeVisibility&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;phone&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;includeInContactCard&amp;quot;&amp;gt;False&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;number&amp;quot;&amp;gt; tel:+1425554321;ext=54321&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt; Home&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

