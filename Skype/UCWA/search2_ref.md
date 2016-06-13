
# search2

 **Last modified:** July 14, 2015

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Provides a way to search for contacts. 


## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource is used to search through the address book of the user's organization. The fields searched include name, email, URI, and phone number. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|moreResultsAvailable|Indicates to clients that more search results are available than the limit setin the search query.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|distributionGroup|Represents a persistent, pre-existing group of contacts.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of search results.


#### Query parameters





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|limit|The maximum number of search results to return. Optional parameter.The maximum value is 100 and the minimum value is 1.|No|
|mail|The contact's mail address.The maximum length is 256 characters.|No|
|query|The search query string.The maximum length is 256 characters.|No|

#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to search.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples

Only server-supplied query parameters, if any, are shown in the request sample.


#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/search HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 5501
										{
 "rel" : "search",
 "moreResultsAvailable" : false,
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/search",
 "revision" : "2"
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
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/search HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 7200
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="search" href="//v1/applications/833/search" revision="2" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">search</property>
 <property name="moreResultsAvailable">False</property>
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
</resource>
									
```

