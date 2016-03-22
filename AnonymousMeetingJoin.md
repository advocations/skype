
# Join a meeting anonymously

 **Last modified:** March 22, 2015

 _**Applies to:** Skype for Business_

A client can join an existing meeting anonymously with that meeting's URI.

 **Organizer**:

1. Schedules a Skype for Business conference and shares meeting URI with the user.
    
2. Ensures conference allows all users to join the conference.
    
**Anonymous users**:

Once they have a meeting URI from the organizer, for example: `sip:user@contoso.com;gruu;opaque=app:conf:focus:id:1WRB13D2`, they first need to:

1. Sign in the anonymous user using the meeting URI.
    
2. Get the conversation object for this conference.
    
3. Start the needed service in the conversation.
 
### Joining a meeting anonymously


1. Sign in the anonymous user using the meeting URI.

   ```js
   var uri = 'sip:user@contoso.com;gruu;opaque-app:conf:focus:id:1WRB13D2';
   application.signInManager.signIn({
     name: 'Robin',
     meeting: uri
   });
   ```

2. Create a conversation object for this conference.

  ```js
  var conversation = application.conversationsManager.getConversationByUri(uri);
  ```

3. Start the needed service in the conversation.

  ```js
  conversation.chatService.start().then(function() {
	// Successfully joined conversation chat
	...
  });
  ```

4.  **Alternatively:** clients may also join the meeting by starting the audio service.

  ```js
  conversation.audioService.start().then(function() {
	// Successfully joined conversation audio
  });
  ```

  or clients can join the meeting by starting the video service.
  
  ```js
  conversation.videoService.start().then(function() {
	// Successfully joined conversation video
  });
  ```

