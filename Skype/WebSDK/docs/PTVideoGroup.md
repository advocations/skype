
# Group Video Conversation


 _**Applies to:** Skype for Business 2015_

## Starting a group video conversation

1. As a first step we need to create a conversation

    ```js
        var conversation = application.conversationsManager.createConversation();
    ```

1. Now we are adding a listener to display our own video when the camera is turned on.
When the listener is triggered, we can assign a DOM node as the container for the video.

    ```js
        conversation.selfParticipant.video.state.when('Connected', function () {
            // video is availabe ... lets assign a container.
            conversation.selfParticipant.video.channels(0).stream.source.sink.format('Stretch'); // formats include: 'Stretch', 'Fit' and 'Crop'
            conversation.selfParticipant.video.channels(0).stream.source.sink.container(/* DOM node such as a DIV */);
            // the video will be rendered automatically
        });
    ```
1. To render the video of the other participants in the conversation we add another listener that notifies us when
another participant joins the conversation.

    > [!Warning]
    > Group video for **Google Chrome** is rendered using a different API.
    > Please see [Group in Google Chrome](PTVideoGroupGoogleChrome.md) for more details.

    ```js
        conversation.participants.added(function (person) {
            // person.displayName() has joined the conversation

            // lets add another listener for the joined person that notifies us when they add video
            person.video.state.when('Connected', function () {
                // video is availabe ... lets assign a container.

                // formats include: 'Stretch', 'Fit' and 'Crop'
                person.video.channels(0).stream.source.sink.format('Stretch');
                person.video.channels(0).stream.source.sink.container(/* DOM node such as a DIV */);

                // now we can render it
                person.video.channels(0).isStarted(true);

                // NOTE: .isStarted() only needs to be called for remote participants in group conversations
                // it dictates wether or not the participant's video should be rendered
            });
        });
    ```

1. Last but not least we can add participants to the conversation and start the video conversation.

    ```js
        conversation.participants.add('<participant1.id>');
        conversation.participants.add('<participant2.id>');

        // starting the video conference
        conversation.videoService.start().then(null, function (error) {
            // handle error
        });
    ```

## Ending the conversation

 ```js
    conversation.leave().then(function () {
        // conversation ended
    }, function (error) {
        // handle error
    }).then(function () {
        // clean up operations
    });
```

## Complete code sample

Below is the code alltogether

```js
var conversation = application.conversationsManager.createConversation();

conversation.selfParticipant.video.state.when('Connected', function () {
    // video is availabe ... lets assign a container.
    conversation.selfParticipant.video.channels(0).stream.source.sink.format('Stretch'); // formats include: 'Stretch', 'Fit' and 'Crop'
    conversation.selfParticipant.video.channels(0).stream.source.sink.container(/* DOM node such as a DIV */);
    // the video will be rendered automatically

    conversation.participants.added(function (person) {
        // person.displayName() has joined the conversation

        // lets add another listener for the joined person that notifies us when they add video
        person.video.state.when('Connected', function () {
            // video is availabe ... lets assign a container.

            // formats include: 'Stretch', 'Fit' and 'Crop'
            person.video.channels(0).stream.source.sink.format('Stretch');
            person.video.channels(0).stream.source.sink.container(/* DOM node such as a DIV */);

            // now we can render it
            person.video.channels(0).isStarted(true);

            // NOTE: .isStarted() only needs to be called for remote participants in group conversations
            // it dictates wether or not the participant's video should be rendered
        });
    });
});

conversation.participants.add('<participant1.id>');
conversation.participants.add('<participant2.id>');

// starting the video conference
conversation.videoService.start().then(null, function (error) {
    // handle error
});
```