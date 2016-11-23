
# Conversation Control

 _**Applies to:** Skype for Business_

Conversation Control members consist of: 

- Properties that return an application instance. 
- A method that renders the control in the page.

## Properties

The following table lists the properties of the  **Conversation** object.


||||
|:-----|:-----|:-----|
|**Property**|**Description**|**Returns**|
| _UIApplicationInstance_|Returns the instance of Skype Web SDK Application used by renderConversation API|[Application]( http://officedev.github.io/skype-docs/Skype/WebSDK/model/api/interfaces/jcafe.application.html)|
| _application_|Returns a class of Skype Web SDK application.|[Application]( http://officedev.github.io/skype-docs/Skype/WebSDK/model/api/interfaces/jcafe.application.html)|

### Methods

The following table lists the methods of the  **Conversation** object.


||||
|:-----|:-----|:-----|
|**Method**|**Description**|**Returns**|
| _renderConversation_|Render a conversation in given context <br/>  **Parameters** <br/> - _container_  - (**String/DOMelement** ) Optional. A CSS selector or DOM element <br />- _state_  - **Object{}**  Optional. Object holding the optional parameters<br />- _participants_  - **Array**  Optional. Array of participants to start a conversation with.<br />- _conversationId_  - **String**  Optional.  Conversation ID to start conversation with. Can't be used together<br/> - _state.participants_.<br />- _modalities_  - **Modality[]**  Optional. Array of modalities to start with<br />|[Promise]( http://officedev.github.io/skype-docs/Skype/WebSDK/model/api/interfaces/jcafe.promise.html)|

### Examples

The following examples show the most common uses of the  **renderConversation** method.


#### Render conversation with self and no modalities enabled, and passing DOM element as container parameter.


```js
renderConversation(document.querySelector('#container'));
```

#### Render a conversation with self and with Chat modality enabled

```js
renderConversation('#container', {
     modalities: ['Chat']
});
```

#### Render a 1:1 conversation

If the sdk finds an existing conversation with that person, then that conversation will be reused. If not, a new conversation is created.

```js
renderConversation('#container', {
     participants: ['sip:denisd@contoso.com']
});

```

#### Render a 1:1 conversation with Chat modality

If the sdk finds an existing conversation with that person, then that conversation will be reused. If not, a new conversation is created.


```js
renderConversation('#container', {
     participants: ['sip:denisd@contoso.com'],
     modalities: ['Chat']
});

```


#### Render a new group conversation with Chat modality

This will render a new group conversation even if an existing group conversation with the same set of remote participants already exists.

```js
renderConversation('#container', {
     participants: ['sip:remote1@contoso.com', 'sip:remote2@contoso.com'],
     modalities: ['Chat']
});

```


#### Join and render an existing group conversation with Chat modality

This will find an existing group conversation with the given uri and render that conversation.
Do not include the participants array, otherwise it will create a new group conversation.

```js
// Get the uri of an existing group conversation
// eg. sip:user@contoso.com;gruu;opaque=app:conf:focus:id:EXAMPLE
var uri = conversation.uri();

renderConversation('#container', {
     conversationId: uri,
     modalities: ['Chat']
});

```


### Supported clients

Internet Explorer 10 and later, Safari 8 and later, FireFox 40 and later, and Chrome 43 and later.

