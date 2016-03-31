# Skype Web SDK property model

 **Last modified:** March 30, 2016

 _**Applies to:** Skype for Business 2015_

 **In this article**  
- [Model object](#model)
- [Observable properties](#property)
- [Observable collections](#collection)
- [Observable commands/methods](#command)  
- [Promise object](#promise)

### Model objects
<a name="model"></a>

These are plain JS objects that are called "model objects" because their members are of the four types:

- other model objects
- observable properties
- observable collections 
- observable commands

A model object can be wrapped by another model object in such a way that an observer won't be able to determine that there is a wrapper on top of the actual object. If model objects had plain properties, i.e. `model = { a: 123, b: "def" }`, this wouldn't be possible.

>The next revision of JS (aka ES6) has introduced the Proxy API that allows to achieve this behavior for any JS object, without applying restrictions on types of members/properties it can have. However the SDK is supposed to work in ES5 environments and thus cannot use features like Proxy.

### Observable properties
<a name="property"></a>

Every property in the SDK is represented by an observable property with this interface. For instance, if there is a `Person` object which has a `displayName` property, the property will be presented in the form of an observable property:

```js
person.displayName(); // reads the value
```

There are no plain properties in the SDK.

A property object is as simple as a value wrapped into a function that gives read/write access to the value. This is very similar to the "observables" concept in Knockout.

```js
function property(value) {
  return function (newValue) {
   if (arguments.length == 0)
    return value;
   
   value = new Value;
  };
}

p = property(123);
p(); // get value: 123
p(456); // set value
```

On top of this very simple idea the SDK adds numerous methods to deal with the property objects (this doesn't make the property objects heavier because all these methods are in the prototype object shared by all property objects). The most commonly used methods are:

- `p()` reads the current value. This call doesn't have any side effects and simply returns the current value.
- `p.get()` pulls the current value (usually from UCWA). If the property is simple, i.e. doesn't correspond to any entity on UCWA or somewhere else like `MePerson#status`, then `p.get()` returns a resolved promise object. However some properties correspond to some server state and thus their locally cached values may differ from actual values on the server.

  ```js
  p.get().then(res => {
    console.log("the value of p:", res);
  }, err => {
    console.log("couldnt pull the value of p:", err);
  });
  ```
  
  It's safe to invoke `p.get()` multiple times in a row: the SDK puts such requests to a queue and executes them at the next event turn.
  
  ```js
  // this sends just one GET /presence
  for (i = 0; i < 10; i++)
    app.personsAndGroupsManager.mePerson.status.get();
  ```

- `p(123)` sets a new value. In some property objects this will simply change the internal value without any side effects. However many properties in the SDK have customized setters. For instance, changing the `MePerson#status` property makes the SDK send a `POST` request to UCWA to change the user's online status. In those cases `p(123)` invokes the custom setter. If the app needs to observe the progress of the operation, it should use `p.set(123)` which is same as `p(123)` except that it returns a `Promise` object (and this is why it's a bit heavier: `p(123)` doesn't create that extra `Promise` object).

   ```js
   p.set(123).then(res => {
     console.log("the new value of p:", res); // res == p()
   }, err => {
     console.log("couldnt change the value of p:", err);
   });
   ```

- `p.subscribe()` tells that the app needs this property to keep its value up to date at all time, until the subscription is removed.
- `p.subscribe(300)` starts a periodic polling with `p.get()`.

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
