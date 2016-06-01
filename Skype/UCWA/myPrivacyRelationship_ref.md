
# myPrivacyRelationship (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents a set of contacts that have a given privacy relationship with the user. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The resource gives a view of the contacts that were assigned this privacy relationship as seen in [contactPrivacyRelationship (UCWA)](contactPrivacyRelationship_ref.md). 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|relationshipLevel|The relationship level (PrivacyRelationshipLevel) between the user and these contacts, such as Colleagues or FriendsAndFamily.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contact|Represents a person or service that the user can communicate and collaborate with.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the set of contacts that have a given privacy relationship with the user.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Indicates that the user does not have privileges to view privacy relationship data for this contact.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/myPrivacyRelationships/myPrivacyRelationship HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 222
										{
  "rel" : "myPrivacyRelationship",
  "relationshipLevel" : "FriendsAndFamily",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/myPrivacyRelationships/myPrivacyRelationship"
    },
    "contact" : [
      {
        "href" : "//v1/applications/833/people/637"
      }
    ]
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/myPrivacyRelationships/myPrivacyRelationship HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 392
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;myPrivacyRelationship&amp;quot; href=&amp;quot;//v1/applications/833/myPrivacyRelationships/myPrivacyRelationship&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;contact&amp;quot; href=&amp;quot;//v1/applications/833/people/747&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;myPrivacyRelationship&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;relationshipLevel&amp;quot;&amp;gt;FriendsAndFamily&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

