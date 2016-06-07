
# presenceSubscriptionMembership 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Represents the [presenceSubscription](presenceSubscription_ref.md) membership of a single [contact](contact_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource captures a unique pair that consists of a [contact](contact_ref.md) and a [presenceSubscription](presenceSubscription_ref.md). If a [contact](contact_ref.md) appears in multiple [presenceSubscription](presenceSubscription_ref.md)s, there will be a separate resource for each membership of this contact. An application can use this to remove a [contact](contact_ref.md) from a particular [presenceSubscription](presenceSubscription_ref.md). 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|
|presenceSubscription|Represents the subscription to a user-defined set of contacts.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the [presenceSubscription](presenceSubscription_ref.md) membership of a single [contact](contact_ref.md).


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

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 283
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
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 449
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="presenceSubscriptionMembership" href="//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="contact" href="//v1/applications/833/people/166" />
 <link rel="presenceSubscription" href="//v1/applications/833/presenceSubscription" />
 <property name="rel">presenceSubscriptionMembership</property>
</resource>
									
```


### DELETE

Removes the [contact](contact_ref.md) from the [presenceSubscription](presenceSubscription_ref.md).


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscription memberships.|

#### Examples




#### JSON Request


```

										Delete https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com HTTP/1.1
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

										Delete https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptionMemberships/ads-bes2asd,john@contoso.com HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```

