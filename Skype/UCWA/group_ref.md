
# group 


 _**Applies to:** Skype for Business 2015_

Represents a user's persistent, personal group. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

An application can subscribe to updates from members of this group. Updates include [presence](presence_ref.md), [location](location_ref.md), or [note](note_ref.md) changes for a specific contact. Currently, group is a read-only resource and can be managed by other endpoints. An application must call [startOrRefreshSubscriptionToContactsAndGroups](startOrRefreshSubscriptionToContactsAndGroups_ref.md) before it can receive events when a group is created, modified, or removed.


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
|expandDistributionGroup|Expands a distribution group and returns the set of [contact](contact_ref.md) resources it contains.|
|groupContacts|A collection of contact resources that belong to a particular group resource.|
|groupMemberships|Represents a collection of all the [group](group_ref.md) memberships for a particular group|
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
 
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
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
 
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

 HTTP/1.1 200 OK
 Content-Type: application/xml
 Content-Length: 662
 <?xml version="1.0" encoding="utf-8"?>
<resource rel="group" href="//v1/applications/833/groups/group" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
 <link rel="groupContacts" href="//v1/applications/833/contacts" />
 <link rel="groupMemberships" href="//v1/applications/833/groups/group/groupMemberships" />
 <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
 <property name="rel">group</property>
 <property name="id">7</property>
 <property name="name">MyPersonalGroup</property>
</resource>
									
```

