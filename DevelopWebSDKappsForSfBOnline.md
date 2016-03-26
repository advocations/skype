
# Developing Web SDK applications for Skype for Business Online

 **Last modified:** March 25, 2016

 _**Applies to:** Skype for Business | Skype for Business Online_

 **In this article**<br/>
[App registration](#app-registration)<br/>
[Update your code](#update-your-code)<br/>
[Tenant Administrator Consent Flow](#tenant-administrator-consent-flow)<br/>
[Additional Resources](#additional-resources)<br/>


This section shows how to develop a Skype Web SDK client application for Skype for Business Online. As a prerequisite, you will need to have already set up a tenant on your Azure subscription, then register your application in Azure AD, and configure the app manifest to allow implicit grant flow. After you update your Skype Web SDK code to configure the sign-in manager, the application is ready to authenticate users.

 >**Note**  This topic does not apply to on-premises or hybrid server scenarios; only online scenarios.


## App registration
<a name="sectionSection0"> </a>

Skype for Business Online uses Azure Active Directory (Azure AD) to provide authentication services that your application can use to obtain rights to access the service APIs. To accomplish this, your application needs to perform the following steps:


1.  **Register your application in Azure AD**. To allow your application access to the Skype Web SDK APIs, you need to register your application in Azure AD. This will allow you to establish an identity for your application and specify the permission levels it needs in order to access the APIs. For details, see **Registering your application in Azure AD**.
    
2.  **Add a sign in feature to your app**. When a user visits your website and initiates sign-in, your application makes a request to the Microsoft common OAuth2 login endpoint. Azure AD validates the request and responds with a sign-in page, where the user signs in. A use must explicitly grant consent to allow your application to access user data by means of the Skype Web SDK APIs. The user reads the descriptions of the access permissions that your application is requesting, and then grants or denies the request. After consent is granted, the UI redirects the user back to your application. If authentication and authorization are successful, Azure AD returns a token and grants access to SfB Online and identifies the current signed-in user. For details on authentication, see [Authentication Using Azure AD](http://technet.microsoft.com/library/f66482d2-ac35-4b25-9c8b-0f5f7ab89b01.aspx). For details of authorization, see [Skype for Business Online Scope Permissions](http://technet.microsoft.com/library/e292d8ef-3b05-4442-9983-378f6f958f8b.aspx).
    
3.  **Call the Skype Web SDK APIs**. Your application passes access tokens to the Skype Web SDK APIs to authenticate and authorize your application.
    

### Registering your application in Azure AD

Sign in to the Azure Management Portal, then do the following:


1. Click the  **Active Directory** node in the left column and select the directory linked to your Skype for Business subscription.
    
2. Select the  **Applications** tab and then **Add** at the bottom of the screen.
    
3. Select  **Add an application my organization is developing**.
    
4. Choose a name for your application, such as  `skypewebsample`, and select  **Web application and/or web API** as its **Type**. Click the arrow to continue.
    
5. The value of  **Sign-on URL** is the URL at which your application is hosted.
    
6. The value of  **App ID URI** is a unique identifier for Azure AD to identify your application. You can use `http://{your_subdomain}/skypewebsample`, where  `{your_subdomain}` is the subdomain of .onmicrosoft you specified while signing up for your Skype for Business Web App (website) on Azure. Click the check mark to provision your application.
    
7. Select the  **Configure** tab, scroll down to the **Permissions** to other applications section, and click the **Add application** button.
    
8. In order to show how to create online meetings, add the  **Skype for Business Online** application. Click the plus sign in the application's row and then click the check mark at the top right to add it. Then click the check mark at the bottom right to continue.
    
9. In the  **Skype for Business Online** row, select **Delegated Permissions**, and in the selection list, choose  **Create Online Meetings**.
    
10. Select  **Application is Multi-Tenant** to configure the application as a multi-tenant application.
    
11. Click  **Save** to save the application's configuration.
    
These steps register your application with Azure AD, but you still need to configure your app's manifest to use OAuth implicit grant flow, as explained below.


### Configure your app for OAuth implicit grant flow

In order to get an access token for Skype for Business API requests, your application will use the OAuth implicit grant flow. You need to update the application's manifest to allow the OAuth implicit grant flow because it is not allowed by default.


1. Select the  **Configure** tab of your application's entry in the Azure Management Portal.
    
2. Using the  **Manage Manifest** button in the drawer, download the manifest file for the application and save it to your computer.
    
3. Open the manifest file with a text editor. Search for the  `oauth2AllowImplicitFlow` property. By default it is set to false; change it to **true** and save the file.
    
4. Using the  **Manage Manifest** button, upload the updated manifest file.
    
This will register your application with Azure AD. In order for your Skype Web application to access Skype for Business Server resources (such as messaging or presence), it needs to obtain an access token using implicit grant flow. This token gives the application permission to access the resource.


## Update your code
<a name="sectionSection1"> </a>

To update your code to support Skype for Business Online, you'll need to update a web page in the app to show the Azure sign in screen. In addition, you'll need to make changes in JavaScript to initialize the Skype Web SDK API entry point. Finally, you'll need to handle a sign in button click. In this click handler, you'll sign a user in through the Skype Web SDK.


### Support for OAuth2 in Internet Explorer

You'll need to create additional folders in your web app directory for users who start the app in Internet Explorer. The path must match the redirect uri that you specify when signing a user in.

The following example shows the parameters that are required when signing in to Skype for Business Online. The redirect_uri parameter value in this sample is the url of an index.html page in a folder below the web app folder. You should use the client id GUID from the Azure app registration to name the folder.




```js
app.signinManager.signIn({
     "client_id": "...",  // GUID obtained from Azure app registration.
     "origins": [ "https://webdir.online.lync.com/autodiscover/autodiscoverservice.svc/root" ],
     "cors": true, 
     "redirect_uri": '/an/empty/page.html',
     "version": '<YourAppName>/1.0.0.0'
});
```


 >**Note** If `redirect_uri` is not specified, the SDK picks a random one. This doesn't work in Internet Explorer because when it sends a GET to it and gets back a 404, it does an extra redirect to `res://ieframe.dll/http_404.htm` and drops the access token from the original URL. If `redirect_uri` points to a folder, implying the `index.html` file under it, then IE will also drop the access token from the original URL.


### Authenticate a user with Office 365 Online

When a user visits your website and initiates sign-in, your application redirects the user to the Azure AD authorization endpoint. Azure AD validates the request and responds with a sign-in page, where the user signs in. 

The following html content shows the Azure AD sign in page to the user when loaded. Be sure to replace  `<add your client id here>` with the client id you got from Azure AD when you registered your app.

```HTML
<!doctype html>
<html>
<head>
    <title>OAuth</title>
</head>
<body>
    <script>
    	var hasToken = /^#access_token=/.test(location.hash);
    	var hasError = /^#error=/.test(location.hash);
    	
    	var client_id = '<add your client id here>';
    
        // redirect to Org ID if there is no token in the URL
        if (!hasToken && !hasError) {
            location.assign('https://login.microsoftonline.com/common/oauth2/authorize?response_type=token' +
                '&client_id=' + client_id +
                '&redirect_uri=' + location.href +
                '&resource=https://webdir.online.lync.com');
        }

        // show the UI if the user has signed in
        if (hasToken) {
		// Use Skype Web SDK to start signing in               
        }
        
        if (hasError) {
        	console.log(location.hash);
        }
    </script>
</body>
</html>
```

The previous sample shows how to get the access token that you need to use in all Skype Web SDK API calls. To start using the API, you need to get the Skype Web application object with code like the following:

```js
Skype.initialize({ apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255' }, function (api) {
        app = new api.application();
});
```

The apiKey value in the previous example is valid for the preview SDK. At general availability, these values will change. 

When you have the application object, you sign a user into SfB Online with code like the following example.

```js
// the SDK will get its own access token
app.signInManager.signIn({
	client_id: client_id,
        cors: true,
        redirect_uri: '/an//empty/page/for/ie.html',
        origins: [ "https://webdir.online.lync.com/autodiscover/autodiscoverservice.svc/root" ]
});
```

>**Note**  The specified redirect page must exist on the site.

You may see sign in issues with IE, if you have tried using multiple AAD identities. Please use the following steps to resolve that issue:

1. Clear cache/cookies
2. Start afresh
3. Use private browsing session.

### Tenant Administrator Consent Flow

The Skype for Business Online permissions are tenant administrator consent only. For an app to be used by all users of an O365 tenant, a tenant administrator must provide consent. To provide consent for all users in the tenant, construct the following URL for your app as shown in the example below. 

>**Note**  Update the  `client Id` and `redirect Uri` for your app.

```
https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token
	&client_id= ...
	&redirect_uri=https://app.contoso.com/
	&response_mode=form_post
	&nonce=...
	&resource=https://webdir.online.lync.com
	&prompt=admin_consent
```

Access the URL and authenticate using a tenant administrator credentials and accept the application permissions. Users will now be able to access the application.

## Additional Resources
<a name="bk_addresources"> </a>

- [How to get an Azure Active Directory tenant](https://azure.microsoft.com/en-us/documentation/articles/active-directory-howto-tenant/)
    
- [Managing Applications with Azure Active Directory (AD)](https://azure.microsoft.com/en-us/documentation/articles/active-directory-enable-sso-scenario/)
    
- [Registering Your Application in Azure AD](http://technet.microsoft.com/library/9e4d9905-a17c-458d-8cf5-d384f5bd65fd.aspx)
    
