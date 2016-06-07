
# memberships 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


The memberships resource. 

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
|presenceSubscriptionMembership|Represents the [presenceSubscription](presenceSubscription_ref.md) membership of a single [contact](contact_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Operation description coming soon...


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscription memberships.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscription/memberships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 457
										{
 "rel" : "presenceSubscriptionMemberships",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/presenceSubscriptionMemberships"
 }
 },
 "_embedded" : {
 "presenceSubscriptionMembership" : [
 {
 "rel" : "presenceSubscriptionMembership",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "presenceSubscription" : {
 "href" : "//v1/applications/833/presenceSubscription"
 }
 }
 }
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscription/memberships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 632
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="presenceSubscriptionMemberships" href="//v1/applications/833/presenceSubscriptionMemberships" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">presenceSubscriptionMemberships</property>
 <resource rel="presenceSubscriptionMembership" href="//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="presenceSubscription" href="//v1/applications/833/presenceSubscription" />
 <property name="rel">presenceSubscriptionMembership</property>
 </resource>
</resource>
									
```


### POST

Operation description coming soon...


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [presenceSubscriptionMemberships](presenceSubscriptionMemberships_ref.md)|A collection of [presenceSubscriptionMembership](presenceSubscriptionMembership_ref.md) resources.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscription memberships.|
|Forbidden|403|LimitExceeded|The subscription limit was exceeded.|
|Forbidden|403|None|The user does not have sufficient privileges to modify the contact list.|
|Conflict|409|None|Conflict occurs when the resource is not in the proper state to accept the request.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscription/memberships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										Accept: application/json
										Content-Length: 77
										{
 "contactUris" : [
 "\"sip : user2@microsoft.com\"",
 "\"sip : user3@microsoft.com\""
 ]
}
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Content-Type: application/json
										Content-Length: 457
										{
 "rel" : "presenceSubscriptionMemberships",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/presenceSubscriptionMemberships"
 }
 },
 "_embedded" : {
 "presenceSubscriptionMembership" : [
 {
 "rel" : "presenceSubscriptionMembership",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com"
 },
 "contact" : {
 "href" : "//v1/applications/833/people/166"
 },
 "presenceSubscription" : {
 "href" : "//v1/applications/833/presenceSubscription"
 }
 }
 }
 ]
 }
}
									
```


#### XML Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscription/memberships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Accept: application/xml
										Content-Length: 231
										<?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <propertyList name="contactUris">
 <item>"sip:user2@microsoft.com"</item>
 <item>"sip:user3@microsoft.com"</item>
 </propertyList>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Content-Type: application/xml
										Content-Length: 632
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="presenceSubscriptionMemberships" href="//v1/applications/833/presenceSubscriptionMemberships" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">presenceSubscriptionMemberships</property>
 <resource rel="presenceSubscriptionMembership" href="//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="presenceSubscription" href="//v1/applications/833/presenceSubscription" />
 <property name="rel">presenceSubscriptionMembership</property>
 </resource>
</resource>
									
```

