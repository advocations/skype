# AAD Auth Failures - Application with identifier <...> was not found in the directory <...>

_**Applies to:** Skype for Business 2015_

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the
Skype for Business Web SDK and you are seeing an AAD error page that looks like the following
then this page is for you. The page should have this message: "Application with identifier 
<...> was not found in the directory <...>."

![Incorrect Client ID](../../../images/troubleshooting/auth/IncorrectClientID.png)

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a
list of other potential issues.


## The Issue

You are providing an incorrect application ID when redirecting to AAD or when calling  
`signInManager.signIn`.

## The Solution

You need to provide a valid application ID when redirecting to AAD to sign in and then
again when signing in with `signInManager.signIn`.
