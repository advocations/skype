# AAD Auth Failures - The client application has requested access to resource 'https://webdir.online.lync.com.' This request has failed because the client has not specified this resource in its requiredResourceAccess list.

_**Applies to:** Skype for Business 2015_

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the Skype for Business Web SDK and you are seeing an AAD error page that looks like the following then this page is for you. The page should have this message: "The client application has  requested access to resource 'https://webdir.online.lync.com.' request has failed because the client has not specified this resource in its requiredResourceAccess list."

![Need to delegate permission to SFB online API](../../../images/troubleshooting/auth/MustGrantDelegatedPermissions.PNG)

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a list of other potential issues.


## The Issue

You either did not configure permissions for the application to access the Skype for Business Online APIs in AAD or did so incorrectly.

When registering your Skype Web SDK app in Azure AD, you need to indicate that your web application will require the user (or admin, in this case) to consent to the app accessing the Skype for Business Online APIs within the context of the particular authenticated user.

You can find more information about the Azure AD consent framework in this article: [Integrating Applications with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-integrating-applications).

## The Solution

You need to configure your application to access the SfB Online API by adding the API as one of the resources required by the application, and then indicating that your app needs all the delegated permissions made available by the API. They all require admin consent, which means that the before any user can sign in, an admin must sign in and consent to all of these delegated permissions on behalf of all users in the tenant. Once the admin consents, the application will have all the specified delegated permissions in the context of whatever user is signed in.

1. Sign into **portal.azure.com** with an account that is an administrator in your tenant. Using the left hand side-bar, navigate to Azure Active Directory > App Registrations > Your app > All settings.
2. Under API Access, click "Required Permissions."
![Finding Required Permissions Pane](../../../images/troubleshooting/auth/AADRequiredPermissionsPane.PNG)
3. At the top of this pane, click "Add" > Select an API.
4. Search for "Skype for Business Online" (if you don't see results, try "Microsoft.Lync").
5. Click the API that matches the search and click "select" at the bottom.
![Add required permissions for an app](../../../images/troubleshooting/auth/AADAddAPIAccess.PNG)
6. Click all the check boxes next to permissions in the "Delegated Permissions" section and click "select." Don't click any of the check boxes under the "Application Permissions" section. Then click "done" in the "Add API access" pane to the left.
![Indicate delegated permissions for app](../../../images/troubleshooting/auth/AADAPIDelegatedPermissions.PNG)
7. Now sign in with an administrator account and you should be prompted to consent to the delegated permissions you indicated would be required by your app on behalf of all users within your tenant.
![Admin consent prompt upon sign in](../../../images/troubleshooting/auth/ProvidingAdminConsentCensored.PNG)

> For more information on the difference between these types of permissions, see the section **Configuring a client application to access web APIs** in this article: [Integrating Applications with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-integrating-applications).

Once you accept this prompt, all users in the tenant should be able to sign in and should not have to individually consent to these permissions, since the tenant admin has already consented on their behalf.

If you accidentally click "Cancel" rather than accept and find yourself no longer being prompted to provide admin consent, then you may have to force AAD to display the admin consent prompt again. There are instructions on how to do so in [this](./AADAuth-AdminConsent.md) article.

## Related Topics
- [Troubleshooting AAD Auth Failures for Skype Web SDK](./AADAuthFailures.md)
- [Forcing the Admin Consent Prompt for Required Resources to Appear](./AADAuth-AdminConsent.md)
- [Integrating Applications with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-integrating-applications)
- [Giving a Web Access to a Web API](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-authentication-scenarios#web-application-to-web-api)
