# Implementing a Anonymous Client with the Skype App SDK

This article will discuss the flow for _Anonymous Meeting Join_ involving the client-side functionality
of the Skype App SDK. 

The anonymous user can join into Skype meetings by using a meeting's URI. For Skype for Business Online,
_Anonymous Meeting Join_ is supported through the Trusted Application API. The meeting's URL is passed to the Service Application, which talks to the Trusted 
Application API and enables anonymous users to join the online meeting.

## Prerequisites

1. Obtain a _meeting URL_ by scheduling an online meeting 
by using the Skype for Business Client or Outlook, or even programmatically using 
UCWA or the Trusted Application API. Please refer [Anonymous Meeting Scheduling](./AnonymousMeetingSchedule.md) for more details. 

2. Develop Trusted Application API Service Applications for Skype for Business Online. Please refer [ Developing Trusted Application API applications for Skype for Business Online](./AADS2S.md) for more details.

## Sample code walkthrough

#### 1. Get anonymous meeting URL from UCWA-based web service

**iOS**
```
/* POST Request on "https://imbridge.cloudapp.net/GetAdhocMeetingJob".
 GetAdhocMeetingJob is the UCWA-based web service API that gets meeting URL.
*/ 

let request = NSMutableURLRequest(URL: NSURL(string: "https://imbridge.cloudapp.net/GetAdhocMeetingJob")!)
        request.HTTPMethod = "POST"
        request.HTTPBody = "Subject=adhocMeeting&Description=adhocMeeting&AccessLevel=".dataUsingEncoding(NSUTF8StringEncoding)

        NSURLSession.sharedSession().dataTaskWithRequest(request) {
            (data: NSData?, response: NSURLResponse?, error: NSError?) in
            NSRunLoop.mainRunLoop().performBlock() {
                do {
                    guard error == nil, let data = data else {
                        throw error!
                    }

                    let json = try NSJSONSerialization.JSONObjectWithData(data, options: []) as! [String: String]
                    self.meetingUrl.text = json["JoinUrl"]
                    } catch {
                    UIAlertView(title: "Getting meeting URL failed", message: "\(error)", delegate: nil, cancelButtonTitle: "OK").show()
                }
            }
        }.resume()

 // Response data:

{

"OnlineMeetingUri":"**", 
"DiscoverUri": "**", 
"OrganizerUri": "**", 
"JoinUrl": "**", // Meeting URL we are interested in
"ExpireTime": "**"
}

```

**Android**
```
final RESTUtility.SaasAPIInterface apiInterface = rESTUtility.getSaaSClient();

            String body = "Subject=adhocMeeting&Description=adhocMeeting&AccessLevel=";

            RequestBody bridgeRequest = RequestBody.create(
                    MediaType.parse("text/plain, */*; q=0.01"),
                    body);


            Call<GetMeetingURIResult> call = apiInterface.getAdhocMeeting(bridgeRequest);
            call.enqueue(new Callback<GetMeetingURIResult>() {
                @Override
                public void onResponse(Call<GetMeetingURIResult> call, Response<GetMeetingURIResult> response) {
                    if (null != response.body()) {
                        try {

                            if (response.body().JoinUrl != null){
                                GetAnonymousToken(apiInterface, response.body().JoinUrl);
                            } else {
                                Snackbar.make(mRootView, "Meeting URI was not returned", Snackbar.LENGTH_LONG)
                                        .setAction("Action", null).show();

                            }

```

#### 2. Get anonymous application token

When the user decides to join the meeting, it pings the Service Application with the meeting's url.
The user gets the _anonymous application token_ and _Discovery UrI_ based on the _meeting URL_(should be in same tenant)

