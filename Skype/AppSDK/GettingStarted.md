# Getting started with Skype App SDK development 

This section shows how to get started developing mobile applications with the Skype App SDK. It also provides guidance on using the Skype App SDK samples.

## Download the Skype App SDK

The SDKs for iOS and Android are available for download from Microsoft. 
* [Skype for Business App SDK - iOS](http://aka.ms/sfbAppSDKDownload_ios)
* [Skype for Business App SDK - Android](http://aka.ms/sfbAppSDKDownload_android)

<!--- Can add back comment on structure of download, once Dev made final decision on this.  -->
 
<!--- Split instructions at this point.  1. Run sample app (still needs meeting URL).  2.  Add SDK to your own app.  Also split by platform too?   -->

>Note: We maintain a set of [App SDK samples](Samples.md) for Android and iOS on **GitHub**. These samples are configured to use the App SDK and are ready to run.
Just download the SDK libraries, get the URL of an established **Skype for Business** meeting, run the sample, and join the meeting. 

## Configure your project for the Skype for Business App SDK

You can start coding with the App SDK after you complete the following configuration tasks for your platform.

#### iOS

The configuration steps include:


1. **Add embedded binary**: In XCode, in the Interface Builder  Source Pane, select the project node and open the project properties pane. Add an embedded binary from the folder that 
you downloaded the SDK libraries into. 

  > Note: The SDK comes with a binary for use on physical devices and a binary for running the iOS emulator. The binaries have the 
same name but are in separate folders. To run your app on a **device**, navigate to the location where you downloaded the App SDK and 
choose the _AppSDKiOS_ folder and the _SkypeForBusiness.framework_ file. To run your app in a **simulator**, choose the _AppSDKiOSSimulator_ folder 
and then select the **SkypeForBusiness.framework** file in that folder.

1. Add SfBConversationHelper.h and SfBConversationHelper.m files to your project. These files are found in your SDK download folder under _helpers_. 

2. **Import the SDK header file**: Add the following import statement to your header file.

      ```cpp
        #import <SkypeForBusiness/SkypeForBusiness.h>
      ```
3. If using the conversation helper, use the following import statement. _SfBConversationHelper.h_ imports the _SkypeForBusiness.h_ file.
      ```cpp
      #import "SfBConversationHelper.h"
      ```

#### Android

The configuration steps include:

1. **Copy the appsdk folder into your project structure**: Copy from your App SDK download folder into the root folder of your Android project.
The **appsdk** folder end up in folder where your **settings.gradle** file is. 

1. **Copy the annotations-1.0.jar file**: The SDK includes this jar file in the compressed download
file. Copy the jar file to the _libs_ folder inside your project module folder.

1. **Add SDK libraries to the module Gradle dependencies struct:** 
> Note: Be sure to include the ```compile fileTree(dir: 'libs', include: ['*.jar'])``` statement. 
 
  ```java
  dependencies {
      compile fileTree(dir: 'libs', include: ['*.jar'])
      compile(name: "libucmp", ext: 'aar')
      compile(name: "platform", ext: 'aar')
      compile(name: "sfb-appsdk", ext: 'aar')
      compile(name: "TelemetryService", ext: 'aar')
      compile(name: "ucmp-enums", ext: 'aar')
      compile(name: "TelemetryClient2", ext: 'aar')
      compile(name: "injector", ext: 'aar')
    
  }

  ```
1. **Add app permissions**: Add _uses-permission_ tagsto the project **AndroidManifest.xml** file. 


  ```java
      <uses-permission android:name="android.permission.INTERNET" />
      <uses-permission
          android:name="android.permission.WRITE_EXTERNAL_STORAGE"
          tools:node="replace" />
      <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
      <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
      <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
      <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
      <uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
      <uses-permission android:name="android.permission.AUTHENTICATE_ACCOUNTS" />
      <uses-permission android:name="android.permission.GET_ACCOUNTS" />
      <uses-permission android:name="android.permission.MANAGE_ACCOUNTS" />
      <uses-permission android:name="android.permission.READ_PHONE_STATE" />
      <uses-permission android:name="android.permission.VIBRATE" />
      <uses-permission android:name="android.permission.CALL_PHONE" />
      <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
      <uses-permission android:name="android.permission.RECORD_AUDIO" />
      <uses-permission android:name="android.permission.WAKE_LOCK" />
      <uses-permission android:name="android.permission.BLUETOOTH" />
      <uses-permission android:name="android.permission.CAMERA" />
      <uses-permission android:name="android.permission.READ_CONTACTS" />
      <uses-permission android:name="android.permission.WRITE_CONTACTS" />
      <uses-permission android:name="android.permission.WRITE_SETTINGS" />
      <uses-permission android:name="android.permission.READ_SYNC_STATS" />
      <uses-permission android:name="android.permission.READ_SYNC_SETTINGS" />
      <uses-permission android:name="android.permission.WRITE_SYNC_SETTINGS" />
      <uses-permission android:name="android.permission.BROADCAST_STICKY" />
      <uses-permission android:name="android.permission.READ_LOGS" />
      <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

  ```




## Next steps
Now that you've configured your project to code against the **App SDK** API, learn how to get the URL of a **Skype for Business** meeting and then use the API to enable your mobile app to join the meeting:

* [Get a meeting URL](GetMeetingURL.md)
* [Use the SDK to join a meeting with an Android device](HowToJoinMeeting.md)
* [Use the SDK to join a meeting with an iOS device](HowToJoinMeeting_iOS.md)

## Additional resources
Here are some more resources to help you build apps with the **Skype for Business App SDK**

* [App SDK samples](Samples.md) 
* [Questions, bugs, feature requests, and contributions](Feedback.md)
