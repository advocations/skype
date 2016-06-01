
# presenceSubscription (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents the subscription to a user-defined set of contacts. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource allows the application to keep track of members of the subscription. Updates include [presence (UCWA)](presence_ref.md), [location (UCWA)](location_ref.md), or [note (UCWA)](note_ref.md) changes for a specific contact. Additionally, an update on the event channel will inform the application that the subscription is about to expire. The application can then elect to refresh the subscription. Unlike[group (UCWA)](group_ref.md), presenceSubscription is not persistent and is typically relevant only for a short duration. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|id|The ID for this presence subscription. The ID is unique for this application.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|addToPresenceSubscription|Represents the capability to add contacts to a [presenceSubscription (UCWA)](presenceSubscription_ref.md).|
|memberships|The memberships resource.|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|presenceSubscription|Medium|people|Delivered when the presence subscription resource is added.|
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
      "rel" : "people",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/people",
      "events" : [
        {
          "link" : {
            "rel" : "presenceSubscription",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/presenceSubscription"
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
|presenceSubscription|Medium|people|Delivered when the presence subscription resource is updated.|
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
      "rel" : "people",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/people",
      "events" : [
        {
          "link" : {
            "rel" : "presenceSubscription",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/presenceSubscription"
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
|presenceSubscription|Medium|people|Delivered when the presence subscription resource is deleted.|
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
      "rel" : "people",
      "href" : "https://fe1.contoso.com:443//v1/applications/833/people",
      "events" : [
        {
          "link" : {
            "rel" : "presenceSubscription",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/presenceSubscription"
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

Returns a representation of the subscription to a user-defined set of contacts.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify a presence subscription that was created by the system.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscription HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
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

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscription HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
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


### POST

Extends an existing subscription to a user-defined set of contacts.


#### Query parameters





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|duration|The desired length of the subscription in minutes.If this is a new subscription, the length will be used.If it is an existing subscription, the length will be added to the remaining duration. If this sum is greater than 30 minutes, 30 minutes will be used.The maximum value is 30 and the minimum value is 10.|Yes|

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
|Forbidden|403|None|The user does not have sufficient privileges to access or modify a presence subscription that was created by the system.|
|Forbidden|403|None|The user does not have sufficient privileges to modify the contact list.|
|Conflict|409|None|Conflict occurs when the resource is not in the proper state to accept the request.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples

Only server-supplied query parameters, if any, are shown in the request sample.


#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscription HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
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

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscription HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
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


### DELETE

Deletes an existing subscription to a user-defined set of contacts.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify a presence subscription that was created by the system.|

#### Examples




#### JSON Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/presenceSubscription HTTP/1.1
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

										Delete https://fe1.contoso.com:443//v1/applications/833/presenceSubscription HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```

