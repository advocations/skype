
# Audio/Video in Google Chrome



 _**Applies to:** Skype for Business 2015_

At the moment we only support one incoming video channel in Google Chrome. 
To still render video of multiple participants in a conversation we have introduced the **Active Speaker** API.

Through the API the video of the currently speaking participant is sent over the one available channel.

## Active Speaker API

### How fo I know when to use the Active Speaker API?
```js
    var conversation = application.conversationsManager.createConversation();
    if (conversation.videoService.videoMode() === 'ActiveSpeaker') {
        // use the Active Speaker API
    }
```

### How do I render the Active Speaker Channel?
```js
    // set up listener to detect if someone is actively speaking
    conversation.videoService.activeSpeaker.participant.changed(function (participant) {
        // participant.displayName() is speaking

        // lets render the video if the currently speaking participant is not myself
        if (participant !== conversation.selfParticipant) {
            var channel = conversation.videoService.activeSpeaker.channel;
            channel.source.sink.container(/* DOM element such as DIV*/);
            channel.isStarted(true);
        }
    });
```

When the active speaker changes, the video will update to display the stream of the currently speaking person.