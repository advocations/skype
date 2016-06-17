
# contactPrivacyRelationship 


 _**Applies to:** Skype for Business 2015_

Represents the privacy relationship between the user and a [contact](contact_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

This resource captures the closeness of the relationship, with more information available in closer relationships. FriendsAndFamily contacts see appointment and meeting titles, while Colleagues see only Free or Busy. If an application has subscribed to a contact, events will be raised when a contact's privacy relationship changes. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|relationshipLevel|The relationship level (PrivacyRelationshipLevel) between the user and a contact, such as Colleagues or FriendsAndFamily.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Events
<a name="sectionSection2"> </a>




### updated





|**Resource**|**Priority**|**Sender**|**Reason**|
|:-----|:-----|:-----|:-----|
|contactPrivacyRelationship|Medium|people|Indicates that the contact's privacy relationship has changed. The application may decide to fetch the updated information.|
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
 "rel" : "contactPrivacyRelationship",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166/contactPrivacyRelationship"
 },
 "in" : {
 "rel" : "contact",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166"
 },
 "type" : "updated"
 }
 ]
 }
 ]
}
					
```


## Operations
<a name="sectionSection3"> </a>




### GET

Returns a representation of a privacy relationship between a contact and the logged-in user.


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
Get https://fe1.contoso.com:443//v1/applications/833/people/166/contactPrivacyRelationship HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156
{
"rel" : "contactPrivacyRelationship",
"relationshipLevel" : "External",
"_links" : {
"self" : {
"href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
}
}
}

```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/people/166/contactPrivacyRelationship HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml

```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 327
<?xml version="1.0" encoding="utf-8"?>
<resource rel="contactPrivacyRelationship" href="//v1/applications/833/people/166/contactPrivacyRelationship" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="rel">contactPrivacyRelationship</property>
<property name="relationshipLevel">Colleagues</property>
</resource>
									
```

