
# Outgoing P2P/PSTN Call

 _**Applies to:** Skype for Business 2015_

## Starting a Call

In order to make an audio call we need to:
* create a conversation
```js
var conversation = application.conversationsManager.getConversation('sip:XXXX');
OR
var conversation = application.conversationsManager.getConversation('tel:+XXXX');
```
* start the audio call
```js
conversation.audioService.start();
```

## Conversation Call State
We can subscribe to the conversation call state to get information about the overall call status.
For example: Is there an ongoing call in this conversation. This does not mean that we are connected to the call.

```js
conversation.state.changed(function (newValue, reason, oldValue) {
    //...
});
```

**Possible call states:**

|||
|--------------|------------------------------------------|
| *Created* | ...When conversation was created
| *Connecting*    | ...When establishing a connection           |
| *Connected* | ...When the call was successfully connected |
| *Disconnected* | ...When the conversation got disconnected |

## Self Participant Call state
The `selfParticipant` property on the `conversation` object gives us access to the `audio` modallity which 
allows us to observe the call state as a participant in the conversation.
For example: if the state changes to `"Connected"` it means we have successfully connected to the audio call.

```js
conversation.selfParticipant.audio.state.when('Connected', function () {
    //...
});
```

**Note:** `.when(value, callback)` Lets you subscribe to an observable and only triggers the callback when the observable changes its value to the value specified.
For Example: `state.when('Connected', callback)` will execute the `callback` when the value of state changes to "Connected".

## Participants in Conversation
You can subscribe to the `participants` collection on the `conversation` object to be notified when new perticipants enter the conversation.

```js
conversation.participants.added(function (participant) {
    // ...
});
```

## Ending a Call
To end the call, simply leave the conversation

```js
conversation.leave().then(function () {
    // successfully left the conversation
}, function (error) {
    // error
});
```

## Complete Code Sample
Here is the code combined:

```js
var conversation = application.conversationsManager.getConversation('sip:XXXX');
OR
var conversation = application.conversationsManager.getConversation('tel:+XXXX');
conversation.selfParticipant.audio.state.when('Connected', function () {
    console.log('Connected to audio call');
});
conversation.state.changed(function (newValue, reason, oldValue) {
    console.log('Conversation state changed from', oldValue, 'to', newValue);
});
conversation.participants.added(function (participant) {
    console.log('Participant:', participant.displayName(), 'has been added to the conversation');
});
conversation.audioService.start().then(function() {
    console.log('The call has been started successfully');
}, function (error) {
    console.log('An error occured starting the call', error);
});
```