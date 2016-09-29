# Transferring audio calls in the SDK

## Simple call transfer

An ongoing audio call can be transferred to a SIP URI:

```js
conv.audioService.transfer("sip:johndoe@contoso.com").then(() => {
    console.log("done");
});
```

or it can be transferred to a phone:

```js
conv.audioService.transfer("tel:+12223334444");
```

If the specified URI declines the transfer, UCWA returns an error with `code=RemoteFailure subcode=TransferTargetDeclined` which is then used to reject the promise object returned from `transfer(...)`.

Once the call is transferred, UCWA ends this conversation (so on the SDK side `conversation.state()` becomes `Disconnected`). For the remote participant the conversation remains the same, but the participant changes.

## Consultative call transfer

TODO
