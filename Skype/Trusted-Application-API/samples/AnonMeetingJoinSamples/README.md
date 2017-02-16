# About these samples
The Trusted Application API is a Rest API that enables developers to build Skype for Business Online back-end communications services for the cloud.  The Trusted Application API Samples contain samples for the bankend Trusted Application and samples for how to interact with the trusted application from a client-side browser using the Skype Web SDK. 

The Trusted Application sample deploys to an Azure Cloud Service and:
- Permits anonymous sign-in
- Creation of an adhoc meeting URL

The sample Web SDK application interacts with the Trusted Application sample and contains two demos:
- Getting an anon application token from the Trusted Application
- Getting an adhoc meeting URL from the Trusted Application
- Using the anon application token to join Anonymously into a Skype for Business Online meeting
- Enabling audio/video in an anonymously-joined Skype for Business Online meeting

# Getting started
## Prerequisites
1.	Download [Azure SDK v2.9](http://go.microsoft.com/fwlink/?LinkId=746481) or above.
2.	Create a Cloud Service from Azure and give it a name to reserve a *.cloudapp.net URL. Refer to [this link](https://azure.microsoft.com/en-us/documentation/services/cloud-services/) for details.
3.  Use the [quick registration tool](https://aka.ms/skypeappregistration) for registering Skype for Business Trusted Applications in Azure and Skype for Business Online, that eliminates the need to register an Application manually in Azure portal.
Optionally, you can manually register your application in Azure Portal, where you will get a Client ID and set an App ID URI. Refer to [Registration in Azure Active Directory](./RegistrationInAzureActiveDirectory.md) for details.
4.	Register Trusted Endpoints in a Skype for Business Online tenant using PowerShell.   Refer to [Setting up a Trusted Application Endpoint](./TrustedApplicationEndpoint.md) for details.
5.  Provide consent: When the application is registered in AAD, it is registered in the context of a tenant.  For a tenant to use the Service Application, for example, when the application is developed as a multi-tenant application, it must be consented to by that tenant's admin. Refer to [Tenant Admin Consent](./TenantAdminConsent.md) for more details.
6.  Deploy the the client (anonymous webpage) code contained in the `WebsiteSamples` folder to a web server (e.g. IIS on localhost, or Azure App Service to deploy to *.azurewebsites.net)

## Deployment
Once you have satisfied the prerequisites, it is time to configure the Trusted Application source code and deploy it to the Azure Cloud Service created in step 3.

If you plan on pointing a custom domain or subdomain to your `*.cloudapp.net` server, use that FQDN as your base URL. Otherwise, use `resourcename.cloudapp.net` as your base URL, as created in step 3.

### Trusted Application Agent
1. Clone code from the samples repo.
2. Build the solution (NuGet packages will be restored)
3. Edit the `ServiceConfiguration.Prod.cscfg` file, substituting `[parameters]` as follows:
    ```
 <ConfigurationSettings>
   <!-- Replace these with values relevant to your deployment -->
   <Setting name="AAD_ClientId" value="[Application Client ID from Step 2]"/>
   <Setting name="AAD_ClientSecret" value="[Application Client secret from Step 2]" /> 
   <Setting name="ApplicationEndpointId" value="sip:trustedEndpoint@tenantname.onmicrosoft.com" />  //Get from Prerequisite step 3 above      
   <Setting name="LogFullHttpRequestResponse" value="true" />  
 </ConfigurationSettings>

    ```
4.	Update the `EnableCorsAttribute.cs` file from `FrontEnd` project to allow CORS requests on your Base URL:
    ```
        // Add allowed origins.
        _policy.Origins.Add("http://localhost");
        _policy.Origins.Add("https://your.baseurl"); // add this line
    ```
5. Publish the application (right-click `PlatformServicSamplesAzureService` and select *Publish...*) using the *Production* slot

When visiting your base URL (e.g. https://name.cloudapp.net), the expected response is a simple 403.

### Client webpage
You will need to modify the `WebsiteSamples\scripts\index.js` file and replace `https://[name].cloudapp.net` with your trusted agent's base URL.
You will need to modify the `WebsiteSamples\Samples\scripts\sign-in.js' file and replace InviteTargetUri 'toshm@metio.onmicrsoft.com' with your valid user in your own tenant.
# Questions & troubleshooting

**Q: I published to my Cloud Service, but get a generic application error page**
If you see this error message:

*An application error occurred on the server. The current custom error settings for this application prevent the details of the application error from being viewed remotely (for security reasons). It could, however, be viewed by browsers running on the local server machine.*

You need to adjust web.config on the Cloud Service to set `customError="off"` per the error message.

1. Enable Remote Desktop on the `FrontEnd` role instance - see [here](https://docs.microsoft.com/en-us/azure/cloud-services/cloud-services-role-enable-remote-desktop#remote-into-role-instances) for details
2. Remote it and start the IIS Manager
3. Find the Under *Sites*, right-click the configured website (there should only be one) and select *Explore...*.
4. Edit `web.config` and allow custom errors on remote hosts, as per the error page's instructions.
5. Make the original web request again, and the correct error code & description should be returned.

**Q: I published my Cloud Service, but get a 500 error**

You may want to remote into the machine (see question above) and [enable IIS failed request tracing](https://www.iis.net/learn/troubleshoot/using-failed-request-tracing/troubleshooting-failed-requests-using-tracing-in-iis) to view the traceback details.

**Q: I published to my Cloud Service but get a 401 error on the client samples**

Verify the error description - if you see reference to Azure Storage or Azure Service Bus, you likely have provided an incorrect connection string in your service definition file. Proper connection strings can be obtained from the [Azure Portal](https://portal.azure.com). Ensure that there are no leading or trailing spaces in the provided connection string.

**Q: Exception from Azure log like 'A job with ID ffbc8e5b8e644b2d83047155de10036e is already listening, please stop it before starting a new one **

Delete current listening job by: DELETE https://[name].cloudapp.net/ListeningJob
