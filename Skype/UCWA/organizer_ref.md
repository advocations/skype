
# organizer 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_


Represents the organizer of the online meeting. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This represents the [contact](contact_ref.md) who organized the corresponding online meeting.


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the organizer of the online meeting.


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting/organizer HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: d423e123-f9e1-45d3-93f1-af4fdbd6badd
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 81197869-ca47-4c83-9d54-e38e023d55f3
										Content-Type: application/json
										Content-Length: 1078
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
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversations/802/onlineMeeting/organizer HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: f48c6e45-3d1a-4ce1-8009-45038653e110
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 20f4169a-e9bc-4b18-b402-9c0472821c96
										Content-Type: application/xml
										Content-Length: 1594
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="contact" href="//v1/applications/833/people/166" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
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
									
```

