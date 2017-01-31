# Registering a Trusted Application in Skype for Business Online

Each Trusted Application must be registered against the Skype for Business Online Platform Service.  There are two registration steps for a Trusted Application against Skype for Business Online:

1. Registration of the Trusted Application: this step is completed by the ISV or Developer

2. Registration of the Trusted Application Endpoint: this step is completed by the end Customer (Tenant Admin)


Each registration step has an appropriate UI or Powershell script to perform registration. 


## Register a Trusted Application 

As a developer, to register your Service Application in Skype for Business Online, you must use the [quick registration tool](https://bportal.azurewebsites.net).

Log in using your O365 credentials and follow the steps to register your application.  The portal quickly allows you to register either:

   - An existing application you have already registered in Azure Active Directory following [these steps](https://skypedevtap.visualstudio.com/_git/Trusted%20App%20API%20Documentation?path=%2FTrusted_Application_API%2FRegistrationInAzureActiveDirectory.md)

   - A brand new application that does not exist in Azure Active Directory.  The registration portal will conveniently register your app in Azure as well as Skype for Business, so that you do not need to access the Azure portal directly.

Registration values:

   - **Name of your application:**  This is the friendly name of your app.
   
   - **Home page for your application:** This is the hosting location of your application.  This URL must be from a verified domain within your organization's directory (the organization of the user you are logged into the registration).  Example: https://mytrustedapp.contoso.com/
   
   - **Callback URI:**  This is the URI where your application will receive events.  Example: https://mytrustedapp.contoso.com/callback
   
   - **Client Secret:** This is provided by the registration portal for authentication.
   
   
## Register Tenant-specific Trusted Application Endpoint   
   
In order for a customer tenant to use your application (or for your own devlopment and testing), a Skype for Business tenant admin must:

   1. Provide tenant admin consent for your app, using the Azure Active Directory consent screen.  A tenant administrator must explicitly grant consent to allow your application to access tenant data. The consent process is a browser-based experience that requires the tenant admin to sign into the Azure AD consent UI and review the access permissions that your application is requesting, and then grant or deny the request.
   
   1. Register a tenant-specific Trusted Application Endpoint for your app using Skype for Business Admin Powershell. The [full instructions](./TrustedApplicationEndpoint.md) give you more information about this step.

## Register Tenant-specific Trusted Application endpoints with Skype for Business Online.
A tenant administrator must explicitly grant consent to allow your application to access tenant data using the Trusted Application APIs. The consent process is a browser-based experience that requires the tenant admin to sign into the Azure AD consent UI and review the access permissions that your application is requesting, and then grant or deny the request. You need the following information to complete the endpoint registration.


- **Application Id, AppID uri** from step 2 in the previous section.

- A **name** of your application within Skype for Business Online

- The **Tenant ID** of the tenant where you are registering a trusted application endpoint.

- **Sip Uri** that identifies the tenant specific endpoint for the application. Requests sent to this endpoint will trigger the Trusted Application API sending an event to the application, indicating that someone has sent a request.

- **Callback uri** for Trusted Application API, to POST events to the applications

### Additional information
Read about [Skype for Business Online Scope Permissions](https://msdn.microsoft.com/en-us/skype/ucwa/skypeforbusinessonlinescopepermissions) to learn more about permissions.  

See Tenant Admin Consent or the following for additional information:

[Building Service Apps in Office 365](https://msdn.microsoft.com/en-us/office/office365/howto/building-service-apps-in-office-365)
