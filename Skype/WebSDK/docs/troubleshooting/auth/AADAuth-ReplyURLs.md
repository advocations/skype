# AAD Auth Failures - The reply address 'https://...' does not match the reply addresses configured for the application <...>

_**Applies to:** Skype for Business 2015_

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the
Skype for Business Web SDK and you are seeing an AAD error page that looks like the following
then this page is for you. The page should have this message: "The reply address 'https://...'
does not match the reply addresses configured for the application <...>"

![Reply URL incorrect or not configured in AAD](../../../images/troubleshooting/auth/ReplyURLIncorrect.png)

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a
list of other potential issues.


## The Issue

You either have not configured the url where you're hosting your app as a valid reply URL in
AAD, or you have not specified the correct url as the "redirect_uri" portion of the URL when
redirecting to the AAD sign in page to allow the user to enter credentials.

## The Solution

Configure the main page of your app as a reply URL in AAD and pass it as the redirect_uri 
when redirecting to AAD to allow the user to sign in.
