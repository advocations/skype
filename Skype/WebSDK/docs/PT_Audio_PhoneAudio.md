
# Phone Audio Call

 _**Applies to:** Skype for Business 2015_
 
 _**Prerequisites:** To use Phone Audio, user needs a valid Office 365 Enterprise E5 license with PSTN calling set up_

## Starting a Phone Audio Call

In order to make a phone audio call we need to:
* create a conversation
```javascript
var conversation = application.conversationsManager.getConversation('sip:XXXX');
```
* start the audio call with the user, specifying the phone # where we want to connect the phone audio from
```javascript
conversation.phoneAudioService.start({ teluri: 'tel:+1XXXX' });
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
| *Created* | ...When conversation was created
| *Connecting*    | ...When establishing a connection           |
| *Connected* | ...When the call was successfully connected |
| *Disconnected* | ...When the conversation got disconnected |

## Self Participant Call state
The `state` property on the `phoneAudioService` allows us to observe the call state.
For example: if the state changes to `"Connected"` it means we have successfully connected to the phone audio call.

```javascript
conversation.phoneAudioService.state.when('Connected', function () {
    //...
});
```

**Note:** `.when(value, callback)` Lets you subscribe to an observable and only triggers the callback when the observable changes its value to the value specified.
For Example: `state.when('Connected', callback)` will execute the `callback` when the value of state changes to "Connected".

## Participants in Conversation
You can subscribe to the `participants` collection on the `conversation` object to be notified when new perticipants enter the conversation.

```javascript
conversation.participants.added(function (participant) {
    // ...
});
```

## Ending a Call
To end the call, simply leave the conversation

```javascript
conversation.leave().then(function () {
    // successfully left the conversation
}, function (error) {
    // error
});
```

## Complete Code Sample
Here is the code combined:

```javascript
var conversation = application.conversationsManager.getConversation('sip:XXXX');
conversation.phoneAudioService.state.when('Connected', function () {
    // connected to phone audio
});
conversation.state.changed(function (newValue, reason, oldValue) {
    // Conversation state changed from oldValue to newValue
});
conversation.participants.added(function (participant) {
    // participant.displayName() has been added to the conversation
});
conversation.phoneAudioService.start({teluri: 'tel:+1XXXX'}).then(function() {
    // successfully started call
}, function (error) {
    // handle error
});
```