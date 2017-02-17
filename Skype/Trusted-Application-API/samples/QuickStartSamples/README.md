#Introduction 
The Trusted Application API is a Rest API that enables developers to build Skype for Business Online back-end communications services for the cloud.  The Trusted Application API Samples contain samples for the bankend Trusted Application and samples for how to interact with the trusted application from a client-side browser using the Skype Web SDK. 

The Trusted Application QuickStart console app sample demonstrates:

- Authenticating a Trusted Application with Client Credentials Grant Flow
- Trusted Application Discovery
- Scheduling an AdhocMeeting
- Retreiving an Anonymous Token and Discover URL for the Adhocmeeting (allows clients to join the meeting anonymously)

#Getting Started

**1. Registration**

Use the [quick registration tool](https://aka.ms/skypeappregistration) for registering Skype for Business Trusted Applications in Azure and Skype for Business Online, that eliminates the need to register an Application manually in Azure portal.

>NOTE: You can optionally manually register your application in Azure Portal, where you will get a Client ID and set an App ID URI. Refer to [Registration in Azure Active Directory](https://github.com/OfficeDev/skype-docs/blob/master/Skype/Trusted-Application-API/docs/RegistrationInAzureActiveDirectory.md) for details.

**2. Register trusted application endpoints**

Register Trusted Endpoints in a Skype for Business Online tenant using PowerShell.   Refer to [Setting up a Trusted Application Endpoint](https://github.com/OfficeDev/skype-docs/blob/master/Skype/Trusted-Application-API/docs/TrustedApplicationEndpoint.md) for details.

**3. Provide consent**

When the application is registered in AAD, it is registered in the context of a tenant.  For a tenant to use the Service Application, for example, when the application is developed as a multi-tenant application, it must be consented to by that tenant's admin. Refer to [Tenant Admin Consent](https://github.com/OfficeDev/skype-docs/blob/master/Skype/Trusted-Application-API/docs/TenantAdminConsent.md) for more details.

**4. Clone samples and Restore NuGet Packages** 

Configure required parameters in the App.config file, including authentication using client secret from the registration portal.

	        public const string ApplicationEndpointId = "sip:yourtrustedapp@contoso.onmicrosoft.com";
	        public const string AAD_ClientId = "318fbf0c-d180-4cd9-8d13-7d0e2cabab9e";
	        public const string AAD_ClientSecret = "Z3YhEZAoknXcPRl++RrzdS2bnRTy6TKOx4zHf/vsuvU=";
		

**5. Run samples**
