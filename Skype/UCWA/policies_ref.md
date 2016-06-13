
# policies 

 **Last modified:** July 14, 2015

 _**Applies to:** Skype for Business 2015_

 **In this article**
 [Web Link](#sectionSection0)
 [Resource description](#sectionSection1)
 [Operations](#sectionSection2)


Represents the admin policies that can apply to a user's application. 

## Web Link
<a name="sectionSection0"> </a>

For more on web links, see [Web links](WebLinks.md).



|**Name**|**Description**|
|:-----|:-----|
|rel|The resource that this link points to. In JSON, this is the outer container.|
|href|The location of this resource on the server, and the target of an HTTP operation.|

## Resource description
<a name="sectionSection1"> </a>

Policies include information such as whether emoticons are allowed in messages or photos are enabled for [contact](contact_ref.md)s in the user's organization. Note that policies are set by the admin; they cannot be changed by the user. 


### Properties





|**Name**|**Description**|
|:-----|:-----|
|customerExperienceImprovementProgram|Whether Skype for Business mobile users can participate and publish data to Microsoft's Customer Experience Improvement Program.If customerExperienceImprovementProgram is enabled, the user can participate and publish data to Microsoft's Customer Experience Improvement Program.Note that this should not require a change in application behavior.|
|emergencyDialMask|An alternate number for emergency services.If emergencyDialMask is set to 555 and the emergencyDialString is set to 911, entering 555 will cause 911 to be dialed.Note that entering 911 will also cause 911 to be dialed in this scenario.|
|emergencyDialString|The emergency services number that will be dialed if the number in emergencyDialMask is entered.If emergencyDialMask is set to 555 and the emergencyDialString is set to 911, entering 555 will cause 911 to be dialed.Note that entering 911 will also cause 911 to be dialed in this scenario.|
|emoticons|Whether the admin has enabled emoticons for the messaging modality.If disabled, emoticons will be turned into their text equivalents before delivery.|
|clientExchangeConnectivity|This mobile policy parameter allows the mobile user to connect to Exchange from their mobile device.When ExchangeConnectivity is disabled, mobile users will not have the option to connect to Exchange from their client on the mobile device.The default value is True, meaning that mobile users cannot connect to Exchange from their client on the mobile device.Disabled|
|exchangeUnifiedMessaging|Whether the user is enabled for Microsoft Exchange Unified Messaging.If exchangeUnifiedMessaging is enabled, the user's contacts and voicemail are stored in Exchange rather than in Skype for Business.Note that this should not require a change in application behavior.|
|htmlMessaging|Whether the admin has enabled HTML messages for the messaging modality.If enabled, the application can choose to pass HTML to [sendMessage](sendMessage_ref.md).|
|logging|Whether the admin has enabled client-side logging by default.If enabled, the user should not be given the choice to disable logging.If disabled, the user should be given the choice to enable logging.|
|loggingLevel|The level of client-side logging that the admin expects.|
|messageArchiving|Whether the admin has enabled the archival of client-side message transcripts by default.If disabled, the user should not be given the choice to enable message transcript archival.|
|messagingUrls|Whether the admin has enabled clickable URLs for the messaging modality.|
|photos|Whether photos are enabled for all [contact](contact_ref.md)s in this organization.|
|saveCallLogs|This mobile policy parameter allows saving the call logs on mobile device.When SavingCallLogs is disabled, call logs will not be saved locally on the mobile device.The default value is True, meaning that call logs can be saved locally on mobile device.Disabled|
|saveCredentials|This mobile policy parameter allows the mobile user to save their credentials locally on the mobile device.If savingCredentials is disabled, the user will not have the option to save his credentials locally on the mobile device.The default value is Enabled, meaning that user is allowed to save his credentialsEnabled|
|saveMessagingHistory|This mobile policy parameter allows saving the history of IM exchanged from the mobile device.If savingInstantMessagingHistory is disabled, IM history will not be saved locally on the mobile device.The default value is True, meaning that IM history can be saved locally on mobile device.Disabled|
|sharingOnlyOnWifi|The sharingOnlyOnWifi policy.|
|telephonyMode|Indicates which audio capabilities are possible for this user; for example, audioVideo or phoneAudio.This is an advanced API that indicates more granular capabities including whether the user can make a PSTN call.|
|voicemailUri|The URI to call to check the user's voicemail.|

### Links

This resource can have the following relationships.



|**Link**|**Description**|
|:-----|:-----|
|self|The link to the current resource.|

## Operations
<a name="sectionSection2"> </a>




### GET

Returns a representation of the admin policies that can apply to a user's application.


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

										Get https://fe1.contoso.com:443//v1/applications/833/policies HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/json
										
									
```


#### JSON Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/json
										Content-Length: 637
										{
 "rel" : "policies",
 "customerExperienceImprovementProgram" : "Disabled",
 "emergencyDialMask" : "555",
 "emergencyDialString" : "911",
 "emoticons" : "Disabled",
 "clientExchangeConnectivity" : "Disabled",
 "exchangeUnifiedMessaging" : "Disabled",
 "htmlMessaging" : "Disabled",
 "logging" : "Enabled",
 "loggingLevel" : " Light",
 "messageArchiving" : "Enabled",
 "messagingUrls" : "Disabled",
 "photos" : "Enabled",
 "saveCallLogs" : "Disabled",
 "saveCredentials" : "Disabled",
 "saveMessagingHistory" : "Disabled",
 "sharingOnlyOnWifi" : "Disabled",
 "telephonyMode" : "AudioVideo",
 "voicemailUri" : "sip:jdoe@contoso.com;opaque=app:voicemail",
 "_links" : {
 "self" : {
 "href" : "//v1/applications/833/policies"
 }
 }
}
									
```


#### XML Request


```

										Get https://fe1.contoso.com:443//v1/applications/833/policies HTTP/1.1
										Authorization: Bearer cwt=PHNhbWw6QXNzZXJ0aW9uIHhtbG5...uZm8
										Host: fe1.contoso.com
										Accept: application/xml
										
									
```


#### XML Response

This sample is given only as an illustration of response syntax. The semantic content is not guaranteed to correspond to a valid scenario.


```

										HTTP/1.1 200 OK
										Content-Type: application/xml
										Content-Length: 1177
										<?xml version="1.0" encoding="utf-8"?>
<resource rel="policies" href="//v1/applications/833/policies" xmlns="http://schemas.microsoft.com/rtc/2012/03/ucwa">
 <property name="rel">policies</property>
 <property name="customerExperienceImprovementProgram">Disabled</property>
 <property name="emergencyDialMask">555</property>
 <property name="emergencyDialString">911</property>
 <property name="emoticons">Disabled</property>
 <property name="clientExchangeConnectivity">Disabled</property>
 <property name="exchangeUnifiedMessaging">Disabled</property>
 <property name="htmlMessaging">Disabled</property>
 <property name="logging">Enabled</property>
 <property name="loggingLevel">Full</property>
 <property name="messageArchiving">Enabled</property>
 <property name="messagingUrls">Disabled</property>
 <property name="photos">Enabled</property>
 <property name="saveCallLogs">Disabled</property>
 <property name="saveCredentials">Disabled</property>
 <property name="saveMessagingHistory">Disabled</property>
 <property name="sharingOnlyOnWifi">Disabled</property>
 <property name="telephonyMode">AudioVideo</property>
 <property name="voicemailUri">sip:jdoe@contoso.com;opaque=app:voicemail</property>
</resource>
									
```

