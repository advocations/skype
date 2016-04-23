# Embed Skype business-to-consumer communications in your mobile app

![Guest meeting join scenario diagram](images/Fig2_anonymous_meeting_join.png "Figure 1. Guest meeting join")

Figure 1. Guest  meeting join

<!--- Need to update diagram to remove mention of 'token'. -->

## Communication via a Skype for Business meeting

The app uses the SDK's "guest meeting join" or "anonymous meeting join" capability. Note that while the user is anonymous from the Skype for Business viewpoint, the app may well know who the user is and will authenticate the user against its own back-end authentication systems, before joining the user to the meeting. 

Meetings are identified by a meeting URL, such as: [https://join.contoso.com/meet/john/BW9Z1MJD]( https://join.contoso.com/meet/john/BW9Z1MJD).  The client app will need to obtain this URL from its own back-end services (which in turn, may obtain it using the Skype for Business server-side APIs).  

> **Note**: The meeting needs to explicitly allow anonymous users to attend.

This flow is available today.  You can experiment with it by creating a meeting in Skype for Business desktop client (or via Outlook) and then launching the meeting URL on a phone with the Skype for Business mobile app installed on it.  

## Summary of steps required:
 
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
