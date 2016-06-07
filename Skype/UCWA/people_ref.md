
# people 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


A hub for the people with whom the logged-on user can communicate, using Skype for Business. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource provides access to resources that enable the logged-on user to find, organize, communicate with, and subscribe to the presence of other people. 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|myContactsAndGroupsSubscription|Represents the subscription to a user's contacts and groups.|
|myContacts|A collection of contact resources that belong to the logged-on user.|
|myGroupMemberships|A collection of groupMembership resources, each of which uniquely links a contact to a group.|
|myGroups|A collection of groups in the contact list of the logged-on user.|
|myPrivacyRelationships|Represents the various privacy relationships that the user maintains with his or her contacts.|
|presenceSubscriptionMemberships|A collection of [presenceSubscriptionMembership](presenceSubscriptionMembership_ref.md) resources.|
|presenceSubscriptions|Represents the user's set of [presenceSubscription](presenceSubscription_ref.md) resources.|
|search|Provides a way to search for contacts.|
|subscribedContacts|A collection of contacts for which the logged-on user has created active presence subscriptions.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the hub for the people with whom the logged-on user can communicate, using Skype for Business.


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

										Get https://fe1.contoso.com:443//v1/applications/833/people HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 740
										{
 "rel" : "people",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/people"
 },
 "myContactsAndGroupsSubscription" : {
 "href" : "//v1/applications/833/people/myContactsAndGroupsSubscription"
 },
 "myContacts" : {
 "href" : "//v1/applications/833/contacts"
 },
 "myGroupMemberships" : {
 "href" : "//v1/applications/833/myGroupMemberships"
 },
 "myGroups" : {
 "href" : "//v1/applications/833/groups"
 },
 "myPrivacyRelationships" : {
 "href" : "//v1/applications/833/myPrivacyRelationships"
 },
 "presenceSubscriptionMemberships" : {
 "href" : "//v1/applications/833/presenceSubscriptionMemberships"
 },
 "presenceSubscriptions" : {
 "href" : "//v1/applications/833/presenceSubscriptions"
 },
 "search" : {
 "href" : "//v1/applications/833/search"
 },
 "subscribedContacts" : {
 "href" : "//v1/applications/833/subscribedContacts"
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/people HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 938
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="people" href="//v1/applications/833/people" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="myContactsAndGroupsSubscription" href="//v1/applications/833/people/myContactsAndGroupsSubscription" />
 <link rel="myContacts" href="//v1/applications/833/contacts" />
 <link rel="myGroupMemberships" href="//v1/applications/833/myGroupMemberships" />
 <link rel="myGroups" href="//v1/applications/833/groups" />
 <link rel="myPrivacyRelationships" href="//v1/applications/833/myPrivacyRelationships" />
 <link rel="presenceSubscriptionMemberships" href="//v1/applications/833/presenceSubscriptionMemberships" />
 <link rel="presenceSubscriptions" href="//v1/applications/833/presenceSubscriptions" />
 <link rel="search" href="//v1/applications/833/search" />
 <link rel="subscribedContacts" href="//v1/applications/833/subscribedContacts" />
 <property name="rel">people</property>
</resource>
									
```

