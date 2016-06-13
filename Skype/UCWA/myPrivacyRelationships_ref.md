
# myPrivacyRelationships 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Represents the various privacy relationships that the user maintains with his or her contacts. 

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
|myPrivacyRelationship|Represents a set of contacts that have a given privacy relationship with the user.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the various privacy relationships that the user maintains with his or her contacts.


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

										Get https://fe1.contoso.com:443//v1/applications/833/myPrivacyRelationships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 362
										{
 "rel" : "myPrivacyRelationships",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/myPrivacyRelationships"
 }
 },
 "_embedded" : {
 "myPrivacyRelationship" : [
 {
 "rel" : "myPrivacyRelationship",
 "relationshipLevel" : "Workgroup",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/myPrivacyRelationships/myPrivacyRelationship"
 },
 "contact" : [
 {
 "href" : "//v1/applications/833/people/661"
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

										Get https://fe1.contoso.com:443//v1/applications/833/myPrivacyRelationships HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 540
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="myPrivacyRelationships" href="//v1/applications/833/myPrivacyRelationships" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">myPrivacyRelationships</property>
 <resource rel="myPrivacyRelationship" href="//v1/applications/833/myPrivacyRelationships/myPrivacyRelationship">
 <link rel="contact" href="//v1/applications/833/people/690" />
 <property name="rel">myPrivacyRelationship</property>
 <property name="relationshipLevel">External</property>
 </resource>
</resource>
									
```

