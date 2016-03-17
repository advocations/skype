
# Developing Web SDK applications for Skype for Business Server

 **Last modified:** February 19, 2016

 _**Applies to:** Skype for Business_

 **In this article**<br/>
[Initialize the Skype application object](#sectionSection0)<br/>
[Basic authentication](#sectionSection1)<br/>
[Integrated Windows Authentication (IWA)](#sectionSection2)<br/>
[Anonymous meeting join](#sectionSection3)<br/>
[Passive authentication](#sectionSection4)


This section shows how to develop a Skype Web SDK client application for Skype for Business Server (for authenticating against on-premises servers).

## Initialize the Skype application object
<a name="sectionSection0"> </a>

Add the following code to the document function of an index page in your app.


```js
var config = {
    apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255', // SDK Preview
};

Skype.initialize({ apiKey: config.apiKey }, function (api) {
        var app = new api.application();
        app.signinManager.signIn(...);
    }, function (err) {
        console.log(err);
        alert('Cannot load the SDK.');
});
```


## Basic authentication
<a name="sectionSection1"> </a>

In the basic authentication flow, your application simply provides a user name and password. To sign in using basic authentication, make Skype Web SDK API calls such as the following:


```js
app.signInManager.signIn({
    username: 'user123@contoso.com',
    password: '17Psnds732'
}).then(function () {
    alert('Signed in ' );
}, function (error) {
    alert(error || 'Cannot sign in');
});
```


## Integrated Windows Authentication (IWA)
<a name="sectionSection2"> </a>

To sign in using Integrated Windows Authentication (IWA) flow, your application needs to provide the domain FQDN (the  `X-MS-Server-Fqdn` header used for autodiscovery) or URLs of rel=user and rel=xframe resources. To sign in using IWA, make Skype Web SDK API calls such as the following:


```js
app.signInManager.signIn({
    domain: 'microsoft.com'
}).then(function () {
    alert('Signed in' );
}, function (error) {
    alert(error || 'Cannot sign in');
});
```


## Anonymous meeting join
<a name="sectionSection3"> </a>

To sign in using the anonymous meeting join flow, your application needs to provide the URI of the online meeting. To sign in using anonymous meeting join, make Skype Web SDK API calls such as the following:


```js
app.signInManager.signIn({
    meeting: 'sip:user123@contoso.com;gruu;opaque=app:conf:focus:id:AHSJDNA'
}).then(function () {
    alert('Signed in  ' );
}, function (error) {
    alert(error || 'Cannot sign in');
});
```


## Passive authentication
<a name="sectionSection4"> </a>

You can use passive authentication (ADFS) in the Office 365 suite to get access tokens for Skype for Business Server. To sign in using passive authentication, make Skype Web SDK API calls such as the following:


```js

app.signInManager.signIn({
    auth: "passive",
    domain: 'lynceufd.com'
}).then(function () {
    var me = app.personsAndGroupsManager.mePerson;
    me.status.on('changed', function (status) {
        document.title = me.displayName() + ' - ' + status;
    });
}).catch(function (err) {
    console.log(err &amp;&amp; err.stack || err);
    document.title = err + '';
});

```


## See also
<a name="sectionSection4"> </a>


#### Concepts


[Retrieve the API entry point and sign in a user]( /GetAPIEntrySignIn.md)
