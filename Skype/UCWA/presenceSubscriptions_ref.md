
# presenceSubscriptions (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the user's set of [presenceSubscription (UCWA)](presenceSubscription_ref.md) resources.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

/// This resource can be used to create new [presenceSubscription (UCWA)](presenceSubscription_ref.md)s as well as to modify and delete existing ones. 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|presenceSubscription|Represents the subscription to a user-defined set of contacts.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a collection of [presenceSubscription (UCWA)](presenceSubscription_ref.md) resources.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscriptions.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 443
										{
  "rel" : "presenceSubscriptions",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/presenceSubscriptions"
    }
  },
  "_embedded" : {
    "presenceSubscription" : [
      {
        "rel" : "presenceSubscription",
        "id" : "3",
        "_links" : {
          "self" : {
            "href" : "//v1/applications/833/presenceSubscription"
          },
          "addToPresenceSubscription" : {
            "href" : "//v1/applications/833/presenceSubscription/addToPresenceSubscription"
          },
          "memberships" : {
            "href" : "//v1/applications/833/presenceSubscription/memberships"
          }
        }
      }
    ]
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 631
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;presenceSubscriptions&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscriptions&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;presenceSubscriptions&amp;lt;/property&amp;gt;
  &amp;lt;resource rel=&amp;quot;presenceSubscription&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscription&amp;quot;&amp;gt;
    &amp;lt;link rel=&amp;quot;addToPresenceSubscription&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscription/addToPresenceSubscription&amp;quot; /&amp;gt;
    &amp;lt;link rel=&amp;quot;memberships&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscription/memberships&amp;quot; /&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;presenceSubscription&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;3&amp;lt;/property&amp;gt;
  &amp;lt;/resource&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


### POST

Creates a new subscription to a user-defined set of contacts.


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
|[presenceSubscription (UCWA)](presenceSubscription_ref.md)|Represents the subscription to a user-defined set of contacts.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscriptions.|
|Forbidden|403|LimitExceeded|The user has reached the maximum number of subscriptions that can be created.|
|Forbidden|403|None|The user does not have sufficient privileges to modify the contact list.|
|Conflict|409|None|Conflict occurs when the resource is not in the proper state to accept the request.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										Accept: application/json
										Content-Length: 85
										{
  "duration" : 15,
  "uris" : [
    "\"sip : johndoe@contoso.com\"",
    "\"sip : janedoe@contoso.com\""
  ]
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Content-Type: application/json
										Content-Length: 299
										{
  "rel" : "presenceSubscription",
  "id" : "3",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/presenceSubscription"
    },
    "addToPresenceSubscription" : {
      "href" : "//v1/applications/833/presenceSubscription/addToPresenceSubscription"
    },
    "memberships" : {
      "href" : "//v1/applications/833/presenceSubscription/memberships"
    }
  }
}
									
```


#### XML Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Accept: application/xml
										Content-Length: 264
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;input xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;duration&amp;quot;&amp;gt;15&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;uris&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;&amp;quot;sip:johndoe@contoso.com&amp;quot;&amp;lt;/item&amp;gt;
    &amp;lt;item&amp;gt;&amp;quot; sip:janedoe@contoso.com&amp;quot;&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
&amp;lt;/input&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Content-Type: application/xml
										Content-Length: 478
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;presenceSubscription&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscription&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;addToPresenceSubscription&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscription/addToPresenceSubscription&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;memberships&amp;quot; href=&amp;quot;//v1/applications/833/presenceSubscription/memberships&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;presenceSubscription&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;3&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

