# Handling multiple incoming calls using hold/resume

## Contents
- [Overview](#overview)
- [Sample logic flow](#logic)
- [Sample implementation](#implementation)
- [Multi-tab apps](#multitab)
- [Known Issues](#knownissues)

---
## Overview <a id="overview"></a>

The Skype Web SDK can support scenarios where an application receives an incoming call
while already in another call. It is the responsibility of the sdk consumer to implement
logic of their choosing to handle this scenario, but in the future the sdk may change to provide
a couple of standard options.

When an application using the sdk receives an incoming call, a conversation will be created
with its audioService or videoService in the 'Notified' state. What to do at this point will
vary with the specific needs of the application. This document will outline one possibility.

---
## Sample logic flow <a id="logic"></a>

This is one option for handling the scenario of receiving a second call during an ongoing
AV call. I will refer to audioService in these instructions, but know that the same logic
applies in the case of video calls with a few small additions.

1. Application receives incoming audio call.
2. A new conversation will be created to represent the incoming call with audioService in the 
   'Notified' state.
3. In this state, audioService.accept() and audioService.reject() will be enabled for the new 
   conversation.
4. User can either accept or decline the second call.
5. If user accepts, the first call is automatically put on hold and the second call is answered,
   when the user hangs up, the user is prompted to resume the first call.
6. If the user rejects, the first call is continued.

---
## Sample implementation <a id="implementation"></a>

An application needs to do the following to implement this logic flow:

1. Listen for added conversations.
2. When one is added with an audioService in the 'Notified' state, that indicates an incoming
   audio call.
3. Display a prompt to allow the user to accept or reject the incoming call.
4. If user rejects, simply call `audioService.reject()` on the new conversation.
5. Otherwise, put any ongoing call on hold by calling `conversation.selfParticipant.audio.isOnHold(true)`.
6. Somehow keep track of the ongoing conversation in order to automatically resume it later.
7. Call `audioService.accept()` on the new incoming conversation.
8. When the second call is complete, either search for conversations where
   `conversation.selfParticipant.audio.isOnHold() == true` or reference wherever the app 'kept track'
   the first conversation in step 6.
9. Call `conversation.selfParticipant.audio.isOnHold(false)` to resume the original call.

### Code sample

This code is functional except for a few parts that the developer has to fill in, such as the
initial authentication. In addition, this code can handle both audio and video calls and includes
comments about additional logic that's required in the video case.

```javascript
Skype.initialize({
    apiKey: "..." // Ensure using an api key that includes AV support
}).then(api => {
    var app = new api.application();

    app.signInManager.signIn({
        client_id: "...",
        origins: [ "..." ],
    }).then(() => {

        // Step 1
        app.conversationsManager.conversations.added(onConversationAdded);

        function onConversationAdded(conv) {
            var name = conv.participants(0).displayName();
            var selfParticipant = conv.selfParticipant;
            var participant = conv.participants(0);

            function holdAnyOngoingCall(modality) {

                // Step 8
                function promptToResume(heldAVCall) {
                    var heldAVCallName = heldAVCall.participants(0).displayName();

                    if (confirm('Resume previous call with ' + heldAVCallName + '?')) {
                        // Step 9
                        heldAVCall.selfParticipant.audio.isOnHold(false);
                    }
                    else
                        console.log('Previous call with ' + heldAVCallName + ' is still on hold.');
                }
                
                // Step 6
                var ongoingAVCall = client.conversationsManager.conversations().filter(function (c) {
                        return c.audioService.state() == 'Connected' && 
                                c.selfParticipant.audio.isOnHold() == false;
                })[0];

                if (!ongoingAVCall)
                    console.log('no ongoing call');
                else {
                    // Step 5
                    ongoingAVCall.selfParticipant.audio.isOnHold(true);

                    if (modality == 'video') {
                        // Note in the video case, you have to manually turn self video back on after resuming, and
                        // you need to do additional management of the video containers if you're using a single container
                        // for all video. When putting a call on hold, you should set the videoStream.source.sink.container
                        // to null, and then restore it when the call is resumed. Using the same HTML element as
                        // the container for multiple video streams, held or not, has unpredictable results.
                        conv.videoService.state.once('Disconnected', function () { promptToResume(ongoingAVCall); });
                    }
                    else
                        conv.audioService.state.once('Disconnected', function () { promptToResume(ongoingAVCall); });
                }
            }

            // Step 2
            conv.videoService.state.when('Notified', function () {
                // Step 3
                if (confirm('Accept incoming video call from ' + name + '?')) {
                    holdAnyOngoingCall('video');

                    // Step 7
                    conv.videoService.accept();
                }
                else {
                    // Step 4
                    conv.videoService.reject();
                }
            });

            // Step 2
            conv.audioService.state.when('Notified', function () {
                if (conv.videoService.state() == 'Notified')
                    return;
                // Step 3
                if (confirm('Accept incoming call from ' + name + '?')) {
                    holdAnyOngoingCall();

                    // Step 7
                    conv.audioService.accept();
                }
                else {
                    // Step 4
                    conv.audioService.reject();
                }
            });

            selfParticipant.audio.isOnHold.changed(function (onHold) {
                selfParticipant.video.channels(0).stream.source.sink.container(onHold ? null : /* Fill this in with some HTML element */ );
                participant.video.channels(0).stream.source.sink.container(onHold ? null : /* Fill this in with some HTML element */ );                    
            });
        }
    });
});
```
---
## Multi-tab apps <a id="multitab"></a>

Note that if the same user is signed in to an SfB account on multiple tabs, when the user receives
an incoming call she will be notified on all tabs. However, after accepting the call, all subsequent
actions related to that call must be performed from the same tab. The same is true for outgoing calls.
All subsequent actions to control the call must be performed in the same tab in which the call was 
initiated/accepted. These actions include:

- hold/resume
- mute/unmute
- start/stop video
- add participant
- end call

---
## Known Issues <a id="knownissues"></a>

There is an ongoing issue in Microsoft Edge that prevents the above flow from working as intended.
When the user accepts a second incoming call, the first call will be put on hold but the second
call will fail to connect. This issue is being investigated and will be resolved soon.

The code sample has been tested in IE and Safari and works on both browsers assuming the plugin
is correctly installed.
