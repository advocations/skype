# Use the SDK to join a meeting with an iOS device

This article shows an iOS developer how to enable the core  **Skype for Business** anonymous meeting join scenario in your app. Android developers should read
[Use the SDK to join a meeting with an Android device](HowToJoinMeeting.md). 

After completing the steps in this article, your app can join a **Skype for Business** video meeting with a
meeting URL. No **Skype for Business** credentials are used to join the meeting.


>Note: Be sure to read [Getting started with Skype App SDK development](GettingStarted.md) to learn how to configure your iOS project 
for the **Skype for Business** App SDK.

The code in this sample shows the use of the _SfBConversationHelper_ class to let you complete the scenario with a minimum of code. 


## Add SfBConversationHelper  to your project

The SfBConversationHelper source files are included in the **Skype for Business** App SDK download. The iOS App SDK download includes 
The iOS App SDK download includes **SfBConversationHelper.h** and **SfBConversationHelper.m**. 

1. Copy SfBConversationHelper.h and SfBConversationHelper.m into your **XCode** project source folder.  

2. Import the SfBConversationHelper to the method file where you will call the API ```#import "SfBConversationHelper.h"```.

  > Note: as per the license terms, before you start video for the first time after install, you must prompt the user to accept the Microsoft end-user license (also included in the SDK).  Subsequent versions of the SDK preview will include code to assist you in doing so.
  
2. Declare methods that implement a callback listeners for video service state changes

    ```java
      #pragma mark - Skype Delegates
    // At incoming video, unhide the participant video view
    - (void)conversationHelper:(SfBConversationHelper *)avHelper didSubscribeToVideo:(SfBParticipantVideo *)video {
        self.participantVideoView.hidden = NO; 
    }

    // When video service is ready to start, unhide self video view and start the service.
    - (void)conversationHelper:(SfBConversationHelper *)avHelper videoService:(SfBVideoService *)videoService didChangeCanStart:(BOOL)canStart {
        if (canStart) {
            if (self.selfVideoView.hidden) {
                self.selfVideoView.hidden = NO;
            }
        
            [videoService start:nil];
        } 
   }

    // When the audio status changes, reflect in UI
    - (void)conversationHelper:(SfBConversationHelper *)avHelper selfAudio:(SfBParticipantAudio *)audio didChangeIsMuted:(BOOL)isMuted {

        if (!isMuted) {
            [self.muteButton setTitle:@"Unmute" forState:UIControlStateNormal];
        }
        else {
            [self.muteButton setTitle:@"Mute" forState:UIControlStateNormal];
        } 
    }
      ```   
         
3. In your code, initialize the **App SDK** application :

  ```java
   SfBApplication *sfb = SfBApplication.sharedApplication;
    ```
4. Start joining the meeting by calling _Application.joinMeetingAnonymously(String displayName, URI meetingUri)_   

  ```java
   SfBConversation *conversation = [sfb joinMeetingAnonymousWithUri:[NSURL URLWithString:meetingURLString]
                                                         displayName:meetingDisplayName
                                                               error:&error];
  ```
  
5.  Initialize the conversation helper with the callback methods in the previous step.

  ```java
       if (conversation) {
        [conversation addObserver:self forKeyPath:@"canLeave" options:NSKeyValueObservingOptionInitial | NSKeyValueObservingOptionNew context:nil];
        
        _conversationHelper = [[SfBConversationHelper alloc] initWithConversation:conversation
                                                                         delegate:self
                                                                   devicesManager:sfb.devicesManager
                                                                outgoingVideoView:self.selfVideoView
                                                               incomingVideoLayer:(CAEAGLLayer *) self.participantVideoView.layer
                                                                         userInfo:@{DisplayNameInfo:meetingDisplayName}]; 
  ```      
        