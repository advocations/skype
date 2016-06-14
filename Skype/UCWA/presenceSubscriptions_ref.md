
# presenceSubscriptions 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_


Represents the user's set of [presenceSubscription](presenceSubscription_ref.md) resources.

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

/// This resource can be used to create new [presenceSubscription](presenceSubscription_ref.md)s as well as to modify and delete existing ones. 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|presenceSubscription|Represents the subscription to a user-defined set of contacts.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of a collection of [presenceSubscription](presenceSubscription_ref.md) resources.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscriptions.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 443
										{
 "rel" : "presenceSubscriptions",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/presenceSubscriptions"
 }
 },
 "_embedded" : {
 "presenceSubscription" : [
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
 ]
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 631
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="presenceSubscriptions" href="//v1/applications/833/presenceSubscriptions" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">presenceSubscriptions</property>
 <resource rel="presenceSubscription" href="//v1/applications/833/presenceSubscription">
 <link rel="addToPresenceSubscription" href="//v1/applications/833/presenceSubscription/addToPresenceSubscription" />
 <link rel="memberships" href="//v1/applications/833/presenceSubscription/memberships" />
 <property name="rel">presenceSubscription</property>
 <property name="id">3</property>
 </resource>
</resource>
									
```


### POST

Creates a new subscription to a user-defined set of contacts.


#### Request body

None


#### Response body



|**Item**|**Description**|
|:-----|:-----|
| [presenceSubscription](presenceSubscription_ref.md)|Represents the subscription to a user-defined set of contacts.|

#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|The user does not have sufficient privileges to access or modify presence subscriptions.|
|Forbidden|403|LimitExceeded|The user has reached the maximum number of subscriptions that can be created.|
|Forbidden|403|None|The user does not have sufficient privileges to modify the contact list.|
|Conflict|409|None|Conflict occurs when the resource is not in the proper state to accept the request.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/json
										Accept: application/json
										Content-Length: 85
										{
 "duration" : 15,
 "uris" : [
 "\"sip : johndoe@contoso.com\"",
 "\"sip : janedoe@contoso.com\""
 ]
}
									
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

										Post https://fe1.contoso.com:443//v1/applications/833/presenceSubscriptions HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Content-Type: application/xml
										Accept: application/xml
										Content-Length: 264
										<?xml version="1.0" encoding="utf-8"?>
<input xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="duration">15</property>
 <propertyList name="uris">
 <item>"sip:johndoe@contoso.com"</item>
 <item>" sip:janedoe@contoso.com"</item>
 </propertyList>
</input>
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 201 Created
										Content-Type: application/xml
										Content-Length: 478
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="presenceSubscription" href="//v1/applications/833/presenceSubscription" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <link rel="addToPresenceSubscription" href="//v1/applications/833/presenceSubscription/addToPresenceSubscription" />
 <link rel="memberships" href="//v1/applications/833/presenceSubscription/memberships" />
 <property name="rel">presenceSubscription</property>
 <property name="id">3</property>
</resource>
									
```

