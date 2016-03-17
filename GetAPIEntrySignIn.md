
# Retrieve the API entry point and sign in a user

 **Last modified:** February 02, 2016

 _**Applies to:** Skype for Business 2015_

The [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) object is created by invoking the Application class constructor with the new keyword. This is the only SDK object that can be constructed in application logic. All other SDK types are accessed by reading properties or invoking functions on application.

The [SigninManager](http://technet.microsoft.com/library/bfb98537-a02a-4eb5-b980-007b8c46aee1%28Office.14%29.aspx). **signIn** function method and the[SigninManager](http://technet.microsoft.com/library/bfb98537-a02a-4eb5-b980-007b8c46aee1%28Office.14%29.aspx). **signOut** function method are asynchronous methods that return a[Promise](http://technet.microsoft.com/library/362628c9-9f48-4e26-8f5d-d0bae80e782d%28Office.14%29.aspx) object. Invoke the **Promise.then** method to set operation success or failure callback logic.

 **Note**  To enable audio/video functionality, clients must install the Skype for Business Web App Plug-in. It is available for Windows and Mac computers:[Windows Download](https://mlccdn.blob.core.windows.net/prod/LWA/plugins/windows/archive/SkypeForBusinessPlugin-16.0.0.101.msi)[Mac Download](https://mlccdn.blob.core.windows.net/prod/LWA/plugins/mac/archive/SkypeForBusinessPlugin-16.0.0.63.pkg)


### How to: Get the SDK entry point and sign in a user


1. Add a reference to the bootstrapper to your HTML file.
    
    BY USING THE SOFTWARE LOCATED HERE: https://swx.cdn.skype.com, YOU ACCEPT THE TERMS OF THE  _[Terms of Service]( /TermsOfService.md)_ IF YOU DO NOT ACCEPT THEM, DO NOT USE THE SOFTWARE.
    
     >**Note**  These license terms apply to the use of the content from the domain swx.cdn.skype.com.



  ```js
  <script src="https://swx.cdn.skype.com/shared/v/1.2.15/SkypeBootstrap.min.js"></script> 
  ```

2. Initialize the bootstrapper.

  ```js
  // Call the application object
var config = {
 apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255', // SDK
 apiKeyCC: '9c967f6b-a846-4df2-b43d-5167e47d81e1' // SDK+UI
}; 
var Application

Skype.initialize({ apiKey: config.apiKey }, function (api) {
        
        Application = new api.application();
        //Make sign in table appear
        $(".menu #sign-in").click();
        // whenever client.state changes, display its value
            Application.signInManager.state.changed(function (state) {
            $('#client_state').text(state);
        });
    }, function (err) {
        console.log(err);
        alert('Cannot load the SDK.');
    });
  ```

3. Call the [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) constructor to get the entry point of the SDK.


  ```js
  var Application = new Application();
  ```

4. Register a listener for client state changes.


  ```js
  Application.signInManager.state.changed(function(state) {...});
  ```

5. If the application state is signed out, sign the client in by calling the  **Application.signInManager.signIn** method.


  ```js
  Application.signInManager.signIn ({
    username: $('#username').text(),
    password: $('#password').text()
})
  ```

6. Call application logic appropriate for the resolution of the  **Promise** object returned by the sign in operation.


  ```js
  .then(
  //onSuccess callback
  function () {
  // when the sign in operation succeeds display the user name
  alert('Signed in as'+ application.personsAndGroupsManager.mePerson.displayName());
  }, 
  //onFailure callback
  function (error) {
    // if something goes wrong in either of the steps above,
    // display the error message
    alert(error || 'Cannot sign in');
  });
  ```


The sign in onSuccess callback is invoked only if the user succeeds in signing in. For any SDK calls (such as getting presence) that depend on the user being signed in, you should add the SDK calls in the onSuccess callback. 
    
>**Note:** If sign in fails or you call **signOut**, you must create a new [Application](http://technet.microsoft.com/library/e0969542-53e2-473a-b02f-2554b01451f1%28Office.14%29.aspx) object before attempting to sign in again. The original application object will not be able to attempt a new **signIn** operation.
    
The following example uses basic authentication to sign a user in with a user name and password. The user name is in the form of a SIP address.



```js
/**
 * This script demonstrates how to sign the user in and how to sign it out.
 */
$(function () {
    'use strict';    // create an instance of the Application object;
    // note, that different instances of Application may
    // represent different users
var config = {
 apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255', // SDK
 apiKeyCC: '9c967f6b-a846-4df2-b43d-5167e47d81e1' // SDK+UI
}; 
var Application;
var client;
Skype.initialize({ apiKey: config.apiKey }, function (api) {
        
        Application = new api.application();
        //Make sign in table appear
        $(".menu #sign-in").click();
        // whenever client.state changes, display its value
        Application.signInManager.state.changed(function (state) {
            $('#client_state').text(state);
        });
    }, function (err) {
        console.log(err);
        alert('Cannot load the SDK.');
    });
    // whenever state changes, display its value    
    Application.signInManager.state.changed(function (state) {
        $('#application_state').text(state);
    });
    // when the user clicks on the "Sign In" button    $('#signin').click(function () {
    // start signing in
    Application.signInManager.signIn({
        username: $('#username').text(),
        password: $('#password').text()
    }).then(
        //onSuccess callback
        function () {
            // when the sign in operation succeeds display the user name
            alert('Signed in as ' + Application.personsAndGroupsManager.mePerson.displayName());
        }, 
        //onFailure callback
        function (error) {
            // if something goes wrong in either of the steps above,
            // display the error message
            alert(error || 'Cannot sign in');
        });
});

// when the user clicks on the "Sign Out" button
$('#signout').click(function () {
    // start signing out
    Application.signInManager.signOut()
        .then(
            //onSuccess callback
            function () {
                // and report the success
                alert('Signed out');
            }, 
        //onFailure callback
        function (error) {
            // or a failure
            alert(error || 'Cannot sign in');
        });
});
});

```

