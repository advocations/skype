
# Outgoing P2P Call

 _**Applies to:** Skype for Business 2015_


## Starting a Call

In order to make an audio call we need to:
* create a conversation
```javascript
var conversation = application.conversationsManager.getConversation('sip:xxx');
```
* start the audio call
```javascript
conversation.audioService.start();
```

## Conversation Call State
We can subscribe to the conversation call state to get information about the overall call status.
For example: Is there an ongoing call in this conversation. This does not mean that we are connected to the call.

```javascript
conversation.state.changed(function (newValue, reason, oldValue) {
    //...
});
```

**Possible call states:**

|||
|--------------|------------------------------------------|
| *Disconnected*| ...When no call is in progress              |
| *Connecting*    | ...When establishing a connection           |
| *Connected* | ...When the call was successfully connected |

## Self Participant Call state
The `selfParticiapant` property on the `conversation` object gives us access to the `audio` modallity which 
allows us to observe the call state as a participant in the conversation.
For example: if the state changes to `"Connected"` it means we have successfully connected to the audio call.

```javascript
conversation.selfParticipant.audio.state.when('Connected', function () {
    //...
});
```

**Note:** `.when(value, callback)` Lets you subscribe to an observable and only triggers the callback when the observable changes its value to the value specified.
For Example: `state.when('Connected', callback)` will execute the `callback` when the value of state changes to "Connected".

## Complete Code Sample
Here is the code combined:

```javascript
var conversation = application.conversationsManager.getConversation('sip:xxx');
conversation.selfParticipant.audio.state.when('Connected', function () {
    console.log('Connected to audio call');
});
conversation.state.changed(function (newValue, reason, oldValue) {
    console.log('Conversation state changed from', oldValue, 'to', newValue);
});
conversation.audioService.start().then(function() {
    console.log('The call has been started successfully');
}, function (error) {
    console.log('An error occured starting the call', error);
});
```