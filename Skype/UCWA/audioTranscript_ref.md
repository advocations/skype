
# audioTranscript

 **Last modified:** July 14, 2015

Represents an audio transcript within a [conversationLog](conversationLog_ref.md). 


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





|**Name**|**Description**|
|:-----|:-----|
|duration|The audio transcript's duration.|
|status|The audio transcript status.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of an audio transcript in [conversationLog](conversationLog_ref.md).


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/audioTranscript HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/json
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 238
{
"rel" : "audioTranscript",
"duration" : "samplevalue",
"status" : "Connected",
"_links" : {
"self" : {
"href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/audioTranscript"
}
}
}
									
```


#### XML Request


```
Get https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/audioTranscript HTTP/1.1
Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
Host: fe1.contoso.com
Accept: application/xml

```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```
HTTP/1.1 200 OK
Content-Type: application/xml
Content-Length: 419
<?xml version="1.0" encoding="utf-8"?>
<resource rel="audioTranscript" href="//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/audioTranscript" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
<property name="rel">audioTranscript</property>
<property name="duration">samplevalue</property>
<property name="status">Connected</property>
</resource>
									
```

