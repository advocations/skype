
# group2

 **Last modified:** July 14, 2015

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Events](#sectionSection2)
[Operations](#sectionSection3)


Represents a user's persistent, personal group version two. 


## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

An application can subscribe to updates from members of this group. Updates include [presence (UCWA)](presence_ref.md), [location (UCWA)](location_ref.md), or [note (UCWA)](note_ref.md) changes for a specific contact. An application must call[startOrRefreshSubscriptionToContactsAndGroups (UCWA)](startOrRefreshSubscriptionToContactsAndGroups_ref.md) before it can receive events when a group is created, modified, or removed.


### Properties





|**Name**|**Description**|
|:-----|:-----|
|id|The group's ID.|
|name|The group's name.The maximum length is 256 characters.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|expandDistributionGroup|Expands a distribution group and returns the set of [contact (UCWA)](contact_ref.md) resources it contains.|
|groupContacts|A collection of contact resources that belong to a particular group resource.|
|groupMemberships|Represents a collection of all the [group (UCWA)](group_ref.md) memberships for a particular group|
|subscribeToGroupPresence|Subscribes to the presence information of all the contacts in a particular group.|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|contact|High|people|Indicates that a specific contact was added to this group. The application can decide to fetchthe updated information.|
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
            "rel" : "contact",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166"
          },
          "in" : {
            "rel" : "group",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/group"
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
|group|High|people|Indicates that the group has been updated. The application can decide to fetch the updatedinformation.|
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
            "rel" : "group",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/group"
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
|contact|High|people|Indicates that a specific contact was deleted from this group. The application can decide tofetch the updated information.|
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
            "rel" : "contact",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166"
          },
          "in" : {
            "rel" : "group",
            "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/group"
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

Returns a representation of a user's persistent, personal group.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups/group HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: 9b6e9824-3b5d-46e7-b3bf-47ce22a8f982
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: e5d7baae-5276-4996-9b15-ef725bcaf50c
										Content-Type: application/json
										Content-Length: 459
										{
  "rel" : "group",
  "id" : "7",
  "name" : "MyPersonalGroup",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/groups/group"
    },
    "expandDistributionGroup" : {
      "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
    },
    "groupContacts" : {
      "href" : "//v1/applications/833/contacts"
    },
    "groupMemberships" : {
      "href" : "//v1/applications/833/groups/group/groupMemberships"
    },
    "subscribeToGroupPresence" : {
      "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups/group HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 6693be57-3a7b-4083-b44e-da1f572b898e
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 59b5d50f-0b82-4cea-ad0d-14971b941a48
										Content-Type: application/xml
										Content-Length: 662
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;group&amp;quot; href=&amp;quot;//v1/applications/833/groups/group&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;expandDistributionGroup&amp;quot; href=&amp;quot;//v1/applications/833/groups/distributionGroup/expandDistributionGroup&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;groupContacts&amp;quot; href=&amp;quot;//v1/applications/833/contacts&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;groupMemberships&amp;quot; href=&amp;quot;//v1/applications/833/groups/group/groupMemberships&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;subscribeToGroupPresence&amp;quot; href=&amp;quot;//v1/applications/833/groups/group/subscribeToGroupPresence&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;group&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;7&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;name&amp;quot;&amp;gt;MyPersonalGroup&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


### DELETE

Deletes group


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).


#### Examples




#### JSON Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/groups/group HTTP/1.1
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

										Delete https://fe1.contoso.com:443//v1/applications/833/groups/group HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```


### PUT

Updates a group


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|

#### Examples




#### JSON Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/groups/group HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										if-match: 700e3ff6-41d0-4637-87e4-794a8d6e9053
										Content-Length: 49
										{
  "rel" : "group",
  "id" : "7",
  "name" : "MyPersonalGroup"
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```


#### XML Request


```

										Put https://fe1.contoso.com:443//v1/applications/833/groups/group HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										if-match: 5d7a779d-f5f0-4833-a0e1-268838134b60
										Content-Length: 230
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;group&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;id&amp;quot;&amp;gt;7&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;name&amp;quot;&amp;gt;MyPersonalGroup&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										
									
```

