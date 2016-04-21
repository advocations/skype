# Getting started with Skype App SDK development 

This section shows how to get started developing mobile applications with the Skype App SDK. It also provides guidance on using the Skype App SDK samples.

##Using the Skype App SDK in your application

The native libraries for the Android and iOS platforms are available for download from [](). The download is a compressed file that includes the libraries and a set of source files. 
For the Android SDK, the source files include the helper interface and implementing class. The iOS SDK source files include a helper header and implementing method file.  

### Configure your project for the Skype for Business App SDK

You can start coding and building your project with the App SDK after you complete the following
configuration tasks for your platform.

#### iOS

The configuration steps include:

##### Add embedded binaries

Add embeded binaries for the App SDK in your XCode project. The SDK comes with a binary for use on physical devices
and a binary for running the iOS emulator. The binaries have the same name but are in separate folders. For running your app on a device, choose the 
**AppSDKiOS** folder and the **SFB.framework** file. For running on the emulator, choose the **AppSDKiOSSimulator** folder and then select the **SFB.Framework** file in that folder.

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
    testCompile 'junit:junit:4.12'
    compile(name: "libucmp-release", ext: 'aar')
    compile(name: "platform-release", ext: 'aar')
    compile(name: "library-release", ext: 'aar')
    compile(name: "sfb-appsdk-release", ext: 'aar')
    compile 'com.android.support:appcompat-v7:22.2.1'
    compile 'com.android.support:design:22.2.1'
    compile 'com.android.support:support-v4:22.2.1'
    compile 'com.android.support:recyclerview-v7:22.2.1'
    compile 'com.android.support:cardview-v7:22.2.1'
}

```

##### AndroidManifest permissions


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

### The helper classes

The helpers let you add the anonymous meeting join feature  