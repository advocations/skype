# Use the App SDK and the Trusted Application API to join an Online meeting - Android

This article shows you how to enable the core  **Skype for Business Online** anonymous meeting join scenario in your Android app. iOS developers should read
[Use the App SDK and the Trusted Application API to join an Online meeting - iOS](HowToJoinOnlineMeeting_iOS.md). 

If the anonymous meeting your app joins is hosted in a **Skype for Business Online** service and 
your app is **not** enabled for Skype for Business preview features, then your app must get a **discovery Url** and an **anonymous meeting token** to join. This article assumes that you 
have created a Trused Application API-based service application that creates ad-hoc meetings, provides meeting join Urls, discovery Uris, and anonymous meeting tokens to mobile apps that 
request them.

>[!NOTE]
**For mobile apps that enabled preview features:** If the anonymous meeting your app joins is hosted in a **Skype for Business Online** service and 
your app is enabled for Skype for Business preview features, then your app can use a meeting Url to join. A Trusted Application API service application is not needed to complete the scenario in this case. To learn
how to use a meeting Url, read [Use the SDK to join a meeting with an Android device](HowToJoinMeeting_Android.md)

After completing the steps in this article, your app can join a **Skype for Business Online** video meeting with discovery Url and anonymous meeting token. No **Skype for Business Online** credentials are used to join the meeting.

>[!NOTE]
Be sure to read [Getting started with Skype App SDK development](GettingStarted.md) to learn how to configure your Android project for the **Skype for Business** App SDK.  In particular, the following steps assume you have added the _ConversationHelper_ class to your source to let you complete the scenario with a minimum of code. 

## Create and deploy a Trusted Application API-based service Application

The service application you create will give your mobile app access to the needed anonymous meeting join resources - discovery Url and anonymous meeting token. You'll use the RESTful Trusted Application API endpoint to schedule a meeting, get 
the discovery Url and token. The rest of this article describes how to enable your Android app to call into such a service application. You can read more about the [Trusted Appplication API](../Trusted-Application-API/docs/Trusted_Application_API_GeneralReference.md) to learn
about all of the features of this Skype for Business service application api.

We've published two service application [examples](https://github.com/OfficeDev/skype-docs/tree/johnau/ucapdocs/Skype/Trusted-Application-API/samples) in GitHub to get you started.

## Add anonymous online meeting code to your mobile app

