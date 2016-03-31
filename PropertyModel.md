# Skype Web SDK property model

 **Last modified:** March 30, 2016

 _**Applies to:** Skype for Business 2015_

 **In this article**  
[Model object](#model)
[Observable properties](#property)
[Observable collections](#collection)
[Observable commands/methods](#command)  
[Promise object](#promise)

### Model objects
<a name="model"></a>

A member object is a reference to child model object.

>**Important**: Except for the [Skype.Web.Model.Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1.aspx) object, all other member objects are obtained by getting their references from a parent object.

### Observable properties
<a name="property"></a>

An observable property is a single value [Property](https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx) object that you can add a value change event listener. The **changed** event listener on the observable property tells you when a property value changes. You can also get the cached value of the property by invoking the property as a function.

>**Note**: Invoking the property as a function will retrieve the cached value, which may differ from the actual value on the server.

Get a reference to the property instead of the value when you are interested in events on the property. The [Property](https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx) object has a **.changed** method, which accepts the listener as a named or an anonymous function. Be sure to pass a named listener function if you intend to cancel the listener later.

The SDK is not required to initialize and fill an observable property until you have registered a listener for the property and either call **.get** method or call **.subscribe** method for the object. To get the property value the app needs to invoke **.get** if it needs the value once, or invoke **.subscribe** if it needs the value to be updated all the time. A call to **.subscribe** is heavier. However, one call to **.subscribe** should be preferred over multiple calls to **.get**, as **.get** isn't cheap either.

The same is true for a [Collection](https://msdn.microsoft.com/en-us/library/office/mt657710(v=office.16).aspx). These **.get** and **.subscribe** functions allow the model to load data lazily and load only that parts of data that are needed by the app. This reduces unneeded HTTP operations, and improves the responsiveness of your app. Some SDK properties are initialized and filled when their parent objects are created. It is a good practice to register a **changed** listener for each property whose value you are interested in, even when the value is filled on initialization.

### Observable collections
<a name="collection"></a>

The [Collection](https://msdn.microsoft.com/en-us/library/office/mt657710(v=office.16).aspx) is a collection of references to objects. You can get a snapshot of the current values in a collection by invoking the **Collection** as a method with the following syntax:

  ```js
  var collectionArray = object.collection(); 
  ```

If you want to register a listener for the **.added** or **.removed** events, get a reference to the collection instead of a snapshot of the contents. See [Property](https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx) for more information.

### Observable commands/methods
<a name="command"></a>

The SDK encapsulates HTTP operations in asynchronous commands. Use the [Promises/A+](http://promisesaplus.com/) pattern for all the SDK methods that return [Promise](https://msdn.microsoft.com/en-us/library/office/mt657726(v=office.16).aspx) objects. You can chain successive promises together to enforce operational dependency and error handling. Use promise chaining to prevent application logic from changing the state of an object until the object is initialized and ready.

### Promise object
<a name="promise"></a>

TODO
