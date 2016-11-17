
# Incoming P2P Video Conversation


 _**Applies to:** Skype for Business 2015_

## Receiving a video invitation

The application object exposes a conversationsManager object that exposes a conversations collection which we can attach an event listener for added to be notified when new invitations for conversations arrive.  When a conversation is added we can add an event listener for when the videoService object accept command is enabled which means that this conversation would be for video.  We also should listen for when participants are connected to video and when we disconnect from the conversation.
    
When the accept command is enabled we can choose to either accept the invitation or reject via respective commands and in this example it is handled via confirm(...).  In the case of accepting the invitation, we should add event listeners for added participants.

When either the selfParticipant or other persons are conencted to video we also need to setup the DOM element where the video should be displayed.  This configuration can be handled by getting access to the sink object by walking from the person object to the video modality to the channels collection choosing the first, or channels(0), which gives us access to the stream object which has a source object which finally points us to the sink object.  The sink object has a format property that can accept video formatting options such as Stretch, Fit, and Crop.  The sink object also exposes a container property where we can provide a DOM element where the video will be inserted.

After the conversation and video modality are established we can begin communicating with the remote party.  When finished click the end button to terminate the conversation.

### Receive an incoming video conversation request

1. Listen for incoming video invitation, and accept/reject it based on user response 

  ```js
    var conversationsManager = application.conversationsManager;
    listeners.push(conversationsManager.conversations.added(function (conv) {
        conversation = conv;
        function setupContainer(person, size, videoDiv) {
            person.video.channels(0).stream.source.sink.format('Stretch');
            person.video.channels(0).stream.source.sink.container(videoDiv);
        }
        listeners.push(conversation.videoService.accept.enabled.when(true, function () {
            // showModal('Accept incoming video invitation?');
            if (USER_ACCEPT_INCOMING_VIDEO) {
                conversation.videoService.accept();
                listeners.push(conversation.participants.added(function (person) {
                    // person.displayName() has joined the conversation
                    listeners.push(person.video.state.when('Connected', function () {
                        // set up remote video container
                        setupContainer(person, 'large', content.querySelector('.remoteVideoContainer'));
                    }));
                }));
            }
            else {
                conversation.videoService.reject();
            }
        }));

        listeners.push(conversation.selfParticipant.video.state.when('Connected', function () {
            // set up remote video container
            setupContainer(conversation.selfParticipant, 'small', content.querySelector('.selfVideoContainer'));
        }));

        listeners.push(conversation.state.changed(function (newValue, reason, oldValue) {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                // conversation ended
            }
        }));
  ```

2. End the conversation

  ```js
    conversation.leave().then(function () {
        // conversation ended
    }, function (error) {
        // handle error
    }).then(function () {
        // clean up operations
    });
  ```
