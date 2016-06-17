
# simultaneousRingToContact 


 _**Applies to:** Skype for Business 2015_

Simultaneously send all incoming calls to a user-provided number or contact in addition to the user.

## Web link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The presence of this resource indicates that the user can have her calls simultaneously ring at the number or contact of her choosing. The calls ring for the user as well as the target.


### Properties

None


### Links

None


## Operations
<a name="sectionSection2"> </a>




### POST

Simultaneously send all incoming calls to a user-provided number or contact in addition to the user.


#### Query parameters





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|target|The number or contact that the user wants to receive her calls simultaneously. If the target is a number, the application should provide a tel URI, which is provided by the contact. If the target is a contact, the application should provide a sip URI, which is provided by the contact. The maximum length of this input is 80 characters.The maximum length is 80 characters.|Yes|

#### Request body





|**Name**|**Description**|**Required?**|
|:-----|:-----|:-----|
|target|The number or contact that the user wants to receive her calls simultaneously. If the target is a number, the application should provide a tel URI, which is provided by the contact. If the target is a contact, the application should provide a sip URI, which is provided by the contact. The maximum length of this input is 80 characters.The maximum length is 80 characters.|Yes|

#### Response body

None


#### Synchronous errors

The errors below, if any, are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Indicates that the user is not enabled for enterprise voice or simultaneous ring.|

#### Examples




#### JSON Request


```
Post https://fe1.contoso.com:443/ucwa/v1/applications/543/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToContact HTTP/1.1
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
Post https://fe1.contoso.com:443/ucwa/v1/applications/543/me/callForwardingSettings/simultaneousRingSettings/simultaneousRingToContact HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 204 No Content
```

