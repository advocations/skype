
# Authentication using Windows Auth

 _**Applies to:** Skype for Business 2015_

After bootstrapping the Skype Web SDK we have access to an api object which exposes an application object.  If we create a new instance of an application we get access to a signInManager.  The signInManager provides us with a signIn(...) method that we a domain and without credentials a Windows Auth prompt will appear to authenticate.

## Provide domain to authenticate

1. Provide domain to authenticate.

  ```js
    var application = api.UIApplicationInstance;
    application.signInManager.signIn({
        version: version,
        domain: domain
    }).then(function () {
        window.framework.reportStatus('Signed In', window.framework.status.success);
    }, function (error) {
        window.framework.reportError(error);
    }).then(reset);
  ```
