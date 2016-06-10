
# onlineMeetings (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the dashboard for viewing and scheduling online meetings. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The onlineMeetings resource exposes the meetings and settings available to the user, including the ability to create a new [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md). 


### Properties

None


### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|myAssignedOnlineMeeting|Represents a user's [onlineMeeting (UCWA)](onlineMeeting_ref.md) that is commonly used for scheduled meetings with other[contact (UCWA)](contact_ref.md)s.|
|myOnlineMeetings|Represents the set of [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md)s currently on the user's calendar.|
|onlineMeetingDefaultValues|Represents the values of [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md) properties if not specified at scheduling time.|
|onlineMeetingEligibleValues|Represents the eligible values that the application can choose from when scheduling a [myOnlineMeeting (UCWA)](myOnlineMeeting_ref.md).|
|onlineMeetingInvitationCustomization|Represents the recommended custom values to use when an [onlineMeetingInvitation (UCWA)](onlineMeetingInvitation_ref.md) is sent.|
|onlineMeetingPolicies|Represents the admin policies for the user's online meetings ([myOnlineMeetings (UCWA)](myOnlineMeetings_ref.md)).|
|phoneDialInInformation|Represents phone access information for an [onlineMeeting (UCWA)](onlineMeeting_ref.md).|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the dashboard for viewing and scheduling online meetings.


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

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 793
										{
  "rel" : "onlineMeetings",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/onlineMeetings"
    },
    "myAssignedOnlineMeeting" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings/318"
    },
    "myOnlineMeetings" : {
      "href" : "//v1/applications/833/onlineMeetings/myOnlineMeetings"
    },
    "onlineMeetingDefaultValues" : {
      "href" : "//v1/applications/833/onlineMeetings/onlineMeetingDefaultValues"
    },
    "onlineMeetingEligibleValues" : {
      "href" : "//v1/applications/833/onlineMeetings/onlineMeetingEligibleValues"
    },
    "onlineMeetingInvitationCustomization" : {
      "href" : "//v1/applications/833/onlineMeetings/onlineMeetingInvitationCustomization"
    },
    "onlineMeetingPolicies" : {
      "href" : "//v1/applications/833/onlineMeetings/onlineMeetingPolicies"
    },
    "phoneDialInInformation" : {
      "href" : "//v1/applications/833/onlineMeetings/phoneDialInInformation"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/onlineMeetings HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 983
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;onlineMeetings&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;myAssignedOnlineMeeting&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings/318&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;myOnlineMeetings&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/myOnlineMeetings&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingDefaultValues&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/onlineMeetingDefaultValues&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingEligibleValues&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/onlineMeetingEligibleValues&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingInvitationCustomization&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/onlineMeetingInvitationCustomization&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;onlineMeetingPolicies&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/onlineMeetingPolicies&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;phoneDialInInformation&amp;quot; href=&amp;quot;//v1/applications/833/onlineMeetings/phoneDialInInformation&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;onlineMeetings&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

