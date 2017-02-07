# Implementing a Anonymous Client with the Skype App SDK

This article will discuss the flow for **Anonymous Meeting Join** involving the client-side functionality
of the Skype App SDK. 

The anonymous user can join into Skype meetings by using a meeting's URI. For Skype for Business Online,**Anonymous Meeting Join** is supported through the Trusted Application API. The meeting's URL is passed to the Service Application, which talks to the Trusted 
Application API and enables anonymous users to join the online meeting.

## Prerequisites

1. Obtain a **meeting URL** by scheduling an online meeting 
by using the Skype for Business Client or Outlook, or even programmatically using 
UCWA or the Trusted Application API. Please refer [Anonymous Meeting Scheduling](./AnonymousMeetingSchedule.md) for more details. 

2. Develop Trusted Application API Service Applications for Skype for Business Online. Please refer [ Developing Trusted Application API applications for Skype for Business Online](./AADS2S.md) for more details.

## Sample code walkthrough

### 1. Get anonymous meeting URL from your Trusted Application API-based web service

**iOS**
```Swift
/* POST Request on "https://imbridge.cloudapp.net/GetAdhocMeetingJob".
 GetAdhocMeetingJob is the Trusted Application API-based web service API method that gets meeting URL.
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


The following code implements the RESTUtility and then uses it to make a call on the SaaS to create an ad-hoc meeting
and return meeting join Url. The **onResponse** callback method gets the meeting join Url and calls the **GetAnonymousToken** helper
method, passing the join Url in the second parameter.

The SaaS base Url shown in this snippet is for example purposes. Replace `<your SaaS Base Url>` with the base Url of the SaaS application
that you developed.

```java

//Retrofit 2 object for making REST calls over https
RESTUtility rESTUtility = new RESTUtility("https://<your SaaS Base Url>/<GetAnonTokenJob>/");

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

### 2. Get anonymous application token

When the user decides to join the meeting, it pings the Service Application with the meeting's url.
The user gets the _anonymous application token_ and _Discovery UrI_ based on the _meeting URL_(should be in same tenant)

**iOS**
```swift
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

The following code snippet uses the **RESTUtility APIInterface** to call the SaaS application 
**GetAnonTokenJob** method.
```java
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
                @Override
                public void onResponse(Call<GetTokenResult> call, final Response<GetTokenResult> response) {

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
### 3. Joins the meeting anonymously as a 'guest'
Joins a meeting anonymously via Skype App SDK using the Anonymous Token and Discovery URI from previous request as your sign-in parameters.

**iOS**
```swift

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
        do {

            let session = try sfb.joinMeetingAnonymousWithDiscoverUrl(NSURL(string: meetingUrl.text!)!, authToken: token!, displayName: displayName.text!)
            conversation = session.conversation
            return true
        } catch {
            UIAlertView(title: "Join failed", message: "\(error)", delegate: nil, cancelButtonTitle: "OK").show()
            return false
        }

```
**Android**

```java
mAnonymousSession = mApplication
                        .joinMeetingAnonymously(
                                getString(R.string.userDisplayName)
                                , new URL(discoveryUrl)
                                , authToken);
conversation = mAnonymousSession.getConversation();
```

### Supporting Android sample helper methods

The Android implementation uses the **Square** __Retrofit 2.0__ library to form the RESTful https calls. The following code creates the REST apiInterface
used for the calls to the SaaS endpoint.

>**Note:** The HTTP headers added in the loggin interceptor are for example purposes only. Your SaaS application may not require
this set of headers. 

```java
/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
package com.microsoft.office.sfb.healthcare;
import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.POST;


public class RESTUtility {

    private  SaasAPIInterface saaSAPIInterface;
    private  String mBaseUrl;
    private okhttp3.OkHttpClient mOkClient;
    private Context mContext;

    public RESTUtility(Context context, String baseUrl){
        mContext = context;
        mBaseUrl = baseUrl ;
    }

    @SuppressLint("LongLogTag")
    private void buildLoggingInterceptor(){
        try {
            HttpLoggingInterceptor httpLoggingInterceptor = new HttpLoggingInterceptor();
            httpLoggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
            mOkClient = new okhttp3.OkHttpClient
                    .Builder()
                    .addInterceptor(new LoggingInterceptor())
                    .addInterceptor(httpLoggingInterceptor)
                    .build();

        } catch (Exception e) {
            Log.e(
                    "exception in RESTUtility: ",
                    e.getLocalizedMessage().toString() );
        }

    }
    @SuppressLint("LongLogTag")
    public  SaasAPIInterface getSaaSClient() {
        if (saaSAPIInterface == null) {

            try {

                if (mOkClient == null) {
                    buildLoggingInterceptor();
                }

                Retrofit SaaSClient = new Retrofit.Builder()
                        .baseUrl(mBaseUrl)
                        .client(mOkClient)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
                saaSAPIInterface = SaaSClient.create(SaasAPIInterface.class);

            } catch (Exception e){
                Log.e(
                        "exception in RESTUtility: ",
                        e.getLocalizedMessage().toString() );
            }
        }
        return saaSAPIInterface;
    }


    public interface SaasAPIInterface {



        @POST("/GetAnonTokenJob")
        Call<GetTokenResult> getAnonymousToken(
                @Body RequestBody body
        );

        @POST("/GetAdhocMeetingJob")
        Call<GetMeetingURIResult> getAdhocMeeting(
                @Body RequestBody body);

    }

    class LoggingInterceptor implements Interceptor {

        @Override
        public Response intercept(Chain chain) throws IOException {


            Request request = chain.request();
            request = request.newBuilder()

            .addHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")
            .addHeader("Accept","text/plain, */*; q=0.01")
            .addHeader("Referer","https://sdksamplesucap.azurewebsites.net/")
            .addHeader("Accept-Language","en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3")
            .addHeader("Origin","https://sdksamplesucap.azurewebsites.net")
            .addHeader("Accept-Encoding","gzip, deflate")
            .addHeader("User-Agent","Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko")
            .addHeader("Host",mContext.getString(R.string.SaasHostName))
            .addHeader("Content-Length",
                    String.valueOf(
                            chain.request()
                                    .body()
                                    .contentLength()))
            .addHeader("Connection","Keep-Alive")
            .addHeader("Cache-Control","no-cache")
                  .method(request.method(),request.body())
            .build();


            Response response = chain.proceed(request);
            return response;
        }
    }

}

```
