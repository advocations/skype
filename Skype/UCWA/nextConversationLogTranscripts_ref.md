
# nextConversationLogTranscripts

 **Last modified:** July 14, 2015

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


The (archived) messages from Exchange. 


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
|nextConversationLogTranscripts|The (archived) messages from Exchange.|
|conversationLogTranscript|Represents a transcript within a [conversationLog](conversationLog_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns the transcripts of a conversation log


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

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/nextConversationLogTranscripts HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 1614
										{
  "rel" : "nextConversationLogTranscripts",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/nextConversationLogTranscripts"
    },
    "nextConversationLogTranscripts" : {
      "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/nextConversationLogTranscripts"
    }
  },
  "_embedded" : {
    "conversationLogTranscript" : [
      {
        "rel" : "conversationLogTranscript",
        "timeStamp" : "\/Date(1436925247906)\/",
        "_links" : {
          "self" : {
            "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript"
          },
          "contact" : {
            "href" : "//v1/applications/833/people/166"
          },
          "me" : {
            "href" : "//v1/applications/833/me"
          }
        },
        "_embedded" : {
          "audioTranscript" : {
            "rel" : "audioTranscript",
            "duration" : "samplevalue",
            "status" : "Connected",
            "_links" : {
              "self" : {
                "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/audioTranscript"
              }
            }
          },
          "errorTranscript" : {
            "rel" : "errorTranscript",
            "reason" : "TranscriptionFailed",
            "_links" : {
              "self" : {
                "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/errorTranscript"
              }
            }
          },
          "messageTranscript" : {
            "rel" : "messageTranscript",
            "_links" : {
              "self" : {
                "href" : "//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/messageTranscript"
              },
              "htmlMessage" : {
                "href" : "data:text/html;base64,base64-encoded-htmlmessage"
              },
              "plainMessage" : {
                "href" : "data:text/plain;charset=utf8,URLEncodedMessageString"
              }
            }
          }
        }
      }
    ]
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/nextConversationLogTranscripts HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 1972
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;nextConversationLogTranscripts&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/nextConversationLogTranscripts&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;nextConversationLogTranscripts&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/nextConversationLogTranscripts&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;nextConversationLogTranscripts&amp;lt;/property&amp;gt;
  &amp;lt;resource rel=&amp;quot;conversationLogTranscript&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript&amp;quot;&amp;gt;
    &amp;lt;link rel=&amp;quot;contact&amp;quot; href=&amp;quot;//v1/applications/833/people/166&amp;quot; /&amp;gt;
    &amp;lt;link rel=&amp;quot;me&amp;quot; href=&amp;quot;//v1/applications/833/me&amp;quot; /&amp;gt;
    &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;conversationLogTranscript&amp;lt;/property&amp;gt;
    &amp;lt;property name=&amp;quot;timeStamp&amp;quot;&amp;gt;2015-07-14T20:54:07.9197528-05:00&amp;lt;/property&amp;gt;
    &amp;lt;resource rel=&amp;quot;audioTranscript&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/audioTranscript&amp;quot;&amp;gt;
      &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;audioTranscript&amp;lt;/property&amp;gt;
      &amp;lt;property name=&amp;quot;duration&amp;quot;&amp;gt;samplevalue&amp;lt;/property&amp;gt;
      &amp;lt;property name=&amp;quot;status&amp;quot;&amp;gt;Connected&amp;lt;/property&amp;gt;
    &amp;lt;/resource&amp;gt;
    &amp;lt;resource rel=&amp;quot;errorTranscript&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/errorTranscript&amp;quot;&amp;gt;
      &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;errorTranscript&amp;lt;/property&amp;gt;
      &amp;lt;property name=&amp;quot;reason&amp;quot;&amp;gt;TranscriptionFailed&amp;lt;/property&amp;gt;
    &amp;lt;/resource&amp;gt;
    &amp;lt;resource rel=&amp;quot;messageTranscript&amp;quot; href=&amp;quot;//v1/applications/833/communication/conversationLogs/conversationLog/conversationLogTranscripts/conversationLogTranscript/messageTranscript&amp;quot;&amp;gt;
      &amp;lt;link rel=&amp;quot;htmlMessage&amp;quot; href=&amp;quot;data:text/html;base64,base64-encoded-htmlmessage&amp;quot; /&amp;gt;
      &amp;lt;link rel=&amp;quot;plainMessage&amp;quot; href=&amp;quot;data:text/plain;charset=utf8,URLEncodedMessageString&amp;quot; /&amp;gt;
      &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;messageTranscript&amp;lt;/property&amp;gt;
    &amp;lt;/resource&amp;gt;
  &amp;lt;/resource&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

