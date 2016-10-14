
# Authentication using Azure Active Directory (AAD)

 _**Applies to:** Skype for Business 2015_

Getting OAuth correct is not an easy task, but it can be thought of as a few easy to follow steps.  First will be to create users who will be authorized for this online application (more information can be found at: [Create or edit users in Azure AD](https://azure.microsoft.com/en-us/documentation/articles/active-directory-create-users/).
Next we create an application in the portal and add delegate permissions for Skype for Business Online and provide a Reply URL.  The exact URL can be found below, so feel free to copy it when creating your application in the Azure Portal. We will also need to make an additional step to enable the OAuth 2.0 Implicit Grant flow which involves manual editing of the application manifest.  Check out [Integrating Applications with Azure Active Directory](https://azure.microsoft.com/en-us/documentation/articles/active-directory-integrating-applications/) and look for the section about **Enabling OAuth 2.0 Implicit Grant for Single Page Applications**.

Once that application is created we should now have a Client ID that we can use for sign-in by redirecting for authorization. Upon succesfully login, the authorization page should redirect back to the main page where a hash value will be present in the URL. This framework has code built-in to handle checking for this value and completing sign-in.
        
It is advised to not be logged into multiple MSA accounts when testing out OAuth because multiple users will confuse the sign-in process preventing proper authentication. For best results consider running in your browser's private mode if available.

## Provide a client id to sign-in

1. Provide a client id to sign-in.

  ```js
    window.sessionStorage.setItem('client_id', client_id);
    var href = 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=token&client_id=';
    href += client_id + '&resource=https://webdir.online.lync.com&redirect_uri=' + window.location.href;
    window.location.href = href;
  ```
