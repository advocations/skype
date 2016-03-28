
# Skype Web SDK object model

 **Last modified:** February 08, 2016

 _**Applies to:** Skype for Business 2015_

 **In this article**<br/>
[Model layer](#sectionSection0)<br/>
[Application object](#sectionSection1)<br/>
[Person list](#sectionSection2)<br/>
[Conversations](#sectionSection3)<br/>
[MePerson object](#sectionSection4)


The object model is shown in the following figure (Figure 1). Use the [Application]( https://msdn.microsoft.com/en-us/library/office/dn962124(v=office.16).aspx.md) constructor and the **new** keyword to create an **Application** object of the [Skype.Web.Model]( https://msdn.microsoft.com/en-us/library/office/dn962123(v=office.16).aspx.md)**.Application** type. **Application** is the only object with a constructor. All other objects are obtained according to figure below.

**Figure 1. Object Model**


![Skype Web SDK Object Model](images/317a0cf1-8468-4657-805f-9a12440f1188.jpg)


## Model layer
<a name="sectionSection0"> </a>

The foundation of the SDK is the  **Application** object. It is an object that includes member objects (other models), collections, observable properties, static properties, and asynchronous methods. This section briefly describes the nature of these API types.


### Members

A member object is a reference to child model object.

>**Important**: Except for the [Skype.Web.Model.Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1.aspx) object, all other member objects are obtained by getting their references from a parent object.

### Observable Properties

An observable property is a single value [Property]( https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx.md) object that you can add a value change event listener. The `changed` event listener on the observable property tells you when a property value changes. You can also get the cached value of the property by invoking the property as a function.

>**Note**: Invoking the property as a function will retrieve the cached value, which may differ from the actual value on the server.

Get a reference to the property instead of the value when you are interested in events on the property. The [Property]( https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx.md) object has a `.changed` method which accepts the listener as a named or an anonymous function. Be sure to pass a named listener function if you intend to cancel the listener later.

The SDK is not required to initialize and fill an observable property until you have registered a listener for the property and either call `.get` method or call `.subscribe` method for the object. To get the property value the app needs to invoke `.get` if it needs the value once, or invoke `.subscribe` if it needs the value to be updated all the time. A call to `.subscribe` is heavier. However one call to `.subscribe` should be preferred over multiple calls to `.get`, as `.get` isn't cheap either.

The same is true for a [Collection]( https://msdn.microsoft.com/en-us/library/office/mt657710(v=office.16).aspx.md). These `.get` and `.subscribe` functions allow the model to load data lazily and load only that parts of data that are needed by the app. This reduces unneeded HTTP operations, and improves the responsiveness of your app. Some SDK properties are initialized and filled when their parent objects are created. It is a good practice to register a `changed` listener for each property whose value you are interested in, even when the value is filled on initialization.

### Collections

The [Collection]( https://msdn.microsoft.com/en-us/library/office/mt657710(v=office.16).aspx.md) is a collection of references to objects. You can get a snapshot of the current values in a collection by invoking the **Collection** as a method with the following syntax:

  ```js
  var collectionArray = object.collection(); 
  ```

If you want to register a listener for the `.added` or `.removed` events, get a reference to the collection instead of a snapshot of the contents. See [Property]( https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx.md) for more information.

### Asynchronous Commands

The SDK encapsulates HTTP operations in asynchronous commands. Use the [Promises/A+](http://promisesaplus.com/) pattern for all the SDK methods that return [Promise]( https://msdn.microsoft.com/en-us/library/office/mt657726(v=office.16).aspx.md) objects. You can chain successive promises together to enforce operational dependency and error handling. Use promise chaining to prevent application logic from changing the state of an object until the object is initialized and ready.

## Application object
<a name="sectionSection1"> </a>

The [Application]( https://msdn.microsoft.com/en-us/library/office/dn962124(v=office.16).aspx.md) object is created by calling the application constructor and is the entry point to the API. Use the `Application#signinManager` to get state change events and signed-in user presence. All operations in the SDK depend on the application object and require that a user is signed in through this object. This object encapsulates a REST communication stack for the signed in user. The functions of this object include:

- Sign a user in using OAUTH, NTLM, or basic authentication with `Application.SignInManager`
    
- Sign a user out with [SignInManager]( https://msdn.microsoft.com/en-us/library/office/dn962125(v=office.16).aspx.md) by using the `Application#signInManager` member.
    
- Get the current sign in state of the user.
    
- Get a reference to the user's person list by reading the `Application#personAndGroups` member. The member references a [PersonAndGroupsManager]( https://msdn.microsoft.com/en-us/library/office/dn962153(v=office.16).aspx.md) object.
    
- Get a reference to the conversations that the user has joined by reading the `Application#conversationsManager` member. The member references a [ConversationsManager]( https://msdn.microsoft.com/en-us/library/office/dn962151(v=office.16).aspx.md) object.
    
- Get a reference to the available media devices by reading the `Application#devicesManager` member. The member references a [DevicesManager]( https://msdn.microsoft.com/en-us/library/office/mt657715(v=office.16).aspx.md) object.
    

## Person list
<a name="sectionSection2"> </a>

Access the signed in user's person list by getting a  [Group]( https://msdn.microsoft.com/en-us/library/office/dn962156(v=office.16).aspx.md) object on `Application#personsAndGroupsManager.all`:

The `.mePerson` members provides a reference to the [MePerson]( https://msdn.microsoft.com/en-us/library/office/dn962127(v=office.16).aspx.md) object through **[PersonAndGroupsManager]( https://msdn.microsoft.com/en-us/library/office/dn962153(v=office.16).aspx.md).mePerson**

The `.persons` collection contains all of the persons in the person list across all user defined and server defined groups. Contacts in the distribution groups are not in this collection. Use the `.persons` collection to get a `Person` out of the list. This collection is empty unless the application subscribes to it by calling `.subscribe` or fetches the list once with `.get`.

The `.groups` collection encapsulate the person groups that appear in the user's person list. Use the `.groups` collection to get sets of person groups based on:
    
- Privacy relationship to user
    
- Server defined groups
    
- User defined groups
    

## Conversations
<a name="sectionSection3"> </a>

Access the conversations that the user is participating in by reading the [Application#conversationsManager]( https://msdn.microsoft.com/en-us/library/office/dn962151(v=office.16).aspx.md) `.conversations` collection. If you register a callback for the `.added` event on the conversation collection, your application can accept incoming conversation invitations.


## MePerson object
<a name="sectionSection4"> </a>

The signed in user is encapsulated by the [MePerson]( https://msdn.microsoft.com/en-us/library/office/dn962127(v=office.16).aspx.md) object obtained from the **[PersonAndGroupsManager]( https://msdn.microsoft.com/en-us/library/office/dn962153(v=office.16).aspx.md)#mePerson** property. The [MePerson]( https://msdn.microsoft.com/en-us/library/office/dn962127(v=office.16).aspx.md) object lets you read and write the following user properties:


- User's current location 
    
- Users personal note 
    
- User presence availability 
    
The following [MePerson]( https://msdn.microsoft.com/en-us/library/office/dn962127(v=office.16).aspx.md) properties are read-only:


- SIP URI
    
- User Display Name
    
- User presence activity
    
- Work title
    
- Work department
    
- Primary work email
    
- Other email addresses
    
- User photograph URL
    

## See also
<a name="sectionSection4"> </a>


#### Concepts


[Retrieve the API entry point and sign in a user]( /GetAPIEntrySignIn.md)<br/>
[Show a person's information]( /ShowPersonInfo.md)<br/>
[Search for persons and distribution groups]( /SearchForPersonsAndGroups.md)<br/>
[Respond to a conversation invitation]( /RespondToInvitation.md)
