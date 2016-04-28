# Embed Skype business-to-consumer communications in your mobile app

![Guest meeting join scenario diagram](images/Fig2_anonymous_meeting_join.png "Figure 1. Guest meeting join")

Figure 1. Guest  meeting join


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
 

## Next steps

- [Getting started with the App SDK](GettingStarted.md)
