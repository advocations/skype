
# to (UCWA)

 **Last modified:** July 14, 2015

 _ **Applies to:** Skype for Business 2015_

 **In this article**
[Web Link](#sectionSection0)
[Resource description](#sectionSection1)
[Operations](#sectionSection2)


Represents the originally intended target of the invitation as a [contact (UCWA)](contact_ref.md). 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

The resource is present in both incoming and outgoing invitations. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|company|The name of the contact's company.|
|department|The name of the contact's department.|
|emailAddresses|The contact's e-mail addresses.|
|homePhoneNumber|The contact's home phone number.|
|sourceNetworkIconUrl|The web URI of the icon representing the contact's source network.|
|mobilePhoneNumber|The contact's mobile phone number.|
|name|The contact's name.|
|office|The contact's office number.|
|otherPhoneNumber|The contact's other phone number.|
|sourceNetwork|The contact's source network (SourceNetwork), such as SameEnterprise or PublicCloud (such as a Skype contact).|
|title|The contact's title.|
|type|The contact's type (ContactType), such as User, Phone, or Bot.|
|uri|The contact's URI.|
|workPhoneNumber|The contact's work phone number.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|
|contactLocation|Represents a [contact (UCWA)](contact_ref.md)'s location.|
|contactNote|Represents a [contact (UCWA)](contact_ref.md)'s personal or out-of-office note.|
|contactPhoto|The photo of a contact.|
|contactPresence|Represents a [contact (UCWA)](contact_ref.md)'s availability and activity.|
|contactPrivacyRelationship|Represents the privacy relationship between the user and a [contact (UCWA)](contact_ref.md).|
|contactSupportedModalities|Represents the communication modalities supported by a contact.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the [contact (UCWA)](contact_ref.md) that the invitation is originally intended for.


#### Request body

None


#### Response body

The response from a GET request contains the properties and links shown in the Properties and Links sections at the top of this page.


#### Synchronous errors

The errors below (if any) are specific to this resource. Generic errors that can apply to any resource are covered in [Generic synchronous errors](GenericSynchronousErrors.md).



|**Error**|**Code**|**Subcode**|**Description**|
|:-----|:-----|:-----|:-----|
|Forbidden|403|None|Returned when an application does not have permission to view this contact's information.|
|Forbidden|403|None|The user does not have sufficient privileges to access the contact list.|
|ServiceFailure|500|InvalidExchangeServerVersion|Invalid exchange server version.The exchange mailbox of the server might have moved to an unsupported version for the required feature.|
|Conflict|409|AlreadyExists|The already exists error.|
|Conflict|409|TooManyGroups|The too many groups error.|
|Conflict|409|None|Un-supported Service/Resource/API error.|

#### Examples




#### JSON Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/people/922 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										if-none-match: 8b0ae2ea-9024-484c-ab1e-55859830458d
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 9ad3f210-1df1-476b-8cd7-864dfba78521
										Content-Type: application/json
										Content-Length: 1078
										{
  "rel" : "contact",
  "company" : "Contoso Corp.",
  "department" : "Engineering",
  "emailAddresses" : [
    "Alex.Doe@contoso.com"
  ],
  "homePhoneNumber" : "tel:+19185550107",
  "sourceNetworkIconUrl" : "https://images.contoso.com/logo_16x16.png",
  "mobilePhoneNumber" : "tel:4255551212;phone-context=defaultprofile",
  "name" : "Alex Doe",
  "office" : "tel:+1425554321;ext=54321",
  "otherPhoneNumber" : "tel:+19195558194",
  "sourceNetwork" : "SameEnterprise",
  "title" : "Engineer 2",
  "type" : "User",
  "uri" : "sip:alex@contoso.com",
  "workPhoneNumber" : "tel:+1425554321;ext=54321",
  "_links" : {
    "self" : {
      "href" : "//v1/applications/833/people/166"
    },
    "contactLocation" : {
      "href" : "//v1/applications/833/people/166/contactLocation"
    },
    "contactNote" : {
      "href" : "//v1/applications/833/people/166/contactNote"
    },
    "contactPhoto" : {
      "href" : "//v1/applications/833/people/166/contactPhoto"
    },
    "contactPresence" : {
      "href" : "//v1/applications/833/people/166/contactPresence"
    },
    "contactPrivacyRelationship" : {
      "href" : "//v1/applications/833/people/166/contactPrivacyRelationship"
    },
    "contactSupportedModalities" : {
      "href" : "//v1/applications/833/people/166/contactSupportedModalities"
    }
  }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/people/922 HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										if-none-match: 5622aa6b-2bc3-4a94-ac41-6b9d424bb5f1
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Etag: 04fb6f29-e01e-47a3-9713-607fbf5e0076
										Content-Type: application/xml
										Content-Length: 1594
										&amp;lt;?xml version=&amp;quot;1.0&amp;quot; encoding=&amp;quot;utf-8&amp;quot;?&amp;gt;
&amp;lt;resource rel=&amp;quot;contact&amp;quot; href=&amp;quot;//v1/applications/833/people/166&amp;quot; xmlns=&amp;quot;http://schemas.microsoft.com/rtc/2012/03/ucwa&amp;quot;&amp;gt;
  &amp;lt;link rel=&amp;quot;contactLocation&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactLocation&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactNote&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactNote&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactPhoto&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactPhoto&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactPresence&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactPresence&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactPrivacyRelationship&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactPrivacyRelationship&amp;quot; /&amp;gt;
  &amp;lt;link rel=&amp;quot;contactSupportedModalities&amp;quot; href=&amp;quot;//v1/applications/833/people/166/contactSupportedModalities&amp;quot; /&amp;gt;
  &amp;lt;property name=&amp;quot;rel&amp;quot;&amp;gt;contact&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;company&amp;quot;&amp;gt;Contoso Corp.&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;department&amp;quot;&amp;gt;Engineering&amp;lt;/property&amp;gt;
  &amp;lt;propertyList name=&amp;quot;emailAddresses&amp;quot;&amp;gt;
    &amp;lt;item&amp;gt;Alex.Doe@contoso.com&amp;lt;/item&amp;gt;
  &amp;lt;/propertyList&amp;gt;
  &amp;lt;property name=&amp;quot;homePhoneNumber&amp;quot;&amp;gt;tel:+19185550107&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;sourceNetworkIconUrl&amp;quot;&amp;gt;https://images.contoso.com/logo_16x16.png&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;mobilePhoneNumber&amp;quot;&amp;gt;tel:4255551212;phone-context=defaultprofile&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;name&amp;quot;&amp;gt;Alex Doe&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;office&amp;quot;&amp;gt;tel:+1425554321;ext=54321&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;otherPhoneNumber&amp;quot;&amp;gt;tel:+19195558194&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;sourceNetwork&amp;quot;&amp;gt;SameEnterprise&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;title&amp;quot;&amp;gt;Engineer 2&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;type&amp;quot;&amp;gt;User&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;uri&amp;quot;&amp;gt;sip:alex@contoso.com&amp;lt;/property&amp;gt;
  &amp;lt;property name=&amp;quot;workPhoneNumber&amp;quot;&amp;gt;tel:+1425554321;ext=54321&amp;lt;/property&amp;gt;
&amp;lt;/resource&amp;gt;
									
```

