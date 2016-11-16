# AAD Auth Failures - Invalid CORS redirect URI in Internet Explorer

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the Skype for Business Web SDK in Internet Explorer, you are successfully authenticating to Azure AD and getting redirected back to your web application, and then your sign in fails silently or hangs indefinitely, then this might be your issue. If your sign in is also failing in browsers other than IE, this probably is not your issue, or in any case is not your only issue.

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a list of other potential issues.

## The Issue

Generally when authenticating against Azure AD, you are redirected to the Azure AD sign in page, enter your credentials, and are redirected back to a page specified during the initial redirect to the AAD sign in page by the `redirect_uri` query parameter in the URL. However, now the URL of this page should include your obtained access token in the fragment of the URL. However, sometimes after authenticating against Azure AD in Internet Explorer this fragment is lost. Providing a valid empty html file where AAD can store and retrieve the token helps to mitigate this issue. This issue is intermittent even when present, so it might be difficult to detect.

## The Solution

If you don't specify a valid `redirect_uri` for CORS when making the call to `signInManager.signIn` after being redirected back to the main app page from AAD, it is possible for IE to lose the token provided by AAD, and if you don't specify a `redirect_uri` that points to an empty html file in a valid subfolder of your main app directory, when you attempt the actual sign in the token will not be present and the sign in will fail.

The solution is to create an empty html file (eg. `token.html`) in a valid subfolder of your hosted main app folder, and provide the path to that as the value of the `redirect_uri` parameter in the call to `signInManager.signIn`. For example, if your app is in a folder called **myapp**, create an empty file named `token.html` in the **myapp** folder on your machine, and make this path the value of the `redirect_uri` parameter when signing in:

``` js
application.signInManager.signIn({
    version: config.version,
    client_id: client_id,
    origins: ["https://webdir.online.lync.com/autodiscover/autodiscoverservice.svc/root"],
    cors: true,
    redirect_uri: location.href + '/token.html'
});
```

In the above example, `location.href` is the URL of the page where you're calling `signInManager.signIn`, so as long as this page is an html file in the root **myapp** folder of your app and `token.html` is in the same folder or a subfolder of this root, it should prevent you from experiencing this issue.

This failure is inconsistent, and you will not necessarily experience this failure all the time if you do not do this, but if you don't, signing into your app will be inconsistent in IE so it is highly recommended.

## Related Topics

- [Troubleshooting AAD Auth Failures for Skype Web SDK](./AADAuthFailures.md)
- [Integrating Applications with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-integrating-applications)
- [Authentication in UCWA apps using Azure AD](../../../../UCWA/AuthenticationUsingAzureAD.md)
