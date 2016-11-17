
# Authentication using WebTicket

 _**Applies to:** Skype for Business 2015_

After bootstrapping the Skype Web SDK we have access to an api object which exposes an application object.  If we create a new instance of an application we get access to a signInManager.  The signInManager provides us with a signIn(...) method that we can supply a domain and auth function that sets the request's Authorization header with a web ticket to authenticate.

## Provide webticket and domain to authenticate

1. Provide webticket and domain to authenticate.

  ```js
    var application = api.UIApplicationInstance;
    application.signInManager.signIn({
        version: version,
        auth: function (req, send) {
            req.headers['Authorization'] = webTicket;
            return send(req);
        },
        domain: domain
    }).then(function () {
        console.log("Signed in");
    }, function (error) {
        console.log("Error: couldn't sign in");
    }).then(reset);
  ```
