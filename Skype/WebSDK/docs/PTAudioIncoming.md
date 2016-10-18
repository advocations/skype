
# Incoming P2P/PSTN Call

 _**Applies to:** Skype for Business 2015_

## Listening for incoming call notifications

When a remote user starts a call we will receive an invitation to join the call.
In order to see the notification we need to:
* Listen to the conversation collection for newly added conversations
 ```js
application.conversationsManager.conversations.added(function (conversation) {
    // ...
});
```
* For every added conversation we need to observer the `audioService.accept.enabled` command.
```js
conversation.audioService.accept.enabled.when(true, function () {
    // ....
})
```
* When the command becomes available we have received a notification. We can now prompt the user to accept ot decline the invitation.
When the user accepts, we execute `conversation.audioService.accept()`. When they reject `conversation.audioService.reject()` is executed.
```js
if (confirm('Accept incoming Audio invitation?')) {
    conversation.audioService.accept();
} else {
    conversation.audioService.reject();
}
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

## Participants in Conversation
In case the invitation is accepted we should subscribe to the `participants` collection on the `conversation` object to be notified when new participants enter the conversation.

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
conversationsManager.conversations.added(function (conversation) {
    conversation.audioService.accept.enabled.when(true, function () {
        if (confirm('Accept incoming Audio invitation?')) {
            conversation.audioService.accept();
            conversation.participants.added(function (participant) {
                console.log('Participant:', participant.displayName(), 'has been added to the conversation');
            });
        } else {
            conversation.audioService.reject();
        }
    });

    conversation.state.changed(function (newValue, reason, oldValue) {
        console.log('Conversation state changed from', oldValue, 'to', newValue);
    });
});
```
