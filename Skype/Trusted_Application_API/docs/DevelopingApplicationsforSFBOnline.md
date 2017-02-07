
# Developing Trusted Application API applications for Skype for Business Online

Learn how to develop Trusted Application API service applications.

Trusted Application API uses Azure Active Directory (Azure AD) to provide authentication services that your application can use to get the right to access a set of capabilities. To do this, you need to do the following:

## Getting started

1. Register your application in Azure AD, from where you will get Client ID, App ID URI. Read [Registration in Azure Active Directory](./RegistrationInAzureActiveDirectory.md)
 for details.

2. Upload your application's credential certificate to AAD for authentication. Read [Azure Active Directory - Service to Service calls using Client Credentials](./AADS2S.md)
for details.

3. Register your app in Skype for Business Online: Use the Client ID and App ID URI from Azure AD and register your Trusted Application with the Skype for Business Online service. Read [Registration in SFB Online](./SfBRegistration.md) for more details.

4. Set up trusted endpoints and provide consent.  - When the application is registered in AAD, it is registered in the context of a tenant. When the same tenant wants to use the application, you do not need tenant consent.
 For a different tenant to use the Service Application, for example, when the application is developed as a multi-tenant application, it must be consented to by that tenant's admin. Refer [Tenant Admin Consent](./TenantAdminConsent.md) for more details.

   - Setting up the Trusted application endpoint has few additional steps. Please refer the [Trusted Application Endpoint](./TrustedApplicationEndpoint.md) for more details. 

7. Call the trusted application API. 

### Auto Discovery
It is the act of finding the Trusted Application APIs home server using the discovery endpoint. This enables you to 
connect to the API and use the exposed capabilities.
  
>Note: For **PSTN or Service applications**, please refer [Discovery for Service Applications](./DiscoveryForServiceApplications.md). For Chat **Customer care applications**, please refer [Discovery by chat client](./DiscoveryChatClient.md)

### Authentication using client credentials
All endpoints other than the Discovery endpoint require authentication.
Trusted Application API endpoints require an oauth token with an Application Identity from Azure Active Directory using the client credential grant flow.
This grants the permissions to the application  to access the Trusted Application API resource. Please refer [Azure Active Directory - Service to Service calls using Client Credentials](./AADS2S.md)
for more details.


## In this section

- [Registration in Azure Active Directory](./RegistrationInAzureActiveDirectory.md)
- [Azure Active Directory - Service to Service calls using Client Credentials](./AADS2S.md)
- [Tenant Admin Consent](./TenantAdminConsent.md)
- [Set up a trusted Application Endpoint](./TrustedApplicationEndpoint.md)
- [Registering a Trusted Application in Skype for Business Online](./SfBRegistration.md)
- [Discovery for Service Applications](./DiscoveryForServiceApplications.md)
- [Authentication and Authorization](./AuthenticationAndAuthorization.md)


 
The following topics also apply to the Trusted Application API Online service application workflow:

- [Webhooks (Events)](./Webhooks.md)
- [Call Flows](./CallFlows.md)
- [Trusted Application API Reference Library](./ReferenceLibrary.md)
 
