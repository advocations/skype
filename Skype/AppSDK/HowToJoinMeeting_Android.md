# Use the SDK to join a meeting with an Android device

This article shows you how to enable the core  **Skype for Business** anonymous meeting join scenario in your Android app. iOS developers should read
[Use the SDK to join a meeting with an iOS device](HowToJoinMeeting_iOS.md). 

After completing the steps in this article, your app can join a **Skype for Business** video meeting with a
meeting URL. No **Skype for Business** credentials are used to join the meeting.

>Note: Be sure to read [Getting started with Skype App SDK development](GettingStarted.md) to learn how to configure your Android project for the **Skype for Business** App SDK.  In particular, the following steps assume you have added the _ConversationHelper_ class to your source to let you complete the scenario with a minimum of code. 

1. Initialize the **App SDK** application by calling the static _com.microsoft.office.sfb.appsdk.Application.getInstance(Context)_ method:

   ```java
   Application mApplication = com.microsoft.office.sfb.appsdk.Application.getInstance(this.getBaseContext());
   AnonymousSession mAnonymousSession = null;
   Conversation mConversation = null;
   ```
   >Note: Be sure to select the Application object in the _com.microsoft.office.sfb.appsdk_ package!
   
1. Enable platform preview features and set wifi required for audio/video
   ```java
   mApplication.getConfigurationManager().enablePreviewFeatures(true);
   mApplication.getConfigurationManager().setRequireWiFiForAudio(true);
   mApplication.getConfigurationManager().setRequireWiFiForVideo(true);
   mApplication.getConfigurationManager().setMaxVideoChannelCount(2);
   
   ```
1. Start joining the meeting by calling _Application.joinMeetingAnonymously(String displayName, URI meetingUri)_   

   ```java
            mAnonymousSession = mApplication
                    .joinMeetingAnonymously(
                            getString(
                                    R.string.userDisplayName), meetingURI);
   
   ```
   > Note: all of the SDK’s interfaces must be used only from the application main thread (main run loop).  Notifications are delivered in the same thread as well.  As a result, no synchronization around the SDK’s interfaces is required.  The SDK, however, may create threads for internal purposes.      

1. Get the [**Conversation**](https://ucwa.skype.com/reference/appSDK/Android/com/microsoft/office/sfb/appsdk/Conversation.html) object that encapsulates the meeting from the [**AnonymousSession**](https://ucwa.skype.com/reference/appSDK/Android/com/microsoft/office/sfb/appsdk/AnonymousSession.html) object by calling _getConversation()_ on the anonymous session.  
   ```java
     mConversation = mAnonymousSession.getConversation();
   ```  
1. Connect the conversation property callback to the [**Conversation**](https://ucwa.skype.com/reference/appSDK/Android/com/microsoft/office/sfb/appsdk/Conversation.html) object returned in the previous step.
   ```java
       mConversation.addOnPropertyChangedCallback(
           new ConversationPropertyChangeListener()); 
   ```
   - Declare a callback class to handle conversation property change Notifications
   ```java
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

                    Log.e("SkypeCall", conversation
                            .getMeetingInfo()
                            .getMeetingDescription()
                            + " is established");

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

   ```
1. When the state of the conversation changes to Conversation.State.ESTABLISHED, construct a ConversationHelper object. Pass the following objects:
   * The [**Conversation**](https://ucwa.skype.com/reference/appSDK/Android/com/microsoft/office/sfb/appsdk/Conversation.html) object returned in a prior step
   * the [**Application.DevicesManager**](https://ucwa.skype.com/reference/appSDK/Android/com/microsoft/office/sfb/appsdk/DevicesManager.html)
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
   >Note: The [The ConversationHelper class](./ConversationHelperCodeList.md) makes it possible to start a video conversation and
   handle related events on the conversation, participants, and video streams. You don't have to use the **ConversationHelper**. If your 
   application scenario has requirements that are not covered in this how to article, take the **ConversationHelper** as a starting point and modify or 
   extend it to suite your requirements.

1. Start the incoming and outgoing meeting video.

   >Note: as per the license terms, before you start video for the first time after install, you must prompt the user to accept the Microsoft end-user license (also included in the SDK).  Subsequent versions of the SDK preview will include code to assist you in doing so.

   ```java
         //Start up the incoming and outgoing video
         mConversationHelper.startOutgoingVideo();
         mConversationHelper.startIncomingVideo();
   ```


1. Implement the **ConversationHelper.ConversationCallback** interface

   ```java
     implements ConversationHelper.ConversationCallback
   ```

---
## Sample code
The code steps shown in this topic are put together in a sample that we've published on GitHub. You can find Android and iOS samples for joining a meeting anonymously by navigating the links in the [Sample applications for the Skype for Business App SDK](./Samples.md) article. 

You can look at the complete conversation helper class code listing in [The ConversationHelper class](./ConversationHelperCodeList.md). 