The following example code is taken from our GitHub [Healthcare app sample](https://github.com/OfficeDev/skype-android-app-sdk-samples/tree/master/HealthcareApp). The example steps include:

- Call into a service application sample to get a join Url for a new ad-hoc meeting that is created by the service application
- Use the join url to get an anonymous meeting token and a discovery Uri from the service application
- Call the **joinMeetingAnonymously** method, passing the two resources from the previous step.
- Get a **Conversation** object from the asynchronously returned **AnonymousSession** object.

The Android sample uses the **Retrofit 2** library from **Square** to make the RESTful calls into the service application. We've included the source code that sets up the REST adaptor so that
you can see the HTTP headers needed for the sample service application. 

### Get a join Url

```java
            //Retrofit 2 object for making REST calls over https
            RESTUtility rESTUtility = new RESTUtility(this,getString(R.string.cloudAppBaseurl));

            //Get the Middle Tier helpdesk app interface for making REST call
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


                        } catch (Exception e) {
                            if (null != response.body()) {
                                // body wasn't JSON
                                mResponseBody.setText(response.body().toString());
                            } else {
                                // set the stack trace as the response body
                                displayThrowable(e);
                            }
                        }
                    }
                }

                @Override
                public void onFailure(Call<GetMeetingURIResult> call, Throwable t) {
                    Log.i("Failed to get meeting url", t.getLocalizedMessage().toString());
					Snackbar.make(mRootView, "Failed: Could not get a meeting url", Snackbar.LENGTH_LONG)
							.setAction("Action", null).show();
					mCallDoctorButton.show();


				}
            });

```

### Get a Discovery Uri and token

The following example creates an HTTP request body and then uses a helper interface created with the **Retrofit 2** library to make the RESTful call into the service application.

```java
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

                @Override
                public void onFailure(Call<GetTokenResult> call, Throwable t) {
                    Log.i("failed token get", t.getLocalizedMessage().toString());
					Snackbar.make(mRootView, "Authentication token was not returned", Snackbar.LENGTH_LONG)
							.setAction("Action", null).show();

                }
            });

```

### Join the new adhoc meeting

The following code runs in the newly created **SkypeCall** activity. It calls **joinMeetingAnonymously**, gets an **AnonymousSession**, and then the **Conversation** that
represents the adhoc meeting.

[!NOTE]
The sample code shows the use of the new **setEndUserAcceptedVideoLicense** api. This API must be called before a user can join video in a meeting. Once the api has been called, the user 
is considered in acceptance of the third party video codec license that we use to support video. It is necessary that your app presents the terms of this license to the user before a meeting 
is started. Subsequent meetings do not require the license acceptance.

#### Show video codec license

```java
    /**
     * Shows a video license acceptance dialog if user has not been prompted before. If user
     * accepts license, call is started. Else, SkypeCallActivity is finished.
     * @param onlineMeetingFlag
     * @param discoveryUrl
     * @param authToken
     * @param meetingUrl
     * @return
     */
    private boolean checkVideoLicenseAcceptance(
        final Short onlineMeetingFlag
        , final String discoveryUrl
        , final String authToken
        , final String meetingUrl) {
        mApplication = Application.getInstance(this.getBaseContext());


        final Boolean canJoinCall = true;
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        if (!sharedPreferences.getBoolean(getString(R.string.acceptedVideoLicense),false)) {
            AlertDialog.Builder alertDialogBuidler = new AlertDialog.Builder(this);
            alertDialogBuidler.setTitle("Video License");
            alertDialogBuidler.setMessage(getString(R.string.videoCodecTerms));
            alertDialogBuidler.setPositiveButton("Accept", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    mApplication.getConfigurationManager().setEndUserAcceptedVideoLicense();
                    setLicenseAcceptance(true);
                    joinTheCall(onlineMeetingFlag,meetingUrl,discoveryUrl,authToken);

                }
            });
            alertDialogBuidler.setNegativeButton("Decline", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    setLicenseAcceptance(false);
                    finish();

                }
            });
            alertDialogBuidler.show();

        } else {
            joinTheCall(onlineMeetingFlag,meetingUrl,discoveryUrl,authToken);
        }

        return canJoinCall;
    }

        /**
     * Writes the user's acceptance or rejection of the video license
     * presented in the alert dialog
     * @param userChoice  Boolean, the user's license acceptance choice
     */
    private void setLicenseAcceptance(Boolean userChoice){
        SharedPreferences sharedPreferences = PreferenceManager
                .getDefaultSharedPreferences(this);
        sharedPreferences.edit()
                .putBoolean(
                        getString(
                                R.string.acceptedVideoLicense)
                        ,userChoice).apply();
        sharedPreferences.edit()
                .putBoolean(
                        getString(
                                R.string.promptedForLicense)
                        ,true).apply();


    }


```

##### The terms of the video license

These are the terms:

**MICROSOFT SOFTWARE LICENSE TERMS**
**SOFTWARE FOR VIDEO CONFERENCING IN MOBILE APPLICATIONS POWERED BY SKYPE FOR BUSINESS**
    
These license terms are an agreement between you and Microsoft Corporation (or one of its affiliates). They apply to the software named above and any Microsoft services or software updates (except to the extent such services or updates are accompanied by new or additional terms, in which case those different terms apply prospectively and do not alter your or Microsoft’s rights relating to pre-updated software or services). IF YOU COMPLY WITH THESE LICENSE TERMS, YOU HAVE THE RIGHTS BELOW.
1.	INSTALLATION AND USE RIGHTS.
   a)  General. You may run copies of the software on your devices solely with versions of software applications that communicate with validly licensed Microsoft Skype for Business Server or Skype for Business Online. 
   b)  Third Party Applications. The software may include third party applications that Microsoft, not the third party, licenses to you under this agreement. Any included notices for third party applications are for your information only. 
2.	SCOPE OF LICENSE. The software is licensed, not sold. Microsoft reserves all other rights. Unless applicable law gives you more rights despite this limitation, you will not (and have no right to):
   a)  work around any technical limitations in the software that only allow you to use it in certain ways; 
   b)  reverse engineer, decompile or disassemble the software; 
   c)  remove, minimize, block, or modify any notices of Microsoft or its suppliers in the software; 
   d)  use the software in any way that is against the law or to create or propagate malware; or 
   e)  share, publish, or lend the software (except for any distributable code, subject to the applicable terms above), provide the software as a stand-alone hosted solution for others to use, or transfer the software or this agreement to any third party. 
