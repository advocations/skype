# Use the SDK to join a meeting with an iOS device

This article shows you how to enable the core  **Skype for Business** anonymous meeting join scenario in your app. Android developers should read
[Use the SDK to join a meeting with an Android device](HowToJoinMeeting.md). 

After completing the steps in this article, your app can join a **Skype for Business** video meeting with a
meeting URL. No **Skype for Business** credentials are used to join the meeting.


>Note: Be sure to read [Getting started with Skype App SDK development](GettingStarted.md) to learn how to configure your Android project 
for the **Skype for Business** App SDK.

The code in this sample shows the use of the _ConversationHelper_ class to let you complete the scenario with a minimum of code. 

## Android

### Add ConversationHelper.java to your project

The ConversationHelper source file is included in the **Skype for Business** App SDK download. The Android App SDK download includes 
**ConversationHelper.java**. The iOS App SDK download includes **ConversationHelper.h** and **ConversationHelper.m**. 

1. Copy ConversationHelper.java into your **Android Studio** project src folder. For example, the [Healthcare app sample ](https://github.com/OfficeDev/skype-android-app-sdk-samples/tree/master/HealthcareApp) source code path is 
_C:\android\SkypeDemo-Android\SfbWellBaby\app\src\main\java\com\microsoft\office\sfb\sfbwellbaby_. 

2. Update the package statement in ConversationHelper.java to the packages you've added the class to.

2. Declare a class that implements a callback listener for conversation state changes

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

                                loadCallFragment();
                                ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);
                                if (progressBar != null) {
                                    progressBar.setVisibility(View.GONE);
                                }
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

3. In your code, initialize the **App SDK** application by calling the static _Application.getInstance(Context)_ method:

  ```java
  Application mApplication = Application.getInstance(this);
    ```
   >Note: Be sure to select the Application object in the _com.microsoft.office.sfb.appsdk_ package!
   
4. Start joining the meeting by calling _Application.joinMeetingAnonymously(String displayName, URI meetingUri)_   

  ```java
  conversation = mApplication
                    .joinMeetingAnonymously(
                            getString(R.string.userDisplayName), meetingURI);
  ```
  
5.  Connect the conversation property callback to the **conversation** returned in the previous step.

  ```java
      mConversation.addOnPropertyChangedCallback(new ConversationPropertyChangeListener()); 
  ```      
        