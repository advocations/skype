
# Skype for Business Online scope permissions
Provides a reference of permission scopes that a user can grant in UCWA 2.0.



## Use scopes to specify access to Skype for Business data

Permission scopes limit access to Skype for Business data to a specific level. A scope is a combination of a resource or capability and an operation in the format _resource.operation_. For example, `User.ReadWrite` specifies the resource [user](user_ref.md) and the operations Read and Write. There are no default scopes.

You can specify scopes for your application in the Azure Management Portal, or declare them in your application manifest. Scope information is stored in the application manifest. The format of the manifest is JSON. To modify the application manifest directly:


- Log on to the Azure Management Portal.
 
- View the application definition.
 
- Download the application manifest.
 
- Open the manifest and modify it according to the needs of the application.
 
To learn more about configuring applications, see [Integrating Applications with Azure Active Directory](https://azure.microsoft.com/en-us/documentation/articles/active-directory-integrating-applications/).


## Skype for Business scope permissions

The Skype for Business scope permissions are shown in the following table:



|**Scope**|**Permission**|**Description**|**Requires admin consent**|
|:-----|:-----|:-----|:-----|
|Contacts.ReadWrite|Read and manage user contacts and groups|Allows the application to read and update user contacts and groups|Yes|
|Conversations.Initiate|Initiate conversations and join meetings|Allows the application to initiate instant messages, audio, video, and desktop sharing conversations; and join meetings on-behalf of the signed-in user|Yes|
|Meetings.ReadWrite|Create online meetings|Allows the application to create Online meetings on-behalf of the signed-in user|Yes|


### Tenant Administrator Consent Flow

The Skype for Business Online permissions are tenant administrator consent only. For an app to be used by all users of an O365 tenant, a tenant administrator must provide consent. To provide consent for all users in the tenant, construct the following URL for your app as shown in the example below. 

>**Note**:  Update the  **client Id** and **redirect Uri** for your app.

```js
https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token
	&client_id= ...
	&redirect_uri=https://app.contoso.com/
	&response_mode=form_post
	&nonce=...
	&resource=https://webdir.online.lync.com
	&prompt=admin_consent
```

Access the URL and authenticate using a tenant administrator credentials and accept the application permissions. Users will now be able to access the application.