
# Skype Web SDK object model

 **Last modified:** February 08, 2016

 _**Applies to:** Skype for Business 2015_

 **In this article**<br/>
[Model layer](#sectionSection0)<br/>
[Application object](#sectionSection1)<br/>
[Person list](#sectionSection2)<br/>
[Conversations](#sectionSection3)<br/>
[MePerson object](#sectionSection4)


The object model is shown in the following figure (Figure 1). Use the [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) constructor and the **new** keyword to create an **Application** object of the[Skype.Web.Model](http://technet.microsoft.com/library/16bd06ac-a5d4-45c9-a99b-0236c2c056aa%28Office.14%29.aspx) **.Application** type. **Application** is the only object with a constructor. All other objects are obtained according to figure below.

**Figure 1. Object Model**


![Skype Web SDK Object Model](images/317a0cf1-8468-4657-805f-9a12440f1188.jpg)


## Model layer
<a name="sectionSection0"> </a>

The foundation of the SDK is the  **Application** object. It is an object that includes member objects (other models), collections, observable properties, static properties, and asynchronous methods. This section briefly describes the nature of these API types.


-  **Members **
    
     A member object returns a reference to child model object.
    
     **Important**  Except for the [Skype.Web.Model.Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1.aspx) object, all other member objects are obtained by getting their references from a parent object.
-  **Observable Properties**
    
     An observable property is a single value[Property](http://technet.microsoft.com/library/75568de9-0173-45cf-a0ce-ba1e5b0da7d9%28Office.14%29.aspx) object that you can add a value change event listener. The "changed" event listener on the observable property tells you when a property value changes. You can also get the cached value of the property by invoking the property as a function.
    
>**Note**  Invoking the property as a function will retrieve the cached value, which may differ from the actual value on the server.

    
Get a reference to the property instead of the value when you are interested in events on the property. The [Property](http://technet.microsoft.com/library/75568de9-0173-45cf-a0ce-ba1e5b0da7d9%28Office.14%29.aspx) object has a . **changed** method which accepts the listener as a named or an anonymous function. Be sure to pass a named listener function if you intend to cancel the listener later.
The Skype for Business is not required to initialize and fill an observable property until you have registered a listener for the property and either call  **.get** method or call **.subscribe** method for the object. To get the property value the app needs to invoke **.get** if it needs the value once, or invoke **.subscribe** if it needs the value to be updated all the time. A call to **.subscribe** is heavier. However one call to **.subscribe** should be preferred over multiple calls to **.get**, as .get isn't cheap either.
The same is true for a [Collection](http://technet.microsoft.com/library/9136f659-0706-4637-9448-9626c879a290%28Office.14%29.aspx). These  **.get** and **.subscribe** functions allow the model to load data lazily and load only that parts of data that are needed by the app. This reduces unneeded HTTP operations, and improves the responsiveness of your app. Some Skype for Business properties are initialized and filled when their parent objects are created. It is a good practice to register a **changed** listener for each property whose value you are interested in, even when the value is filled on initialization.
    
-  **Collections**
    
     The[Collection](http://technet.microsoft.com/library/9136f659-0706-4637-9448-9626c879a290%28Office.14%29.aspx) is a collection of references to objects. You can get a snapshot of the current values in a collection by invoking the **Collection** as a method with the following syntax:
    


  ```js
  var collectionArray = object.collection(); 
  ```


If you want to register a listener for the . **added** or . **removed** events, get a reference to the collection instead of a snapshot of the contents. See[Property](http://technet.microsoft.com/library/75568de9-0173-45cf-a0ce-ba1e5b0da7d9%28Office.14%29.aspx)for more information.
    
-  **Asynchronous Commands**
    
     The SDK encapsulates HTTP operations in asynchronous commands. Use the[Promises/A+ ](http://promisesaplus.com/) pattern for all the SDK methods that return[Promise](http://technet.microsoft.com/library/362628c9-9f48-4e26-8f5d-d0bae80e782d%28Office.14%29.aspx) objects. You can chain successive promises together to enforce operational dependency and error handling. Use promise chaining to prevent application logic from changing the state of an object until the object is initialized and ready.
    

## Application object
<a name="sectionSection1"> </a>

The [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) object is created by calling the application constructor and is the entry point to the API. Use the **Application.SigninManager** to get state change events and signed-in user presence. All operations in the SDK depend on the application object and require that a user is signed in through this object. This object encapsulates a REST communication stack for the signed in user. The functions of this object include:


- Sign a user in using OAUTH, NTLM, or basic authentication with  **Application.SignInManager**
    
- Sign a user out with [SignInManager](http://technet.microsoft.com/library/bfb98537-a02a-4eb5-b980-007b8c46aee1%28Office.14%29.aspx) by using the **Application.signInManager** member reference.
    
- Get the current sign in state of the user.
    
- Get a reference to the user's person list by reading the  **Application.personAndGroups** member. The member references a[PersonAndGroupsManager](http://technet.microsoft.com/library/ce912c52-5bed-47b1-b4e0-ce4328297c87%28Office.14%29.aspx) object.
    
- Get a reference to the conversations that the user has joined by reading the  **Application.conversationsManager** member. The member references a[ConversationsManager](http://technet.microsoft.com/library/b412eed4-1cbe-4471-ae3d-c4f38a8f7284%28Office.14%29.aspx) object.
    
- Get a reference to the available media devices by reading the  **Application.devicesManager** member. The member references a[DevicesManager](http://technet.microsoft.com/library/0678cf66-ceec-409f-8723-6e9bb4355024%28Office.14%29.aspx) object.
    

## Person list
<a name="sectionSection2"> </a>

Access the signed in user's person list by getting a [Group](http://technet.microsoft.com/library/6cf7a1b7-d732-422b-96e6-ff8ac18cedc8%28Office.14%29.aspx) object on the **Application.personsAndGroupsManager.all** property:

 **persons:** This collection contains all of the persons in the person list across all user defined and server defined groups. Distribution group persons are not in the[Collection<Person>](http://technet.microsoft.com/library/9136f659-0706-4637-9448-9626c879a290%28Office.14%29.aspx) object returned from the **persons** property. Use the **persons** property to get a **Person** out of the list by using the SIP URI of the desired person. This collection is empty unless the application is observing it by setting an event handler for the . **added** event on the collection.

 **groups:** This collection encapsulate the person groups that appear in the user's person list. Use the **groups** property to get sets of person groups based on:


- Provide a reference to the [MePerson](http://technet.microsoft.com/library/a71b0536-3c1a-487b-b734-33e4efbea3b5%28Office.14%29.aspx) object through **[PersonAndGroupsManager](http://technet.microsoft.com/library/ce912c52-5bed-47b1-b4e0-ce4328297c87%28Office.14%29.aspx).mePerson**
    
- Privacy relationship to user
    
- Server defined groups
    
- User defined groups
    

## Conversations
<a name="sectionSection3"> </a>

Access the conversations that the user is participating in by reading the [application.ConversationsManager](http://technet.microsoft.com/library/b412eed4-1cbe-4471-ae3d-c4f38a8f7284%28Office.14%29.aspx) **.conversations** collection. If you register a callback for the . **added** event on the conversation collection, your application can accept incoming conversation invitations.


## MePerson object
<a name="sectionSection4"> </a>

The signed in user is encapsulated by the [MePerson](http://technet.microsoft.com/library/a71b0536-3c1a-487b-b734-33e4efbea3b5%28Office.14%29.aspx) object obtained from the **[PersonAndGroupsManager](http://technet.microsoft.com/library/ce912c52-5bed-47b1-b4e0-ce4328297c87%28Office.14%29.aspx).mePerson** property. The[MePerson](http://technet.microsoft.com/library/a71b0536-3c1a-487b-b734-33e4efbea3b5%28Office.14%29.aspx) object lets you read and write the following user properties:


- User's current location 
    
- Users personal note 
    
- User presence availability 
    
The following [MePerson](http://technet.microsoft.com/library/a71b0536-3c1a-487b-b734-33e4efbea3b5%28Office.14%29.aspx) properties are read-only:


- SIP URI
    
- User Display Name
    
- User presence activity
    
- Work title
    
- Work department
    
- Primary work email
    
- Other email addresses
    
- User photograph Url
    

## See also
<a name="sectionSection4"> </a>


#### Concepts


[Retrieve the API entry point and sign in a user]( /GetAPIEntrySignIn.md)<br/>
[Show a person's information]( /ShowPersonInfo.md)<br/>
[Search for persons and distribution groups]( /SearchForPersonsAndGroups.md)<br/>
[Respond to a conversation invitation]( /RespondToInvitation.md)
