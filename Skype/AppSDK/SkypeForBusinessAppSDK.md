# What is the Skype for Business App SDK?

## Overview

Embed Skype business-to-consumer communications in your mobile app. The Skype for Business App SDK provides a platform to businesses to enable communication scenarios within their applications. The SDK offers capabilities to seamlessly integrate messaging, audio, and video experiences. 
 
![Sample client application integration with Skype for Business App SDK](images/appsdk_arch.png "Figure 1. Sample client application integration with Skype for Business App SDK")

Figure 1. Sample client application integration with Skype for Business App SDK

The initial focus of the SDK is to enable businesses to create consumer-facing iOS and Android applications that include IM, audio and video communication capabilities from consumers (external users with no Skype for Business account) to business users (internal Skype for Business-enabled users within the business).  The SDK makes it possible for these Skype for Business communications to occur from within the business application, alongside your own business-specific data or tasks.  

This article outlines the relevant **architectural concepts** and the **API** surface of the SDK to help developers (product managers, designers, and engineers) conceptualize the integration of the Skype for Business App SDK with their applications and also design their workflows. 

### Platforms

The SDK will be available for the iOS and Android platforms and will include a platform-specific Objective-C and Java interfaces, respectively.  The precise details of the interfaces will be communicated later.  For now, this document focuses on the SDK concepts and call-flows in a platform-neutral way. 

### Business to Consumer (B2C) scenarios

The consumer endpoint will be the application with the integrated Skype for Business App SDK.  The business endpoint is a Skype for Business-capable user/employee of the business.  The SDK will allow Consumer to Business communication either via a Skype for Business meeting or direct 1:1 Skype for Business conversation to a service endpoint.

#### Communication via a Skype for Business meeting

In this scenario, the application will use the SDK to connect to a Skype for Business meeting.  Because the consumer using the application will not have Skype for Business credentials, the SDK will support joining the Skype for Business meetings as a _guest_. 
 
This call-flow is often referred to as Anonymous Meeting Join.  Meetings are identified by a meeting URL, such as: [https://join.contoso.com/meet/john/BW9Z1MJD]( https://join.contoso.com/meet/john/BW9Z1MJD).  The client app will need to obtain this URL from its own back-end services (which in turn, may obtain it using the Skype for Business server-side APIs).  

> **Note**: The scheduled meeting needs to explicitly allow anonymous users in the meeting.


This workflow for anonymous meeting join is available today via the Skype for Business (Lync) mobile applications.  You can experiment with it by creating a Skype for Business  meeting in Outlook or the Skype for Business desktop client and then launching the URL while on your phone.  

In future, this scenario may require the back-end services to also obtain an access token and pass it to the client app, along with the meeting URL.

![Anonymous meeting join scenario diagram](images/Fig2_anonymous_meeting_join.png "Figure 2. Anonymous meeting join")

Figure 2. Anonymous meeting join

##### Anonymous meeting join work items
 
1. Write a back-end application to handle client “visits”:
   * Receive a request from a client app, _initially via your own back channel_.
   * Verify the visitor.
2. Use back-end app to get a meeting URL:
   * Such as https://join.contoso.com/meet/john/BW9Z1MJD
   * Via calendar metadata or via our APIs (User API / UCWA)
   * Prescheduled (manually) or on-demand
   * Pass the URL (and token) up to your client app and into the App SDK
3. App SDK joins the meeting.
 

## Enabling a simple anonymous meeting join code pattern 

The initial public preview of the SDK supports anonymous meeting join by providing a simple API that you use to join a meeting using chat and video. The API exposes a conversation object with a single method to join a meeting and methods for preparing video, starting video, and muting audio. You can learn more about simplified meeting join in [Getting Started with the App SDK](GettingStarted.md). If you want more control over an anonymous meeting, you can use the core **App SDK** [object model](ObjectModel.md). 


 
 
## Versioning and staying up to date

The capabilities of the public preview of the App SDK are limited to anonymous meeting join with audio/video and chat. Once generally available, we anticipate that the SDK will be updated frequently with new capabilities.

* We’ll make every effort to ensure API back-compatibility with previous versions.  We will communicate any breaking changes clearly.
* To allow the SDK to move forward quickly, our guidance will be to update to the latest SDK at least every six months.  Where an app is based on an older version of the SDK, it may need to be updated so that:
  * We can investigate an issue report
  * It continues to work against Skype for Business Online or the latest Skype for Business Server CU; such occurrences should be rare and will be communicated with good notice.
* Fixes to bugs will typically be delivered only in new versions of the SDK and not back-ported to previous versions. 

## Licensing

The SDK can be used to participate in conversations where at least one of the participants is a licensed user of Skype for Business.

## Next steps

- [Getting started with the App SDK](GettingStarted.md)
