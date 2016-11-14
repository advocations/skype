# AAD Auth Failures - Response type 'token' is not enabled for the application 

_**Applies to:** Skype for Business 2015_

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the
Skype for Business Web SDK and you are seeing an AAD error page that looks like the following
then this page is for you. The page should have this message: "response_type 'token' is not
enabled for the application."

![Enable Implicit OAuth for AAD app](../../../images/troubleshooting/auth/TokenNotEnabled.png)

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a
list of other potential issues.


## The Issue

Need to Enable Implicit OAuth Token Authentication

## The Solution

You need to manually edit the application manifest and set the `EnableImplicitOAuthTokens`
property to true for the application.

