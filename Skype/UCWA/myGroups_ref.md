
# myGroups 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_


A collection of groups in the contact list of the logged-on user. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This collection is read-only: it can be used only to view existing group resources. New groups can be created using the Skype for Business desktop client. 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|defaultGroup|Represents a persistent, system-created group where a user's contacts are placed by default.|
|distributionGroup|Represents a persistent, pre-existing group of contacts.|
|group|Represents a user's persistent, personal group.|
|pinnedGroup|Represents a system-created group of contacts that the user pins or that the user frequentlycommunicates and collaborates with.|
|distributionGroup|Represents a persistent, pre-existing group of contacts.|
|group|Represents a user's persistent, personal group.|

## Events
<a name="sectionSection2"> </a>




### added





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|group|High|people|Delivered when a roaming group is added to my groups.|
|defaultGroup|Low|people|Delivered when a default group is added to my groups.|
|pinnedGroup|Low|people|Delivered when a pinned group is added to my groups.|
|distributionGroup|High|people|Delivered when a distribution group is added to my groups.|
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
 "rel" : "distributionGroup",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup"
 },
 "in" : {
 "rel" : "myGroups",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/groups"
 },
 "type" : "added"
 }
 ]
 }
 ]
}
					
```


### deleted





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|group|High|people|Delivered when a roaming group is deleted from my groups.|
|defaultGroup|Low|people|Delivered when a default group is deleted from my groups.|
|pinnedGroup|Low|people|Delivered when a pinned group is deleted from my groups.|
|distributionGroup|High|people|Delivered when a distribution group is deleted from my groups.|
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
 "rel" : "distributionGroup",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/groups/distributionGroup"
 },
 "in" : {
 "rel" : "myGroups",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/groups"
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

Returns a representation of the collection of groups in embedded or link form. The default returns them in embedded form.


#### Query parameters





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|expand|Optional query parameter to override default behavior when returning a collection of groups. Bydefault, a collection of all groups will be returned with each group embedded inside. If thisquery parameter is set to "false" then the collection of groups will be returned with just links.|No|

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

Only server-supplied query parameters, if any, are shown in the request sample.


#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 5108
										{
 "rel" : "myGroups",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/groups"
 },
 "distributionGroup" : [
 {
 "href" : "//v1/applications/833/groups/distributionGroup"
 }
 ],
 "group" : [
 {
 "href" : "//v1/applications/833/groups/group"
 }
 ],
 "defaultGroup" : {
 "href" : "//v1/applications/833/groups/defaultGroup"
 },
 "pinnedGroup" : {
 "href" : "//v1/applications/833/groups/pinnedGroup"
 }
 },
 "_embedded" : {
 "distributionGroup" : [
 {
 "rel" : "distributionGroup",
 "uri" : "sip:mypersonalgroup@contoso.com",
 "id" : "7",
 "name" : "MyPersonalGroup",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/groups/distributionGroup"
 },
 "addToContactList" : {
 "href" : "//v1/applications/833/groups/addToContactList"
 },
 "expandDistributionGroup" : {
 "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
 },
 "groupContacts" : {
 "href" : "//v1/applications/833/contacts"
 },
 "removeFromContactList" : {
 "href" : "//v1/applications/833/groups/removeFromContactList"
 },
 "subscribeToGroupPresence" : {
 "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
 }
 },
 "_embedded" : {
 "contact" : [
 {
 "rel" : "contact",
 "company" : "Contoso Corp.",
 "department" : "Engineering",
 "emailAddresses" : [
 "Alex.Doe@contoso.com"
 ],
 "homePhoneNumber" : "tel:+19185550107",
 "sourceNetworkIconUrl" : "https://images.contoso.com/logo_16x16.png",
 "mobilePhoneNumber" : "tel:4255551212;phone-context=defaultprofile",
 "name" : "Alex Doe",
 "office" : "tel:+1425554321;ext=54321",
 "otherPhoneNumber" : "tel:+19195558194",
 "sourceNetwork" : "SameEnterprise",
 "title" : "Engineer 2",
 "type" : "User",
 "uri" : "sip:alex@contoso.com",
 "workPhoneNumber" : "tel:+1425554321;ext=54321",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/people/166"
 },
 "contactLocation" : {
 "href" : "//v1/applications/833/people/166/contactLocation"
 },
 "contactNote" : {
 "href" : "//v1/applications/833/people/166/contactNote"
 },
 "contactPhoto" : {
 "href" : "//v1/applications/833/people/166/contactPhoto"
 },
 "contactPresence" : {
 "href" : "//v1/applications/833/people/166/contactPresence"
 },
 "contactPrivacyRelationship" : {
 "href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
 },
 "contactSupportedModalities" : {
 "href" : "//v1/applications/833/people/166/contactSupportedModalities"
 }
 }
 }
 ],
 "distributionGroup" : [
 {
 "rel" : "distributionGroup",
 "uri" : "sip:mypersonalgroup@contoso.com",
 "id" : "7",
 "name" : "MyPersonalGroup",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/groups/distributionGroup"
 },
 "addToContactList" : {
 "href" : "//v1/applications/833/groups/addToContactList"
 },
 "expandDistributionGroup" : {
 "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
 },
 "groupContacts" : {
 "href" : "//v1/applications/833/contacts"
 },
 "removeFromContactList" : {
 "href" : "//v1/applications/833/groups/removeFromContactList"
 },
 "subscribeToGroupPresence" : {
 "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
 }
 },
 "_embedded" : {
 "contact" : [
 {
 "rel" : "contact",
 "company" : "Contoso Corp.",
 "department" : "Engineering",
 "emailAddresses" : [
 "Alex.Doe@contoso.com"
 ],
 "homePhoneNumber" : "tel:+19185550107",
 "sourceNetworkIconUrl" : "https://images.contoso.com/logo_16x16.png",
 "mobilePhoneNumber" : "tel:4255551212;phone-context=defaultprofile",
 "name" : "Alex Doe",
 "office" : "tel:+1425554321;ext=54321",
 "otherPhoneNumber" : "tel:+19195558194",
 "sourceNetwork" : "SameEnterprise",
 "title" : "Engineer 2",
 "type" : "User",
 "uri" : "sip:alex@contoso.com",
 "workPhoneNumber" : "tel:+1425554321;ext=54321",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/people/166"
 },
 "contactLocation" : {
 "href" : "//v1/applications/833/people/166/contactLocation"
 },
 "contactNote" : {
 "href" : "//v1/applications/833/people/166/contactNote"
 },
 "contactPhoto" : {
 "href" : "//v1/applications/833/people/166/contactPhoto"
 },
 "contactPresence" : {
 "href" : "//v1/applications/833/people/166/contactPresence"
 },
 "contactPrivacyRelationship" : {
 "href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
 },
 "contactSupportedModalities" : {
 "href" : "//v1/applications/833/people/166/contactSupportedModalities"
 }
 }
 }
 ],
 "distributionGroup" : [
 {
 "rel" : "distributionGroup",
 "uri" : "sip:mypersonalgroup@contoso.com",
 "id" : "7",
 "name" : "MyPersonalGroup",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/groups/distributionGroup"
 },
 "addToContactList" : {
 "href" : "//v1/applications/833/groups/addToContactList"
 },
 "expandDistributionGroup" : {
 "href" : "//v1/applications/833/groups/distributionGroup/expandDistributionGroup"
 },
 "groupContacts" : {
 "href" : "//v1/applications/833/contacts"
 },
 "removeFromContactList" : {
 "href" : "//v1/applications/833/groups/removeFromContactList"
 },
 "subscribeToGroupPresence" : {
 "href" : "//v1/applications/833/groups/group/subscribeToGroupPresence"
 }
 },
 "_embedded" : {
 "contact" : [
 {
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/people/166"
 }
 }
 }
 ],
 "distributionGroup" : [
 {
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/groups/distributionGroup"
 }
 }
 }
 ]
 }
 }
 ]
 }
 }
 ]
 }
 }
 ],
 "group" : [
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
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/groups HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 6503
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="myGroups" href="//v1/applications/833/groups" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup" />
 <link rel="group" href="//v1/applications/833/groups/group" />
 <link rel="defaultGroup" href="//v1/applications/833/groups/defaultGroup" />
 <link rel="pinnedGroup" href="//v1/applications/833/groups/pinnedGroup" />
 <property name="rel">myGroups</property>
 <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup">
 <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
 <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
 <link rel="groupContacts" href="//v1/applications/833/contacts" />
 <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
 <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
 <property name="rel">distributionGroup</property>
 <property name="uri">sip:mypersonalgroup@contoso.com</property>
 <property name="id">7</property>
 <property name="name">MyPersonalGroup</property>
 <resource rel="contact" href="//v1/applications/833/people/166">
 <link rel="contactLocation" href="//v1/applications/833/people/166/contactLocation" />
 <link rel="contactNote" href="//v1/applications/833/people/166/contactNote" />
 <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
 <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
 <link rel="contactPrivacyRelationship" href="//v1/applications/833/people/166/contactPrivacyRelationship" />
 <link rel="contactSupportedModalities" href="//v1/applications/833/people/166/contactSupportedModalities" />
 <property name="rel">contact</property>
 <property name="company">Contoso Corp.</property>
 <property name="department">Engineering</property>
 <propertyList name="emailAddresses">
 <item>Alex.Doe@contoso.com</item>
 </propertyList>
 <property name="homePhoneNumber">tel:+19185550107</property>
 <property name="sourceNetworkIconUrl">https://images.contoso.com/logo_16x16.png</property>
 <property name="mobilePhoneNumber">tel:4255551212;phone-context=defaultprofile</property>
 <property name="name">Alex Doe</property>
 <property name="office">tel:+1425554321;ext=54321</property>
 <property name="otherPhoneNumber">tel:+19195558194</property>
 <property name="sourceNetwork">SameEnterprise</property>
 <property name="title">Engineer 2</property>
 <property name="type">User</property>
 <property name="uri">sip:alex@contoso.com</property>
 <property name="workPhoneNumber">tel:+1425554321;ext=54321</property>
 </resource>
 <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup">
 <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
 <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
 <link rel="groupContacts" href="//v1/applications/833/contacts" />
 <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
 <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
 <property name="rel">distributionGroup</property>
 <property name="uri">sip:mypersonalgroup@contoso.com</property>
 <property name="id">7</property>
 <property name="name">MyPersonalGroup</property>
 <resource rel="contact" href="//v1/applications/833/people/166">
 <link rel="contactLocation" href="//v1/applications/833/people/166/contactLocation" />
 <link rel="contactNote" href="//v1/applications/833/people/166/contactNote" />
 <link rel="contactPhoto" href="//v1/applications/833/people/166/contactPhoto" />
 <link rel="contactPresence" href="//v1/applications/833/people/166/contactPresence" />
 <link rel="contactPrivacyRelationship" href="//v1/applications/833/people/166/contactPrivacyRelationship" />
 <link rel="contactSupportedModalities" href="//v1/applications/833/people/166/contactSupportedModalities" />
 <property name="rel">contact</property>
 <property name="company">Contoso Corp.</property>
 <property name="department">Engineering</property>
 <propertyList name="emailAddresses">
 <item>Alex.Doe@contoso.com</item>
 </propertyList>
 <property name="homePhoneNumber">tel:+19185550107</property>
 <property name="sourceNetworkIconUrl">https://images.contoso.com/logo_16x16.png</property>
 <property name="mobilePhoneNumber">tel:4255551212;phone-context=defaultprofile</property>
 <property name="name">Alex Doe</property>
 <property name="office">tel:+1425554321;ext=54321</property>
 <property name="otherPhoneNumber">tel:+19195558194</property>
 <property name="sourceNetwork">SameEnterprise</property>
 <property name="title">Engineer 2</property>
 <property name="type">User</property>
 <property name="uri">sip:alex@contoso.com</property>
 <property name="workPhoneNumber">tel:+1425554321;ext=54321</property>
 </resource>
 <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup">
 <link rel="addToContactList" href="//v1/applications/833/groups/addToContactList" />
 <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
 <link rel="groupContacts" href="//v1/applications/833/contacts" />
 <link rel="removeFromContactList" href="//v1/applications/833/groups/removeFromContactList" />
 <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
 <property name="rel">distributionGroup</property>
 <property name="uri">sip:mypersonalgroup@contoso.com</property>
 <property name="id">7</property>
 <property name="name">MyPersonalGroup</property>
 <resource rel="contact" href="//v1/applications/833/people/166" />
 <resource rel="distributionGroup" href="//v1/applications/833/groups/distributionGroup" />
 </resource>
 </resource>
 </resource>
 <resource rel="group" href="//v1/applications/833/groups/group">
 <link rel="expandDistributionGroup" href="//v1/applications/833/groups/distributionGroup/expandDistributionGroup" />
 <link rel="groupContacts" href="//v1/applications/833/contacts" />
 <link rel="groupMemberships" href="//v1/applications/833/groups/group/groupMemberships" />
 <link rel="subscribeToGroupPresence" href="//v1/applications/833/groups/group/subscribeToGroupPresence" />
 <property name="rel">group</property>
 <property name="id">7</property>
 <property name="name">MyPersonalGroup</property>
 </resource>
</resource>
									
```

