
# addToContactList

 **Last modified:** July 14, 2015

Adds a [distributionGroup](distributionGroup_ref.md) into contact list.


## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

 The AddToContactList resource can be used to add a [distributionGroup](distributionGroup_ref.md) into contact list.


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Adds a [distributionGroup](distributionGroup_ref.md) into contact list.


#### Query parameters





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|displayName|Distribution group display nameThe maximum length is 256 characters.|Yes|
|smtpAddress|Distribution group SMTP address|Yes|

#### Request body

None


#### Response body

None


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|CallbackChannelError|The remote event channel is not reachable|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples

Only server-supplied query parameters, if any, are shown in the request sample.


#### JSON Request


```
Post https://fe1.contoso.com:443//v1/applications/833/groups/addToContactList HTTP/1.1
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
Post https://fe1.contoso.com:443//v1/applications/833/groups/addToContactList HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 204 No Content
								
```

