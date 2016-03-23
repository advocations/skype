
# Developing Web SDK applications for Skype for Business Online

 **Last modified:** March 23, 2016

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




```
app.signinManager.signIn({
     "client_id": "...",  //GUID obtained from Azure app registration.
     "origins": ["https://webdir.online.lync.com/autodiscover/autodiscoverservice.svc/root"],
     "cors": true, 
     "redirect_uri": '/myApp/6a2f1539-af96-4cd8-aafa-5ad9c01efa5f/index.html', // Can be any location in the current site. (Any valid Url) 
     "version": '<YourAppName>/1.0.0.0'
})

```


 >**Note**  The  `redirect_uri` parameter is required for Internet Explorer and _optional_ for other browsers.


### Authenticate a user with Office 365 Online

When a user visits your website and initiates sign-in, your application redirects the user to the Azure AD authorization endpoint. Azure AD validates the request and responds with a sign-in page, where the user signs in. 

The following html content shows the Azure AD sign in page to the user when loaded. Be sure to replace  `<add your client id here>` with the client id you got from Azure AD when you registered your app.




```HTML
<html>
<head>
    <title>JohnDContosoTestSite</title>
</head>
<body>
    <script>
        // redirect to Org ID if there is no token in the URL
        if (!location.hash) {
            location.assign('https://login.microsoftonline.com/common/oauth2/authorize?response_type=token' +
                '&amp;client_id=<add your client id here>' +
                '&amp;redirect_uri=' + location.href +
                '&amp;resource=https://webdir.online.lync.com');
        }

        // show the UI if the user has signed in
        if (/^#access_token=/.test(location.hash)) {
				// Use Skype Web SDK to start signing in               
        }
    </script>
</body>
</html>

```

The previous sample shows how to get the access token that you need to use in all Skype Web SDK API calls. To start using the API, you need to get the Skype Web application object with code like the following:




```
var config = {
 apiKey: 'a42fcebd-5b43-4b89-a065-74450fb91255', // SDK
 apiKeyCC: '9c967f6b-a846-4df2-b43d-5167e47d81e1' // SDK+UI
}; 
Skype.initialize({ apiKey: config.apiKey }, function (api) {
        
        var app = new api.application();
        
        // whenever client.state changes, display its value
        app.signInManager.state.changed(function (state) {
            $('#client_state').text(state);
        });
    }, function (err) {
        console.log(err);
        alert('Cannot load the SDK.');
    });


```

The apiKey values in the previous example are valid for the preview SDK. At general availability, these values will change. 

When you have the application object, you sign a user into SfB Online with code like the following example. The access token you got back from Azure AD is used in this snippet to create an authorization header whose key is  `Bearer`.




```
$("#btn-token-sign-in").click(function () {
        var client = window.skypeWebApp;
        $(".modal").show();
        var domain = $("#txt-domain").val();
        var access_token = $("#txt-token").val();
        var Bearercwt = 'Bearer cwt=';
        var Bearer = 'Bearer ';
        var cwt = 'cwt';
        if (access_token.indexOf(cwt) == -1) {
            access_token = Bearercwt + access_token;
        }
        if (access_token.indexOf(Bearer) == -1) {
            access_token = Bearer + access_token;
        }
        var options = {
            auth: function (req, send) {
                req.headers['Authorization'] = access_token.trim();
                return send(req);
            },
            domain: domain
        };
        client.signInManager.signIn(options).then(function () {
            $(".modal").hide();
            console.log('Signed in as ' + client.personsAndGroupsManager.mePerson.displayName());
            $("#anonymous-join").addClass("disable");
            $(".menu #sign-in").click();
        });
    });

```


 **Note**  The specified redirect page must exist on the site.

You may see sign in issues with IE, if you have tried using multiple AAD identities. Please use the following steps to resolve that issue


1. Clear cache/cookies
    
2. Start afresh
    
3. Use private browsing session.
    

### Tenant Administrator Consent Flow

The Skype for Business Online permissions are tenant administrator consent only. For an app to be used by all users of an O365 tenant, a tenant administrator must provide consent. To provide consent for all users in the tenant, construct the following URL for your app as shown in the example below. 


 **Note**  Update the  `client Id` and `redirect Uri` for your app.


```
https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token&amp;client_id= e3d81446-727f-4ebd-adde-adda31311a06&amp;redirect_uri=https://app.contoso.com/&amp;response_mode=form_post&amp;nonce=a4014117-28aa-47ec-abfb-f377be1d3cf5&amp;resource=https://webdir.online.lync.com&amp;prompt=admin_consent
```

Access the URL and authenticate using a tenant administrator credentials and accept the application permissions. Users will now be able to access the application.


## Additional Resources
<a name="bk_addresources"> </a>


- [How to get an Azure Active Directory tenant](https://azure.microsoft.com/en-us/documentation/articles/active-directory-howto-tenant/)
    
- [Managing Applications with Azure Active Directory (AD)](https://azure.microsoft.com/en-us/documentation/articles/active-directory-enable-sso-scenario/)
    
- [Registering Your Application in Azure AD](http://technet.microsoft.com/library/9e4d9905-a17c-458d-8cf5-d384f5bd65fd.aspx)
    