**iOS**
```
/* POST Request on "https://metiobank.cloudapp.net/GetAnonTokenJob".
 GetAnonTokenJob is the Service Application API that gets Token 
and Discovery Uri with meetingUrl.
*/ 

let request = NSMutableURLRequest(URL: NSURL(string: "https://metiobank.cloudapp.net/GetAnonTokenJob")!)
        request.HTTPMethod = "POST"
        request.HTTPBody = "ApplicationSessionId=AnonMeeting&AllowedOrigins=http%3a%2f%2flocalhost%2f&MeetingUrl=https%3a%2f%2fmeet.lync.com%2fmetio%2fjohn%2fI3I1FKVN".dataUsingEncoding(NSUTF8StringEncoding)

        NSURLSession.sharedSession().dataTaskWithRequest(request) {
            (data: NSData?, response: NSURLResponse?, error: NSError?) in
            NSRunLoop.mainRunLoop().performBlock() {
                do {
                    guard error == nil, let data = data else {
                        throw error!
                    }

                    let json = try NSJSONSerialization.JSONObjectWithData(data, options: []) as! [String: String]
                    self.meetingUrl.text = json["DiscoverUri"]
                    self.token = json["Token"]
                } catch {
                    UIAlertView(title: "Getting Discover URL failed", message: "\(error)", delegate: nil, cancelButtonTitle: "OK").show()
                }
            }
        }.resume()

 // Response data:

{
  “DiscoverUri”:”**”,
  “ExpireTime”:”**”,
  “TenantEndpointId”:”**”,
 “Token”:”” 
 }
```

**Android**
```
private void GetAnonymousToken(RESTUtility.SaasAPIInterface apiInterface, String meetingUri) {
        try {
            String body = String.format(
                    "ApplicationSessionId=%s&AllowedOrigins=%s&MeetingUrl=%s"
                    ,UUID.randomUUID()
                    ,"http%3A%2F%2Fsdksamplesucap.azurewebsites.net%2F"
                    ,meetingUri);
            RequestBody bridgeRequest = RequestBody.create(
                    MediaType.parse("text/plain, */*; q=0.01"),
                    body);

            Call<GetTokenResult> callforBridge = apiInterface.getAnonymousToken(
                    bridgeRequest);
            callforBridge.enqueue(new Callback<GetTokenResult>() {
                @SuppressLint("LongLogTag")
                @Override
                public void onResponse(Call<GetTokenResult> call, final Response<GetTokenResult> response) {
                    Log.i("Succeeded in starting chat bridge", "");

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Intent callIntent = new Intent(getApplicationContext(), SkypeCall.class);
                            Bundle meetingParameters = new Bundle();
                            meetingParameters.putShort(getString(R.string.onlineMeetingFlag), (short) 1);
                            meetingParameters.putString(getString(R.string.discoveryUrl), response.body().DiscoverUri);
                            meetingParameters.putString(getString(R.string.authToken), response.body().Token);
                            meetingParameters.putString(getString(R.string.onPremiseMeetingUrl),"");
                            callIntent.putExtras(meetingParameters);
                            startActivity(callIntent);

                        }
                    });

                }

```
#### 3. Joins the meeting anonymously as a 'guest'
Joins a meeting anonymously via Skype App SDK using the Anonymous Token and Discovery URI from previous request as your sign-in parameters.

**iOS**
```

    /** Joins a meeting anonymously as a 'guest', without requiring sign-in to
     * a Skype for Business account
     *
     * @param discoverUrl The discover URL to join.
     * @param authToken The authorization token.
     * @param displayName Name of the guest user, which will be visible in all
     * Skype for Business clients that also join the meeting.
     * @return A session containing single conversation that represents this meeting.
     * Observe [SfBConversation state] property to determine when connection to
     * the meeting is fully established.
     *
     * @note This method can be called repeatedly at any time. It automatically
     * disconnects any existing meetings.
     **/

            let session = try sfb.joinMeetingAnonymousWithDiscoverUrl(NSURL(string: meetingUrl.text!)!, authToken: token!, displayName: displayName.text!)
            conversation = session.conversation
            return true
        } catch {
            UIAlertView(title: "Join failed", message: "\(error)", delegate: nil, cancelButtonTitle: "OK").show()
            return false
        }

```
**Android**
```
mAnonymousSession = mApplication
                        .joinMeetingAnonymously(
                                getString(R.string.userDisplayName)
                                , new URL(discoveryUrl)
                                , authToken);
conversation = mAnonymousSession.getConversation();
```



