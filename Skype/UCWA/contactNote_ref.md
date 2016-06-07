
# contactNote 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

Represents a [contact](contact_ref.md)'s personal or out-of-office note. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

contactNote aggregates the user's personal and out-of-office notes into one displayable string. The out-of-office note gets displayed when set in Exchange.


### Properties





|**Name**|**Description**|
|:-----|:-----|
|message|A string representing the note text.|
|type|The note type (NoteType) gives a hint to the user as to what type of note is being displayed, either Personal or OutOfOffice.|

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
|contactNote|Medium|people|Indicates the contact's note has changed. The application may decide to fetch the updated information.|
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
 "rel" : "contactNote",
 "href" : "https://fe1.contoso.com:443//v1/applications/833/people/166/contactNote"
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

Returns a representation of a contact's note.


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

										Get https://fe1.contoso.com:443//v1/applications/833/people/166/contactNote HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 142
										{
 "rel" : "contactNote",
 "message" : "Heads down today",
 "type" : "Personal",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/people/166/contactNote"
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/people/166/contactNote HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 319
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="contactNote" href="//v1/applications/833/people/166/contactNote" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">contactNote</property>
 <property name="message">Heads down today</property>
 <property name="type">Personal</property>
</resource>
									
```

