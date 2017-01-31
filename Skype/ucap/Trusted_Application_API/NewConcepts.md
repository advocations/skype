# Key programming concepts

Trusted Application is modelled on the general principles, capabilities, API style, and API concepts of the Skype for Business [Unified Communications Web API (UCWA)](https://ucwa.skype.com). The [UCWA Key Programming Concepts](https://ucwa.skype.com/documentation/key-programming-concepts) gives you 
detailed information about RESTful programming concepts. You should be familiar with these UCWA concepts to greatly simplify learning the Trusted Application API.

This topic introduces the following new Trusted Application API concepts:


## Discovery for Service Applications

The discovery flow that Service Applications (SA) built on the Trusted Application API use is different from the UCWA autodiscover flow. A Service Application uses a standard URL for discovery - **https://noammeetings.resources.lync.com/platformservice/discover**.
A GET on this url returns a **[ms:rtc:saas:applications](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_applications.html)** resource, which is the starting point for the Service Application scenarios.

You can learn more about the Trusted Application API discovery flow at [Discovery for Service Applications](./DiscoveryForServiceApplications.md)

## Discovery for anonymous clients

Anonymous clients follow a different discovery flow. The anonymous client discovery flow starts when the client requests a discovery link from an SA. The SA requests the link using the Trusted Application API. The API response is returned to the client as an [**ms:rtc:saas:discover**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_discover.html) link. 

The anonymous client issues a GET on the discovery link and an **[anonApplications](http://trustedappapi.azurewebsites.net/Resources/anonApplications.html)** resource is returned. This resource is the starting point for all anonymous clients scenarios.

You can get the details of how an SA gets the  anonApplications resource from the API: [Discovery by chat client](./DiscoveryChatClient.md)



## Anonymous Application Tokens:
An SA gets an Anonymous Applications Token and a discover link ([**ms:rtc:saas:discover**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_discover.html)) and shares these objects with an anonymous client so that the client can send chat invitations and messages.
The anonymous client uses the following pattern to send messages:

1. Follows the discover link supplied by the SA.
1. Gets the **anonApplications** link from the discovery response.
1. Sends a GET request on the **anonApplications** link
1. Gets the [**ms:rtc:saas:anonApplicationTokens**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_anonApplicationTokens.html) resource in the response to the previous step.
1. Sends a Trusted Application API request to the **anonApplications** link that includes the token in a request header.


## Adhoc Meeting:

An adhoc meeting is also known as an "on demand meeting". It is a temporarily generated meeting with a limited expiration.  You can create an adhoc meeting by a POST on [**ms:rtc:saas:adhocMeetings**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_adhocMeetings.html). 
The [**ms:rtc:saas:adhocMeetings**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_adhocMeetings.html) resource is returned when you do a GET on the url returned after the Discovery step.

Default expiration time: 8 hours.  


## Start Adhoc Meeting:

When a SA wants to create an adhoc (aka on demand) meeting and join it as a trusted participant who has full access to all info pertaining to the meeting, it can POST on this resource [**ms:rtc:saas:adhocMeetings**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_adhocMeetings.html). This avoids a two-step process of creating and then joining a meeting.

This link is available on the [**ms:rtc:saas:messagingInvitation**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_messagingInvitation.html) event to allow creating and joining an adhoc meeting, and later bridging the messaging leg into a conference.




## Conversation Bridge:

When the API has to bridge communications between a peer to peer call and a conference, the Service Application creates a conversation bridge entity to connect the conference with the peer to peer call.  To let SfB Online users send messages to the peer to peer call leg, a Service Application adds the users as bridged participants to the conversation bridge. 

>Note: If users are not bridged, the peer to peer call leg will not be able to see messages from those users. 

There are scenarios where it useful to avoid bridging certain conversation participants. For example, in a contact center supervisor scenario, your app should not bridge the supervisor, so a customer does not see the supervisor's messages


Conceptually, an Conversation Bridge is similar Back-to-back Agent in UCMA, with some key differences:

- A [Conversation Bridge](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_conversationBridge.html) can only connect a P2P call leg to a conference, unlike a Back-to-back agent which can connect two P2P call legs

- An Conversation Bridge (current release IM only) in the future can include multiple conversation modalities, and both Audio/Video and IM.

- A UCMA B2B User Agent can only connect 1 modality and only supports audio/video


## Message Filter:

Within a conversation bridge, the SA can allow or disallow sending messages from a participant on the conference leg. When disallowed, messages are not sent to the peer to peer leg where the peer to peer recipient is an anonymous user. Setting the filter state to **disabled** allows messages to be sent from the bridged conference participant to the peer to peer client.  Setting the message filter State to **enabled** prevents message sending from the bridged conference participant to the peer to peer client.  

Message Filter State should be set for each [bridged participant](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_bridgedParticipants.html) that has been added to a conversation.  If Message Filter State is not added for the participant, by default messages will not be bridged to the peer to peer client. When adding bridged participant it is REQUIRED to also set display name for the participant in the bridge.  An anonymous user on the peer to peer leg will see the display name of the sender (bridged participant) when he receives a message.



## Accept and Bridge:

In order to create a Conversation Bridge (when the Service Application wants to bridge an incoming invitation with an existing conference) it can use this [**Accept and Bridge**](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_acceptAndBridge.html) link (this release includes IM only). This link is available on the incoming invitation and takes in a conference id as a request parameter.



## Callback Url:

Callback functionality is implemented using [Webhooks](./Webhooks.md). 


## Audio Video:
Audio video is the communication between the service applications' endpoint and remote participant with audio/video modality. Trusted Application API supports incoming
 and outgoing audio video calls. For example, from the SA's endpoint to a user. For this release, Trusted Application API only supports incoming audio video call to 
the SA endpoint's registered PSTN number. To receive incoming calls from PSTN, the tenant administrator acquires a service phone number and assigns it to the SA's endpoint.
Please refer the [Trusted Application Endpoint](./TrustedApplicationEndpoint.md) and [Registration in SFB Online](./SfBRegistration.md) for more details. 

The target of an outgoing audio video call must be an SfB user within the same tenant as the SA endpoint. 
For media, Trusted Application API supports interactive voice response (IVR) capability. With IVR support, the SA never directly 
interacts with the media. Instead, Trusted Application API allocates a media bot remotely on behalf of the
service application. Trusted Application API allows the application to interact with remote participant by playing a prompt or recognizing DTMF tones. A remote users uses a keypad to input choices and the client app sends tones using functions exposed by Trusted Application API. 

When an application accepts incoming audio video call or makes outbound calls, it must specify **mediaHost** as "Remote"
in the HTTP input body to access Trusted Application API IVR capability. 

The **[ms:rtc:saas:audiovideo](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_audioVideo.html)** resource implements the signaling connection with the remote participant for the audio video call. The actual audio and video media is exchanged on an instance of **[ms:rtc:saas:audioVideoFlow](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_audioVideoFlow.html)**, which is created at the time call is established.
The **[ms:rtc:saas:startAudioVideo](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_startAudioVideo.html)** allows the application to create a new conversation with the specified contact with audio/video modality.

## Audio Video Flow:

Audio Video flow is the media connection between an SA endpoint and a remote participant. The **[ms:rtc:saas:audioVideoFlow](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_audioVideoFlow.html)** resource exposes the media capabilities and 
plays a pre-recorded prompt **[ms:rtc:saas:playPrompt](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_playPrompt.html)** or recognize an incoming DTMF or tone events **[ms:rtc:saas:tone](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_tone.html)**. 
These operation capabilities are made available to the application only after a successful media negotiation, 
when the state of the flow is **Connected**.

## Transfer Audio Video Call:

**[ms:rtc:saas:transfer](http://trustedappapi.azurewebsites.net/Resources/ms_rtc_saas_transfer.html)** is the capability to transfer an ongoing audio video call. Trusted Application API supports both attended
transfer and supervised transfer. For the attended and supervised transfer concept please refer to 
[UCMA documentation](https://msdn.microsoft.com/en-us/library/office/hh347347.aspx). The application needs to specify either the "to" input property 
(the address of the transfer target) or the "replacesCallContext" input property (the call to be replaced as the result of the transfer) in the transfer request body, 
to indicate that the transfer request is attended or supervised.


## Programming tips

When coding with the Trusted Application , you should keep the following tips in mind:

>Unless otherwise mentioned, all call flows shown in the documentation require an Oauth token to be sent in every request made to the API.

>The API can return relative paths in the links returned in the response. When this happens the application is expected to use the same base FQDN for these links, as the base FQDN for that request.

>Capabilities enabled for a Service Application, depend on the Application Permissions that your Service Application selected for Skype for Business Online in the Azure management portal.

## In this section

- [Webhooks](./Webhooks.md) 

