
# Respond to a conversation invitation

 **Last modified:** February 02, 2016

 _**Applies to:** Skype for Business 2015_

A conversation invitation is extended to the local user to join a conversation. Invitations can come from any version of the Skype for Business client, another Skype Web SDK-enabled web page, or a compatible client from the public cloud. 


## Responding to a conversation invitation

The SDK creates a set of objects and raises several events to support a new conversation. 


- A [Conversation]( https://msdn.microsoft.com/en-us/library/office/dn962132(v=office.16).aspx.md) object is created to encapsulate the incoming conversation invitation.
    
- One or more conversation service objects such as [Conversation]( https://msdn.microsoft.com/en-us/library/office/dn962132(v=office.16).aspx.md) **.chatService**,[Conversation]( https://msdn.microsoft.com/en-us/library/office/dn962132(v=office.16).aspx.md) **.audioService**, or[Conversation]( https://msdn.microsoft.com/en-us/library/office/dn962132(v=office.16).aspx.md) **.videoService** is created to encapsulate the conversation modes chosen by the caller.
    
- One or more [Participant]( https://msdn.microsoft.com/en-us/library/office/dn962129(v=office.16).aspx.md) objects are created to represent the people in the conversation.
    
- The state of one of the conversation's modalities becomes "Notified."
    
At this moment, the app must call the  **accept()** method or the **decline()** method on the[ConversationService]( https://msdn.microsoft.com/en-us/library/office/mt657711(v=office.16).aspx.md) modality object. Whether the call is taken or declined depends on which method is called.

The following procedure catches the conversation-related "added" events, forms a UI prompt, accepts the user's action, and updates the app UI to show the right kind of content:


### Respond to a conversation invitation


1. Listen for the  **added** event on the[ConversationsManager]( https://msdn.microsoft.com/en-us/library/office/dn962151(v=office.16).aspx.md) **.conversations** collection for new conversations.
    
2. For a new conversation, listen for change events on the service's  **state** property as enumerated[CallConnectionState]( https://msdn.microsoft.com/en-us/library/office/mt657736(v=office.16).aspx.md) . If the state is 'Notified', then it indicates the incoming invite.
    
3. If it is an incoming IM invite, call the [ChatService]( https://msdn.microsoft.com/en-us/library/office/dn962148(v=office.16).aspx.md) **.accept** method to accept the invite.
    
4. You may call the [ChatService]( https://msdn.microsoft.com/en-us/library/office/dn962148(v=office.16).aspx.md) **reject** method to decline the invite.
    
The following example shows how to accept an incoming IM call.




```js
//Register a listener for incoming calls
conversationsManager.conversations.added(function (conversation) {
    if (conversation.chatService.accept.enabled()) {
        // this is an incoming IM call
        conversation.chatService.accept();
    }
});

```

The following example shows how to reject an incoming IM call.




```js
//Register a listener for incoming calls
conversationsManager.conversations.added(function (conversation) {
    if (conversation.chatService.enabled()) {
        // this is an incoming IM call
        Conversation.chatService.reject();
    }
});

```

The following example shows how to accept an incoming audio call.




```js
//Register a listener for incoming calls
conversationsManager.conversations.added(function (conversation) {
    if (conversation.audioService.accept.enabled()) {
        // this is an incoming audio call
        conversation.audioService.accept();
    }
});

```

The following example shows how to reject an incoming audio call.




```js
//Register a listener for incoming calls
conversationsManager.conversations.added(function (conversation) {
    if (conversation.audioService.enabled()) {
        // this is an incoming audio call
        Conversation.audioService.reject();
    }
});

```

The following example shows how to accept an incoming video call.




```js
//Register a listener for incoming calls
conversationsManager.conversations.added(function (conversation) {
    if (conversation.videoService.accept.enabled()) {
        // this is an incoming video call
        conversation.videoService.accept();
    }
});

```

The following example shows how to reject an incoming video call.




```js
//Register a listener for incoming calls
conversationsManager.conversations.added(function (conversation) {
    if (conversation.videoService.enabled()) {
        // this is an incoming video call
        Conversation.videoService.reject();
    }
});

```


## See also


#### Concepts


[Send and receive text in a conversation]( /SendReceiveText.md)<br/>
[Add participants to a conversation]( /AddParticipants.md)