3.	EXPORT RESTRICTIONS. You must comply with all domestic and international export laws and regulations that apply to the software, which include restrictions on destinations, end users, and end use. For further information on export restrictions, visit (aka.ms/exporting). 
4.	SUPPORT SERVICES. Microsoft is not obligated under this agreement to provide any support services for the software. Any support provided is “as is”, “with all faults”, and without warranty of any kind. 
5.	ENTIRE AGREEMENT. This agreement, and any other terms Microsoft may provide for supplements, updates, or third-party applications, is the entire agreement for the software. 
6.	APPLICABLE LAW. If you acquired the software in the United States, Washington law applies to interpretation of and claims for breach of this agreement, and the laws of the state where you live apply to all other claims. If you acquired the software in any other country, its laws apply. 
7.	CONSUMER RIGHTS; REGIONAL VARIATIONS. This agreement describes certain legal rights. You may have other rights, including consumer rights, under the laws of your state or country. Separate and apart from your relationship with Microsoft, you may also have rights with respect to the party from which you acquired the software. This agreement does not change those other rights if the laws of your state or country do not permit it to do so. For example, if you acquired the software in one of the below regions, or mandatory country law applies, then the following provisions apply to you:
   a)  Australia. You have statutory guarantees under the Australian Consumer Law and nothing in this agreement is intended to affect those rights. 
   b)  Canada. If you acquired this software in Canada, you may stop receiving updates by turning off the automatic update feature, disconnecting your device from the Internet (if and when you re-connect to the Internet, however, the software will resume checking for and installing updates), or uninstalling

#### Join the meeting

The following code snippet sets configurable parameters for Skype for Business calls and then joins the anonymous meeting.

```java
    /**
     * Connect to an existing Skype for Business meeting with the URI you get
     * from a server-side UCWA-based web service.
     */
    private void joinTheCall(
            Short onlineMeetingFlag
            , String meetingUrl
            , String discoveryUrl
            , String authToken){
        try {

            //Set meeting configuration parameters
            setMeetingConfiguration();

            mAnonymousSession = mApplication
                    .joinMeetingAnonymously(
                            getString(R.string.userDisplayName)
                            , new URL(discoveryUrl)
                            , authToken);
            mConversation = mAnonymousSession.getConversation();
            if (mConversation != null)
                mConversation.addOnPropertyChangedCallback(new ConversationPropertyChangeListener());


        } catch (URISyntaxException ex) {
            ex.printStackTrace();
            Log.e("SkypeCall", "On premise meeting uri syntax error");
        } catch (SFBException e) {
            e.printStackTrace();
            Log.e("SkypeCall", "exception on start to join meeting");
        } catch (MalformedURLException e) {
            Log.e("SkypeCall", "Online meeting url syntax error");
            e.printStackTrace();
        }
    }

        /**
     * Set up AV call configuration parameters from user preferences
     */
    private void setMeetingConfiguration(){
        mApplication.getConfigurationManager().enablePreviewFeatures(
                PreferenceManager
                        .getDefaultSharedPreferences(this)
                        .getBoolean(getString(R.string.enablePreviewFeatures), false));

        mApplication.getConfigurationManager().setRequireWiFiForAudio(
                PreferenceManager
                        .getDefaultSharedPreferences(this)
                        .getBoolean(getString(R.string.requireWifiForAudio), false));

        mApplication.getConfigurationManager().setRequireWiFiForVideo(
                PreferenceManager
                        .getDefaultSharedPreferences(this)
                        .getBoolean(getString(R.string.requireWifiForVideo), false));

        mApplication.getConfigurationManager().setMaxVideoChannelCount(
                Long.parseLong(PreferenceManager
                        .getDefaultSharedPreferences(this)
                        .getString(getString(R.string.maxVideoChannels), "5")));

    }


```

#### Retrofit helper interface

This example creates a constructor, loggin interceptor method, and interface to the service application REST api. The logging interceptor method injects HTTP headers into RESTful requests
made by the mobile sample.

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