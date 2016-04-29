# Use the SDK to join a meeting with an Android device

This article shows you how to enable the core  **Skype for Business** anonymous meeting join scenario in your Android app. iOS developers should read
[Use the SDK to join a meeting with an iOS device](HowToJoinMeeting_iOS.md). 

After completing the steps in this article, your app can join a **Skype for Business** video meeting with a
meeting URL. No **Skype for Business** credentials are used to join the meeting.

>Note: Be sure to read [Getting started with Skype App SDK development](GettingStarted.md) to learn how to configure your Android project for the **Skype for Business** App SDK.

The code in this sample shows the use of the _ConversationHelper_ class to let you complete the scenario with a minimum of code. 

## Android

### Add ConversationHelper.java to your project

The ConversationHelper source file is included in the **Skype for Business** App SDK download. The Android App SDK download includes 
**ConversationHelper.java**. The iOS App SDK download includes **ConversationHelper.h** and **ConversationHelper.m**. 

1. Copy ConversationHelper.java into your **Android Studio** project src folder. For example, the [Healthcare app sample ](https://github.com/OfficeDev/skype-android-app-sdk-samples/tree/master/HealthcareApp) source code path is 
_C:\android\SkypeDemo-Android\SfbWellBaby\app\src\main\java\com\microsoft\office\sfb\sfbwellbaby_. 

2. Update the package statement in ConversationHelper.java to the packages you've added the class to.

3. Declare a class that implements a callback listener for conversation state changes

  ```java
      /**
     * Callback implementation for listening for conversation property changes.
     */
    class ConversationPropertyChangeListener extends
            Observable.OnPropertyChangedCallback {
        ConversationPropertyChangeListener() {
        }

        /**
         * onProperty changed will be called by the Observable instance on a property change.
         *
         * @param sender     Observable instance.
         * @param propertyId property that has changed.
         */
        @Override
        public void onPropertyChanged(Observable sender, int propertyId) {
            Conversation conversation = (Conversation) sender;
            if (propertyId == Conversation.STATE_PROPERTY_ID) {
                if (conversation.getState() == Conversation.State.ESTABLISHED) {

                    try {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                //Update application UI to show conversation is established.
                                //Open video call fragment.

                            }
                        });
                    } catch (Exception e) {
                        Log.e("SkypeCall", "exception on meeting started");
                    }
                }
            }
        }
    }
      ```
4. Implement the **ConversationHelper.ConversationCallback** interface

  ```java
  implements ConversationHelper.ConversationCallback
    ```

5. In your code, initialize the **App SDK** application by calling the static _Application.getInstance(Context)_ method:

  ```java
  Application mApplication = Application.getInstance(this);
    ```
   >Note: Be sure to select the Application object in the _com.microsoft.office.sfb.appsdk_ package!
   
6. Start joining the meeting by calling _Application.joinMeetingAnonymously(String displayName, URI meetingUri)_   

  ```java
  conversation = mApplication
                    .joinMeetingAnonymously(
                            getString(R.string.userDisplayName), meetingURI);
  ```
  
7.  Connect the conversation property callback to the **conversation** returned in the previous step.

  ```java
      mConversation.addOnPropertyChangedCallback(new ConversationPropertyChangeListener()); 
  ```      
        
8. When the state of the conversation changes to Conversation.State.ESTABLISHED, construct a ConversationHelper object. Pass the following
objects:

  * The **conversation** object returned in a prior step
  * the **Application.DevicesManager** 
  * A **TextureView** control to show a preview of outgoing video
  * A view such as a **RelativeLayout** to contain the **MMVRSurfaceview** that will show incoming video.

  ```java

        //Initialize the conversation helper with the established conversation,
        //the SfB App SDK devices manager, the outgoing video TextureView,
        //The view container for the incoming video, and a conversation helper
        //callback.
        mConversationHelper = new ConversationHelper(
                mConversation,
                mDevicesManager,
                previewVideoTextureView,
                mParticipantVideoSurfaceView,
                this);         
                
  ```      

9. Start the incoming and outgoing meeting video.

Note that, as per the license terms, before you start video for the first time after install, you must prompt the user to accept the Microsoft end-user license (also included in the SDK).  Subsequent versions of the SDK preview will include code to assist you in doing so.

  ```java

        //Start up the incoming and outgoing video
        mConversationHelper.startOutgoingVideo();
        mConversationHelper.startIncomingVideo();
  ```      
