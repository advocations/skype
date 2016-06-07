
# groupMemberships

 **Last modified:** July 14, 2015

Represents a collection of all the [group](group_ref.md) memberships for a particular group


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

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|myGroupMembership|Represents the [group](group_ref.md) membership of a single [contact](contact_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns all group memberships for a particular group.


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

										Get https://fe1.contoso.com:443//v1/applications/833/groups/group/groupMemberships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 501
										{
 "rel" : "groupMemberships",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/groups/group/groupMemberships"
 }
 },
 "_embedded" : {
 "myGroupMembership" : [
 {
 "rel" : "myGroupMembership",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/myGroupMemberships/myGroupMembership"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "defaultGroup" : {
 "href" : "//v1/applications/833/groups/defaultGroup"
 },
 "group" : {
 "href" : "//v1/applications/833/groups/group"
 },
 "pinnedGroup" : {
 "href" : "//v1/applications/833/groups/pinnedGroup"
 }
 }
 }
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups/group/groupMemberships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 677
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="groupMemberships" href="//v1/applications/833/groups/group/groupMemberships" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">groupMemberships</property>
 <resource rel="myGroupMembership" href="//v1/applications/833/myGroupMemberships/myGroupMembership">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="defaultGroup" href="//v1/applications/833/groups/defaultGroup" />
 <link rel="group" href="//v1/applications/833/groups/group" />
 <link rel="pinnedGroup" href="//v1/applications/833/groups/pinnedGroup" />
 <property name="rel">myGroupMembership</property>
 </resource>
</resource>
									
```

