
# Mute/ Unmute Call

 _**Applies to:** Skype for Business 2015_


## Putting an audio call on mute

The application object exposes a conversationsManager object which we can use to create new conversations by calling getConversation(...) and providing a SIP URI.  After creation of the conversation object it is helpful to setup a few event listeners for when we are connected to audio, added participants, and when we disconnect from the conversation.  We can use the audioService on the conversation object and call start() to initate the call and send an invitation.

Using the audio property on the selfParticipant we can get access to isMuted property and set the value to true.  This will mute the local audio in the conversation.  Participants will be unable to hear audio from the muted participant.  In a group audio conversation, a leader is able to mute other participants to control who is actively speaking.

After the conversation and audio modality are established we can begin communicating with the remote party.  When finished click the end button to terminate the conversation.


### Mute/ unmute an audio call

1. Start an audio call

    ```js
    var conversationsManager = window.framework.application.conversationsManager;
    var id = content.querySelector('.id').value;
    conversation = conversationsManager.getConversation(id);
    listeners.push(conversation.selfParticipant.audio.state.when('Connected', function () {
        // connected to audio
    }));
    listeners.push(conversation.participants.added(function (person) {
        // person.displayName() has joined the conversation
    }));
    listeners.push(conversation.state.changed(function (newValue, reason, oldValue) {
        if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
            // conversation ended
        }
    }));
    conversation.audioService.start().then(null, function (error) {
        // handle error
    });
    ```

2. Mute an audio call

    ```js
    var participant = conversation.selfParticipant;
    var audio = participant.audio;
    audio.isMuted.set(true).then(function () {
        // successfully muted call
    }, function (error) {
        // handle error
    });
    ```
3. Unute an audio call

    ```js
    var participant = conversation.selfParticipant;
    var audio = participant.audio;
    audio.isMuted.set(false).then(function () {
        // successfully unmuted call
    }, function (error) {
        // handle error
    });
    ```

4. End the conversation

  ```js
    conversation.leave().then(function () {
        // conversation ended
    }, function (error) {
        // handle error
    }).then(function () {
        // clean up operations
    });
  ```
