# PSTN in the web SDK 

## How to set up a p2p call with someone

```js
var conv = app.conversationsManager.getConversation("sip:johndoe@contoso.com");
conv.phoneAudioService.start({
    teluri: "tel:+12223334444"
}).then(() => {
    console.log("done");
});
```

UCWA sets up a call between the remote party `sip:johndoe@contoso.com` and the user's phone `tel:+12223334444`. The SDK gets all the signalling events, so it knows when the call starts and ends, but all the media is handled by UCWA: the SDK doesn't deal with media SDP offers and so on.

The sequence of events will be:

1. UCWA calls the user's phone.
2. The user answers the call.
3. UCWA calls the remote participant.
4. The remote participant answers the call.
5. UCWA connects the two and notifies the SDK with a `phoneAudioInvitation completed` event.

If the user rejects the incoming phone call from UCWA, the returned error will be `code=LocalFailure` and  `subcode=PstnCallFailed`.

If the remote participant declines the call, UCWA returns `code=RemoteFailure` and `subcode=Declined`.

It's possibel to terminate a call:

```js
conv.phoneAudioService.stop().then(() => {
    console.log("done");
});
```

## How to accept or decline an incoming p2p call

As of Sep 2016, this is not possible. Once UCWA enables incoming PSTN for web apps, one would need to tell the user's phone number when signing in.

However declining incoming calls is possible:

```js
conv.phoneAudioService.reject().then(() => {
    console.log("done");
});
```

## How to join a conference

It's same as starting a p2p call, except that the web app needs to use `getConversationByUri`:

```js
var conv = app.conversationsManager.getConversationByUri("sip:johndoe@contoso.com;<...>:id=<...>");
conv.phoneAudioService.start({
    teluri: "tel:+12223334444"
}).then(() => {
    console.log("done");
});
```

UCWA will call the user's phone and once the call is accepted, the user will be connected to the conference.
