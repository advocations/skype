# Use the SDK to join a meeting with an iOS device

This article shows an iOS developer how to enable the core  **Skype for Business** anonymous meeting join scenario in your app. Android developers should read
[Use the SDK to join a meeting with an Android device](HowToJoinMeeting_Android.md). 

After completing the steps in this article, your app can join a **Skype for Business** video meeting with a
meeting URL. No **Skype for Business** credentials are used to join the meeting.

>Note: Be sure to read [Getting started with Skype App SDK development](GettingStarted.md) to learn how to configure your iOS project for the **Skype for Business** App SDK.  In particular, the following steps assume you have added the _ConversationHelper_ class to your source to let you complete the scenario with a minimum of code. 

1. In your code, initialize the **App SDK** application :

  ```java
   SfBApplication *sfb = SfBApplication.sharedApplication;
    ```
    
2. Start joining the meeting by calling _Application.joinMeetingAnonymously(String displayName, URI meetingUri)_   

  > Note: all of the SDK’s interfaces must be used only from the application main thread (main run loop).  Notifications are delivered in the same thread as well.  As a result, no synchronization around the SDK’s interfaces is required.  The SDK, however, may create threads for internal purposes.      

  ```java
   SfBConversation *conversation = [sfb joinMeetingAnonymousWithUri:[NSURL URLWithString:meetingURLString]
                                                         displayName:meetingDisplayName
                                                               error:&error];
  ```
  
3.  Initialize the conversation helper with the callback methods in the previous step.  This will automatically start incoming and outgoing video.
  
  > Note: as per the license terms, before you start video for the first time after install, you must prompt the user to accept the Microsoft end-user license (also included in the SDK).  Subsequent versions of the SDK preview will include code to assist you in doing so.

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
        
4. Declare methods that implement a callback listeners for video service state changes.

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