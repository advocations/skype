
# resetContactPrivacyRelationship

 **Last modified:** July 14, 2015

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Resets a contact's privacy relationship 


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

None


## Operations
<a name="sectionSection2"> </a>




### POST

Resets a contact's privacy relationship.


#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Indicates that the user does not have privileges to update privacy relationship data for this contact.|
|Forbidden|403|None|The user does not have sufficient privileges to modify the contact list.|
|Conflict|409|None|Conflict occurs when the resource is not in the proper state to accept the request.|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Post https://fe1.contoso.com:443//v1/applications/833/people/166/contactPrivacyRelationship/resetContactPrivacyRelationship HTTP/1.1
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

										Post https://fe1.contoso.com:443//v1/applications/833/people/166/contactPrivacyRelationship/resetContactPrivacyRelationship HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 204 No Content
										
									
```

