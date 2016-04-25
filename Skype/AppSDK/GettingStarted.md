# Getting started with Skype App SDK development 

This section shows how to get started developing mobile applications with the Skype App SDK. It also provides guidance on using the Skype App SDK samples.

## Download the Skype App SDK

The SDKs for iOS and Android are available for download from Microsoft. 
* [Skype for Business App SDK - iOS](http://aka.ms/sfbAppSDKDownload_ios)
* [Skype for Business App SDK - Android](http://aka.ms/sfbAppSDKDownload_android)

<!--- Can add back comment on structure of download, once Dev made final decision on this.  -->
 
<!--- Split instructions at this point.  1. Run sample app (still needs meeting URL).  2.  Add SDK to your own app.  Also split by platform too?   -->


## Configure your project for the Skype for Business App SDK

You can start coding with the App SDK after you complete the following configuration tasks for your platform.

#### iOS

The configuration steps include:

##### Add embedded binaries

Add embedded binaries for the App SDK in your XCode project.

<!--- Add precise Xcode instructions to do this.  I can show you on my Mac -->

The SDK comes with a binary for use on physical devices and a binary for running the iOS emulator. The binaries have the same name but are in separate folders. 

* To run your app on a device, navigate to the location where you downloaded the App SDK and choose the **AppSDKiOS** folder and the **SFB.framework** file. 

* To debug your app on an emulator, choose the **AppSDKiOSSimulator** folder and then select the **SFB.Framework** file in that folder.

##### Reference the API header file

Add the following import statement to your header file.
```cpp
#import <SFB/SFB.h>
```


#### Android
The android libraries are added to the Dependencies structure of the build.gradle file for your project module. 

##### Gradle dependencies

```java
dependencies {
    compile fileTree(include: ['*.jar'], dir: 'libs')
    compile(name: "libucmp-release", ext: 'aar')
    compile(name: "platform-release", ext: 'aar')
    compile(name: "library-release", ext: 'aar')
    compile(name: "sfb-appsdk-release", ext: 'aar')
    
}

```

##### AndroidManifest permissions

<!--- Let's discuss this. -->


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

##### Importing App SDK classes

Import the following API objects. 

>Note: Android Studio automatically adds these imports when you reference the objects in your code. If you configure Android Studio to automatically optmize import statements,
the import statements are removed by Android Studio unless you have referenced the objects
in code.

```java 
import com.microsoft.office.sfb.appsdk.Application;
import com.microsoft.office.sfb.appsdk.Camera;
import com.microsoft.office.sfb.appsdk.Conversation;
import com.microsoft.office.sfb.appsdk.DevicesManager;
import com.microsoft.office.sfb.appsdk.Observable;
import com.microsoft.office.sfb.appsdk.SFBException;
import com.microsoft.office.sfb.appsdk.VideoService;
```

<!--- Let's discuss this too. -->


## Next steps
Now that you've configured your project to code against the **App SDK** API, learn how to get the URL of a **Skype for Business** meeting and then use the API to enable your mobile app to join the meeting:

* [Get a meeting URL](GetMeetingURL.md)
* [Use the SDK to join a meeting](UseSDKtoJoinMeeting.md)
