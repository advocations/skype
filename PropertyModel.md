# Skype Web SDK property model

 **Last modified:** March 30, 2016

 _**Applies to:** Skype for Business 2015_

 **In this article**  
- [Model object](#model)
- [Observable properties](#property)
- [Observable collections](#collection)
- [Observable commands/methods](#command)  
- [Event object](#event)
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

- `p.subscribe()` tells that the app needs this property to keep its value up to date at all time, until the subscription is removed. This makes an effect only on properties that can be subscribed to, i.e. `MePerson#status`, while on other properties the `subscribe` call will do nothing. If a property can be subscribed to, then `p.subscribe()` will increment the internal subscriptions counter and if this is the first subscription, it will invoke the subscription procedure associated with that property: for `MePerson#status` that would be a `POST` request to UCWA, for `DevicesManager#cameras` that would be a WebRTC call and so on. A subscription can be released with the `dispose` method:

    ```js
    s = p.subscribe();
    setTimeout(() => s.dispose(), 3600 * 1000); // unsubscribe 1 hour later
    ```

  If a property is subscribed to, there is no need to poll its value with `p.get()` as the SDK does this for the app. A subscription is generally heavier than a one time fetch with `p.get()`, but lighter than frequent `get` calls.

- `p.subscribe(300)` starts a periodic polling with `p.get()`. In some cases the app needs to poll the property value from time to time, but doesn't want to create a subscription, as it's heavy. One approach would be to set a timer that would poll the value periodically:

    ```js
    setInterval(() => p.get(), 15 * 60 * 1000); // poll every 15 mins
    ```
  
  This works well as long as there is just one place in the app that manages this polling. However when the app becomes more complex, this approach no longer works. A typical situation is when the same `Person` object needs to be displayed by different view models in different places in the UI, that have different lifetime: one UI element is ok to poll the property once every hour, another needs more frequent polling, while the third one needs a subscription. In such cases the `p.subscribe(300)` method becomes useful: it keeps track on how many and which type of subscriptions it has and upgrades/downgrades them as appropriate.
  
    ```js
    s1 = p.subscribe(300); // poll every 300 seconds
    s2 = p.subscribe(50); // now poll every 50 seconds
    s3 = p.subscribe(); // stop polling and create a subscription
    s3.dispose(); // now continue polling every 50 seconds
    ```
    
  In this example the SDK first upgrades the polling to a subscription and then downgrades it back at the app request.

Every property object has a `changed` event, which is an instance of the `Event` object, and whenever the property value changes, it notifies observers via this event:

```js
p.changed(newValue => {
  console.log("the new value of p:", newValue);
});
```

A common use of such event listeners is doing something when the property gets a certain value.

```js
p.when(123, () => {
  console.log("the value has changed to 123");
});
```

If the callback needs to be invoked only once, use `Property#once`.

```js
p.once(123, () => {
  console.log("the value has changed to 123");
});
```

There are a few additional features of the property object that are mostly used inside the SDK, but can appear useful in a web app:

- `q = p.map(x => x * x)` creates a new property object which value changes after the value of the parent property. In addition to that calls like `q.get()` or `q.subscribe()` are properly redirected to the parent property.

### Observable collections
<a name="collection"></a>

TODO

### Observable commands/methods
<a name="command"></a>

TODO

### Event object
<a name="event"></a>

TODO

### Promise object
<a name="promise"></a>

TODO
