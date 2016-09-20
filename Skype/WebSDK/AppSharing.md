# Application/screen sharing in the SDK

## Interface

```ts
interface AppWindow {
    id: Property<string>;
    title: Property<string>;
}

interface Monitor {
    id: Property<string>;
    title: Property<string>;
}

interface Application {
    windows: Collection<AppWindow>;
    monitors: Collection<Monitor>;        
}

interface Conversation {
    screenSharingService: ScreenSharingService;
}

interface SharedResource {
    type: Property<"Desktop" | "Application" | "Window">;
    id: Property<string>;
}

interface ScreenSharingService {
    start(args?: { container?: HTMLElement }): Promise<void>;
    stop(): Promise<void>;
    accept(args: { container: HTMLElement }): Promise<void>;
    reject(): Promise<void>;
    sharer: Property<Participant>;
    shared: Property<SharedResource>;
    controller: Property<Participant>;
    requestControl(): Promise<void>;
    releaseControl(): Promise<void>;
}
```

## How to share a screen with someone

Use `.monitors.get` and `.screenSharingService.start`: 

```js
var conv = app.conversationsManager.getConversation("sip:johndoe@contoso.com");

// at this point app sharing may not be initialized:
// the .get(0) call initializes it and returns the 1-st monitor
app.monitors.get(0).then(monitor => {
    conv.screenSharingService.shared.set(monitor); // this is what will be shared

    conv.screenSharingService.start().then(() => {
        // however at this point media/sdp negotiations
        // may still be going on and the content may not
        // be shared yet: it'll appear on the other end
        // once the negotiations are done
        console.log('request accepted');
    });
});
```

## How to share a window with someone

It's same as sharing a screen, except that `.windows` should be used:

```js
app.windows.get(0).then(window => {
    // ...
});
```

## How to get the list of available screens/windows to share

One option is to use `.get`, anotehr option is to subscribe to `.windows` and `.monitors` collections:

```js
app.windows.subscribe();
app.windows.changed(() => {
    for (const window of app.windows())
        console.log(window.title());
});

app.monitors.subscribe();
app.monitors.changed(() => {
    for (const screen of app.monitors())
        console.log(screen.title());
});
```

## How to share a screen/window in a conference

Join the conference first and then use the `.start` method as usual:

```js
var conf = app.conversationsManager.getConversationByUri("sip:johndoe@contoso.com;grru;<...>;id=AHDBFM");

conv.screenSharingService.shared.set(monitor);
conf.screenSharingService.start();
```

## How to accept incoming screen/window sharing request from someone

Use the `.accept` method: 

```js
app.conversationsManager.conversations.added(conv => {
    const sharing = conv.screenSharingService;

    // .accept is enabled if there is screen sharing to accept;
    // note, that this can happen only in a p2p conversation:
    // in conferences, .accept is always disabled and to see
    // the content in the meeting .start is needed 
    sharing.accept.enabled.when(true, () => {
        // this is the one who is sending the AS request 
        console.log(conv.participants(0).person.id();

        sharing.accept({
            // this is where the AS content will be rendered
            container: document.querySelector('div#appsharing')
        }).then(() => {
            console.log('done');
        });
    });
});
``` 

## How to join a conference and see what is being shared

Use the `.start` method:

```js
var conf = app.conversationsManager.getConversationByUri("sip:johndoe@contoso.com;grru;<...>;id=AHDBFM");

conf.screenSharingService.start({
    // this is where the AS content will be rendered
    container: document.querySelector('div#appsharing')
});
``` 

## How to request and release control

In this case the remote participant(s) get a notification saying that this participant is requesting control: then they eitehr grant or deny it. The request is sent over the media channel, so UCWA doesn't know about this.

```js
conv.screenSharingService.requestControl().then(() => {
    console.log('done');
});

conv.screenSharingService.releaseControl().then(() => {
    console.log('done');
});
```

## How to accept or decline a control request

There is no API for this. When someone requests control, the plugin UI (a little frame over the shared area and a little bar on the top) displays the notification on the top asking to grant or deny the request: the plugin doesn't inform the SDK about this.

## How to switch from viewing to sharing content

TODO

## How to switch from sharing to viewing content

TODO

## Troubleshooting

 It's important that this element doesn't have width set as otehrwise the plugin shifts the content somewhere right down which hides it from the view if the element isn't high enough. If the content does not appear, consider changing the style this way:
         
```html
<div style="height:200px;margin:10pt"></div>
```

Here "width" remains unspecified, which makes the `<div>` occupy the entire width of the parent element, excluding margins (that don't seem to confuse the plugin).
