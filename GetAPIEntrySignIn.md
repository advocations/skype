
# Retrieve the API entry point and sign in a user

 **Last modified:** March 25, 2016

 _**Applies to:** Skype for Business 2015_

The [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) object is created by invoking the `Application` class constructor with the `new` keyword. This is the only SDK object that can be constructed in application logic. All other SDK types are accessed by reading properties or invoking functions on application.

The [SignInManager](http://technet.microsoft.com/library/bfb98537-a02a-4eb5-b980-007b8c46aee1%28Office.14%29.aspx)#signIn method and the [SignInManager](http://technet.microsoft.com/library/bfb98537-a02a-4eb5-b980-007b8c46aee1%28Office.14%29.aspx)#signOut method are asynchronous and return a [Promise](http://technet.microsoft.com/library/362628c9-9f48-4e26-8f5d-d0bae80e782d%28Office.14%29.aspx) object. Use the `Promise#then` method to set operation success or failure callbacks.

 >**Note** To enable audio/video functionality, clients must install the Skype for Business Web App Plug-in. It is available for Windows and Mac computers:
 - [Windows Download](https://mlccdn.blob.core.windows.net/prod/LWA/plugins/windows/archive/SkypeForBusinessPlugin-16.0.0.101.msi)
 - [Mac Download](https://mlccdn.blob.core.windows.net/prod/LWA/plugins/mac/archive/SkypeForBusinessPlugin-16.0.0.63.pkg)

### How to: Get the SDK entry point and sign in a user

Add a reference to the bootstrapper to your HTML file.

BY USING THE SOFTWARE LOCATED HERE: https://swx.cdn.skype.com, YOU ACCEPT THE _[Terms of Service](/TermsOfService.md)_ IF YOU DO NOT ACCEPT THEM, DO NOT USE THE SOFTWARE.

>**Note** These license terms apply to the use of the content from the domain swx.cdn.skype.com.

```html
<script src="https://swx.cdn.skype.com/shared/v/1.2.15/SkypeBootstrap.min.js"></script>
```

Download the SDK package.

```js
Skype.initialize({ apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255' }, function (api) {
  Application = api.application; // this is the Application constructor
}, function (err) {
  console.log("cannot load the sdk package", err);
});
```

Call the [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) constructor.

```js
app = new Application;
```

Sign the user in by calling the  `Application#signInManager.signIn` method.

```js
app.signInManager.signIn ({
  username: '****',
  password: '****'
}).then(() => {
  console.log("signed in as", app.personsAndGroupsManager.mePerson.displayName());
}, err => {
  console.log("cannot sign in", err);
});
```

>**Note:** If sign in fails or you call `signOut`, you must create a new [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) object and make the new sign in attempt with that object. The original application object will not be able to attempt a new sign in operation.

The following example uses the password grant authentication to sign a user in with a username and password.

```html
<!doctype html>
<html>
<head>
  <title>My Skype Web SDK app</title>
  <script src="https://swx.cdn.skype.com/shared/v/1.2.15/SkypeBootstrap.min.js"></script>
</head>
<body>
  <script>
    Skype.initialize({ apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255' }, api => {
      var app = new api.application;
      
      app.signInManager.signIn ({
        username: '****',
        password: '****'
      }).then(() => {
        console.log("signed in as", app.personsAndGroupsManager.mePerson.displayName());
      }, err => {
        console.log("cannot sign in", err);
      });
    }, err => {
      console.log("cannot load the sdk package", err);
    });
  </script>
</body>
</html>
```

