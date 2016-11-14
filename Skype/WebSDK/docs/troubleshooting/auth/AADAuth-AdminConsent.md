# AAD Auth Failures - Calling principal cannot consent due to lack of permissions

_**Applies to:** Skype for Business 2015_

## Who is this article for?

If you are attempting to use the Azure AD authentication option to sign into the
Skype for Business Web SDK and you are seeing an AAD error page that looks like the following
then this page is for you. The page should have this message: "Calling principal cannot 
consent due to lack of permissions."

![Tenant Admin has not provided consent for all users](../../../images/troubleshooting/auth/TenantAdminHasNotProvidedConsent.png)

If this is not your issue, you can return to [this page](./AADAuthFailures.md) for a
list of other potential issues.


## The Issue

You are either trying to sign in with a non-administrator account in the tenant where you have
registered your application before an admin has signed in and provided consent, or the admin
revoked or denied permission for all users in the tenant and has not yet re-consented.

## The Solution

When configuring the app through AAD to use the SfB online APIs, you must sign in as a tenant
admin the first time and consent on behalf of all users in the tenant to access the Skype for
Business online APIs.

After removing consent by deleting the enterprise application in AAD, you may have to manually
force AAD to prompt you to reconsent by navigating to this URL and signing in with an admin
account: 
> **https://login.microsoftonline.com/common/oauth2/authorize?response\_type=id\_token&
client\_id=<YOUR\_APP\_ID>&redirect\_uri=<YOUR\_APP\_URL>&response\_mode=form\_post&
resource=https://webdir.online.lync.com&prompt=admin_consent**
