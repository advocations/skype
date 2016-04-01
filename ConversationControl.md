
# Conversation Control

 _**Applies to:** Skype for Business_

Conversation Control members consist of: 

- Properties that return an application instance. 
    
- A method that renders the control in the page.
    

### Properties

The following table lists the properties of the  **Conversation** object.


||||
|:-----|:-----|:-----|
|**Property**|**Description**|**Returns**|
| _UIApplicationInstance_|Returns the instance of Skype Web SDK Application used by renderConversation API|[Application]( https://msdn.microsoft.com/en-us/library/office/dn962124(v=office.16).aspx)|
| _application_|Returns a class of Skype Web SDK application.|[Application]( https://msdn.microsoft.com/en-us/library/office/dn962124(v=office.16).aspx)|

### Methods

The following table lists the methods of the  **Conversation** object.


||||
|:-----|:-----|:-----|
|**Method**|**Description**|**Returns**|
| _renderConversation_|Render a conversation in given context<br/>  **Parameters** <br/> - _container_  - (**String/DOMelement** ) Optional. A CSS selector or DOM element <br />- _state_  - **Object{}**  Optional. Object holding the optional parameters<br />- _participants_  - **Array**  Optional. Array of participants to start a conversation with.<br />- _conversationId_  - **String**  Optional.  Conversation ID to start conversation with. Can't be used together<br/> - _state.participants_.<br />- _modalities_  - **Modality[]**  Optional. Array of modalities to start with<br />|[Promise]( https://msdn.microsoft.com/en-us/library/office/mt657726(v=office.16).aspx)|

### Examples

The following examples show the most common uses of the  **renderConversation** method.


#### Render conversation with self and no modalities enabled, and passing DOM element as container parameter.


```js
renderConversation(document.querySelector('#container'));
```


#### Render a conversation with 1 participant.


```js
renderConversation('#container', {
     participants: ['sip:denisd@contoso.com']
});

```


#### Render a conversation with self and with Chat modality enabled.


```js
renderConversation('#container', {
     modalities: ['Chat']
});

```


#### Render a 1:1 conversation with Chat modality.


```js
renderConversation('#container', {
     participants: ['sip:denisd@contoso.com'],
     modalities: ['Chat']
});

```


#### Join and render an existing conversation with Chat modality.


```js
renderConversation('#container', {
     conversationId: 'someID',
     modalities: ['Chat']
});

```


#### Make the conversation control render in narrow mode.


```js
var c = document.getElementById('container');
c.classList.add('narrow');
renderConversation(c, {
     conversationId: 'someID',
     modalities: ['Chat']
});

```


### Supported clients

Internet Explorer 10 and later, Safari 8 and later, FireFox 40 and later, and Chrome 43 and later.

