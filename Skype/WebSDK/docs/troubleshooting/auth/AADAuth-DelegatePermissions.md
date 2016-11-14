# AAD Auth Failures - The client application has requested access to resource 'https://webdir.online.lync.com.' This request has failed because the client has not specified this resource in its requiredResourceAccess list.

_**Applies to:** Skype for Business 2015_

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the
Skype for Business Web SDK and you are seeing an AAD error page that looks like the following
then this page is for you. The page should have this message: "The client application has 
requested access to resource 'https://webdir.online.lync.com.' request has failed because the
client has not specified this resource in its requiredResourceAccess list."

![Need to delegate permission to SFB online API](../../../images/troubleshooting/auth/MustGrantDelegatedPermissions.png)

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a
list of other potential issues.


## The Issue

You either did not configure permissions for the application to access the Skype for Business
Online in AAD or did so incorrectly.


## The Solution

Need to Configure Delegated Permissions to SfB Online API
