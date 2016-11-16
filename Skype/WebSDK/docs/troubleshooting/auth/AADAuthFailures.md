# Troubleshooting Azure AD Authentication Failures for Skype Web SDK

_**Applies to:** Skype for Business 2015_

If you are developing an application with the Skype Web SDK and you are attempting to use Azure Active Directory to authenticate your users (such as by following this guide:  [Authentication using Azure Active Directory (AAD)](../../PTAuthAzureAD.md)) and you are experiencing some kind of error then this article is for you.

Depending on the specific failure case you are experiencing while trying to authenticate to the Skype Web SDK, this article will attempt to provide specific guidance to fix your issue. 

## Common Error Messages

If your user is successfully redirected to the AAD sign in page, enters correct credentials for a Skype for Business Online user, and hits an error page with the text "Sorry, but we're having trouble signing you in," there should be a small section in the bottom right of the page labeled "Additional technical information." This section provides a more specific error message to help figure exactly what is going wrong with your sign in attempt.

This is roughly what the error screen should look like. Look for your specific error in the "Additional technical information" area indicated by the rectangle.

![AAD sign in error](../../../images/troubleshooting/auth/AdditionalTechnicalInfo.PNG)

Based on the type of error message you're seeing, choose the appropriate link below for specific instructions on how to fix that error message. You may have multiple errors, and after fixing one you might have to return here to fix another.

### [Application with identifier <...> was not found in the directory <...>](./AADAuth-ClientID.md)

This error indicates you have probably specified an incorrect client_id when redirecting to the AAD sign in page.

View the full article on how to correct this [**here**](./AADAuth-ClientID.md).

### [The client application has requested access to resource 'https://webdir.online.lync.com.' This request has failed because the client has not specified this resource in its requiredResourceAccess list](./AADAuth-DelegatePermissions.md)

This error indicates that you have not configured your AAD app to be able to access the Skype for Business Online APIs.

View the full article on how to correct this [**here**](./AADAuth-DelegatePermissions.md).

### [The reply address 'https://...' does not match the reply addresses configured for the application <...>](./AADAuth-ReplyURLs.md)

This error indicates that the redirect uri you specified when navigating to the AAD sign in page has not been configured as one of the valid "Reply URLs" for the app in AAD.

View the full article on how to correct this [**here**](./AADAuth-ReplyURLs.md).

### [Calling principal cannot consent due to lack of permissions](./AADAuth-AdminConsent.md)

This error indicates that the user attempting to sign in cannot consent to use some external resource that the AAD application configuration specifies it must consent to. This is most likely because an administrator in the tenant has to sign in first and grant permission on behalf of all non-administrator users in the tenant.

View the full article on how to correct this [**here**](./AADAuth-AdminConsent.md).

### [Response_type 'token' is not enabled for the application](./AADAuth-EnableImplicitOAuth.md)

This error indicates that you still have to manually edit the application manifest in AAD to enable the implicit OAuth sign in flow.

View the full article on how to correct this [**here**](./AADAuth-EnableImplicitOAuth.md).

## Other Common Failures

Some failures are a little more difficult to detect because the app will simply seem to silently fail to sign in, rather than redirecting to an error page with a helpful error message. You might need to use a web debugging proxy such as Fiddler or Charles to identify what request is failing. The error message can sometimes be buried in an HTTP response that appears successful, such as in a response where the body is an HTML page with an error message hidden somewhere on the page.

### No CORS

If you attempt to call `signInManager.signIn` after being redirected back from the AAD signin page and fail to specify the `cors: true` option, the signin will fail silently with a HTTP 403 Forbidden response.

The solution is to add the `cors` parameter to your sign in options object and specify a valid empty html file in a valid subfolder of your main app directory as the value of the `redirect_uri` parameter. In IE, this file may be necessary for passing the OAuth token back from AAD and forward when signing in to SfB online.

``` js
application.signInManager.signIn({
    version: config.version,
    client_id: client_id,
    origins: ["https://webdir.online.lync.com/autodiscover/autodiscoverservice.svc/root"],
    cors: true, // Must specify this
    redirect_uri: location.href + '/token.html' // This must the path to a valid empty HTML file
});
```

### Internet Explorer-Specific Failures

There are a couple failures that occur specifically on Internet Explorer. In both of these cases, the user will be redirected to the AAD sign-in page, seem to authenticate successfully, be redirected back, and then silently fail to sign in back on the app page. Use Fiddler or Charles to get a better clue of what the actual failure is, but here are a couple common ones.

#### [Crossing security zone boundaries](./AADAuth-IESecurityZones.md)

If you are hosting a web app temporarily on http://localhost, and your app is silently failing to sign in once redirected back, it may be because IE is blocking cookies from being transferred between internet "security zones." The trusted zone of "localhost" and the external AAD sign in page are in different security zones by default.

View the full article on how to correct this [**here**](./AADAuth-IESecurityZones.md).

#### [Invalid CORS redirect URI](./AAdAuth-IECORSRedirectURI.md)

In Internet Explorer, the authentication token obtained when signing into AAD can sometimes be lost upon being redirected back to the original app page. Providing a valid placeholder html file in a subfolder of your main app directory can serve as a place for AAD to store and retrieve the OAuth token.

View the full article on how to correct this [**here**](./AAdAuth-IECORSRedirectURI.md).

---

## Related Topics

- [Authentication using Azure Active Directory (AAD)](../../PTAuthAzureAD.md)
- [Integrating Applications with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-integrating-applications)

## External Resources

- [Get and set up Fiddler](http://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/InstallFiddler)
- [Configure Fiddler to decrypt HTTPS traffic](http://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/DecryptHTTPS)
