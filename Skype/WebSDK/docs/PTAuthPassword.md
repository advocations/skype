
# Authentication using Username and Password

 _**Applies to:** Skype for Business 2015_

After bootstrapping the Skype Web SDK we have access to an api object which exposes an application object.  If we create a new instance of an application we get access to a signInManager.  The signInManager provides us with a signIn(...) method that we can supply a version, username, and password to authenticate.

## Provide a username and password to authenticate

1. Provide a username and password to authenticate.

  ```js
    var application = api.UIApplicationInstance;
    application.signInManager.signIn({
        version: version,
        username: username,
        password: password
    }).then(function () {
        window.framework.reportStatus('Signed In', window.framework.status.success);
    }, function (error) {
        window.framework.reportError(error);
    }).then(reset);
  ```
