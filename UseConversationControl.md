
# Use the Skype Web Conversation Control in a webpage

 _**Applies to:** Skype for Business_

 **In this article**  
[Add the Conversation Control to a webpage](#sectionSection0)  
[The complete code listing](#sectionSection1)  
[Additional resources](#additional-resources)  


The Skype Web SDK [Conversation Control](ConversationControl.md) object contains the logic and presentation layer that encapsulates an IM dialog in one object. Use it when you want Skype Web SDK to draw the conversation UI for you. It is implemented in your webpage with as few as three Skype Web SDK API calls. If you want the control to activate on incoming conversation invitations, you will need to add an event handler for changes in the self participant chat channel.

Figure 1 shows the [Conversation Control](ConversationControl.md) in action. The Microsoft Edge browser is shown in this example, but you can use any other supported browser.

**Figure 1. The Skype Web Conversation Control**


![Skype Web SDK Conversation control](images/8144ea64-e3f3-4880-9eb6-7e332fab9d4e.PNG)

This topic takes you through the steps to add a [Conversation Control](ConversationControl.md) to you web app. Upon completion of these tasks, your app will let a user sign in to Skype for Business on premise, initiate a new IM conversation with one or more people, and accept invitations to join an IM conversation.

## Add the Conversation Control to a webpage
<a name="sectionSection0"> </a>

The steps in this section initialize the Skype Web SDK API endpoint, add state change event logic for conversation invitations, and a button click event handler for starting a new IM conversation.


### Initialize the Skype Web SDK API endpoint.


- Declare a structure to hold the API keys
    
>**Important**  The API key values shown in this example are the literal values that you must use in your application. If you use any other strings, your application will not initialize the API endpoint.Change the value of the  `version` key to uniquely identify your app. See [Skype Web SDK Production Use Capabilities](APIProductKeys.md) for a list of supported API keys.

  ```js
  var config = {
    version: '<my App>/1.0.0', 
    apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255', // SDK 
    apiKeyCC: '9c967f6b-a846-4df2-b43d-5167e47d81e1' // SDK+CC 
};

  ```

- Initialize the API endpoint and get the  **UIApplicationInstance** that provides the [Conversation Control](ConversationControl.md).


  ```js
      Skype.initialize({ apiKey: config.apiKeyCC }, function (api) {
        app = api.UIApplicationInstance;
//... 

  ```


### Add a chat state event handler


- Inside of the callback function passed into the  **initialize** method, add a callback to be invoked when a conversation is added to the collection on the [ConversationsManager]( https://msdn.microsoft.com/en-us/library/office/dn962151(v=office.16).aspx.md).


  ```js
          app.conversationsManager.conversations.added(function (conversation) {
//...
            });
        });

  ```

- Inside of the previous callback method, add a callback for changes in the chat channel state of the added conversation.
    
    When the state of the channel is changed to 'Notified', an invitation to chat has been received. To show the [Conversation Control](ConversationControl.md), call the  **renderConversation** method on the **UIApplicationInstance**.
    


  ```js
              conversation.selfParticipant.chat.state.when('Notified', function () {
                var id = conversation.participants(0).person.id();
                var container = document.getElementById(id);
                if (!container) {
                    container = document.createElement('div');
                    container.id = id;
                    document.querySelector('#conversations').appendChild(container);
                }
                var promise = api.renderConversation(container, {
                    modalities: ['Chat'],
                    participants: [id]
                });
                monitor('start conversation', promise);

  ```


### Add conversation initiate logic

The following code example depends on a button that you add to your webpage. The id of the button is  `start-cv` for this example.

When the user clicks the button, the code takes the following steps:


- Prompts the user for a comma-delimited list of SIP addresses for invitees.
    
- Creates a container to host the [Conversation Control](ConversationControl.md)and appends it to a list of other conversations.
    
- Renders the [Conversation Control](ConversationControl.md) in the new container by calling **renderConversation** and passing the hosting container, desired chat modality, and the array of invitee SIP addresses.
    



```js
       $('#start-cv').on('click', function () {
            var input = prompt('SIP URIs of the participants:', 'sip:example@example.com,sip:example2@example.com');
            if (!input)
                return;
            var uris = input.split(',').map(function (s) { return s.trim(); });
            console.log('participants:', uris);
            var container = document.getElementById(input);
            if (!container) {
                container = document.createElement('div');
                container.id = input;
                document.querySelector('#conversations').appendChild(container);
            }
            var promise = api.renderConversation(container, {
                modalities: ['Chat'],
                participants: uris
            });
            monitor('start conversation', promise);
        });
```


## The complete code listing
<a name="sectionSection1"> </a>

The code in the previous sections is taken from the following JavaScript file.


```js
var app;
$(function () {
    'use strict';
    Skype.initialize({ apiKey: config.apiKeyCC }, function (api) {
        app = api.UIApplicationInstance;
        app.conversationsManager.conversations.added(function (conversation) {
            conversation.selfParticipant.chat.state.when('Notified', function () {
                var id = conversation.participants(0).person.id();
                var container = document.getElementById(id);
                if (!container) {
                    container = document.createElement('div');
                    container.id = id;
                    document.querySelector('#conversations').appendChild(container);
                }
                var promise = api.renderConversation(container, {
                    modalities: ['Chat'],
                    participants: [id]
                });
                monitor('start conversation', promise);
            });
        });
        $('#sign-in').on('click', function () {
            var promise = app.signInManager.signIn({
                version: config.version,
                culture: 'en-us',
                username: $('#username').val(),
                password: $('#password').val()
            });
            monitor('sign in', promise);
        });
        $('#sign-out').on('click', function () {
            var promise = app.signInManager.signOut();
            monitor('sign out', promise);
        });
        $('#start-cv').on('click', function () {
            var input = prompt('SIP URIs of the participants:', 'sip:example@example.com,sip:example2@example.com');
            if (!input)
                return;
            var uris = input.split(',').map(function (s) { return s.trim(); });
            console.log('participants:', uris);
            var container = document.getElementById(input);
            if (!container) {
                container = document.createElement('div');
                container.id = input;
                document.querySelector('#conversations').appendChild(container);
            }
            var promise = api.renderConversation(container, {
                modalities: ['Chat'],
                participants: uris
            });
            monitor('start conversation', promise);
        });
    });
    function monitor(title, promise) {
        console.log(title, 'started');
        promise.then(function (res) {
            console.log(title, 'succeeded', res);
        }, function (err) {
            console.log(title, 'failed', err &amp;&amp; err.stack || err);
            alert(title + ' failed:' + err);
        });
    }
});

```


## Additional resources
<a name="bk_addresources"> </a>

- [Conversation Control](ConversationControl.md)

Supported browsers: Internet Explorer 10 and later, Safari 8 and later, FireFox 40 and later, and Chrome 43 and later.

