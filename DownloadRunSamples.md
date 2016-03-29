
# Downloading and running the Skype Web SDK samples


 **Last modified:** March 14, 2016

 _**Applies to:** Skype for Business 2015_

 **In this article**<br/>
[Downloading and setting up the samples](#sectionSection0)<br/>
[Samples in the download package](#sectionSection1)<br/>
[Additional Resources](#bk_addresources)


The Microsoft Skype Web SDK includes a set of web application samples that allow you to run and observe the features of the SDK, such as sign-in, sending instant messages, searching for contacts and distribution groups, using audio/video, and so on.

## Downloading and setting up the samples
<a name="sectionSection0"> </a>

You can either run the Microsoft Skype Web SDK samples against your private Skype for Business Server 2015 installation, or you can use the developer sandbox provided on the Metio.net server. The following instructions apply to setting up and using the samples against the Metio.net sandbox:


1. Download the samples files. The Microsoft Skype Web SDK samples are available on github in our GitHub [Skype Web SDK SAmples](https://github.com/OfficeDev/skype-web-sdk-samples) directory.
    
2. Copy the samples files to a local folder on your computer such as C:\Websites\SkypeWebSDKSamples.
    
3. Make sure that IIS is installed. To install IIS, go to  **Control Panel**, click  **Turn Windows features on and off**, then select  **IIS**.
    
4. From  **Start**, run  **IIS Manager**. Right-click on  **Sites**, choose  **Add Website**, and add a new website called SkypeWebSDKSamples. Set the location to the folder to which you copied the samples files. Stop  **Default Web Site**, then start  **SkypeWebSDKSamples**.
    
5. Open your browser and go to http://localhost. You should see the "Skype Web SDK Samples Preview" website. (You might need to refresh your browser.)
    
6. Click  **Sign In**, select  **Developer Sandbox**, and use these credentials:
    
    Domain: metio.net
    
    Token: (Enter an OAuth token from [UCWA: Interactive Demo](https://ucwa.skype.com/login/explore). Copy the entire token including the word 'Bearer'.)
    

## Samples in the download package
<a name="sectionSection1"> </a>

The Microsoft Skype Web SDK samples are available on github at [Skype Web SDK Samples](https://github.com/OfficeDev/skype-web-sdk-samples).


 **Note**  To enable audio/video functionality, clients must install the Skype for Business Web App Plug-in. It is available for Windows and Mac computers from the following download locations:<br/>[Windows Download](https://mlccdn.blob.core.windows.net/prod/LWA/plugins/windows/archive/SkypeForBusinessPlugin-16.0.0.101.msi)<br/>[Mac Download](https://mlccdn.blob.core.windows.net/prod/LWA/plugins/mac/archive/SkypeForBusinessPlugin-16.0.0.63.pkg )


|||
|:-----|:-----|
|**Sample**|**Description**|
|Sign in|Demonstrates how to retrieve the API entry point and sign in.|
|Self|Demonstrates how to get information about the currently signed in user. Allows the user to change note, location, and presence state.|
|Search|Demonstrates how to search for contacts and distribution groups and display the search results.|
|Contact|Demonstrates how to find a contact by name, email, phone number or other attribute and display it on the screen. |
|Groups|This sample demonstrates how to retrieve the contact list, as well as the list of groups and relationships.|
|Person Group Manager|Demonstrates group and person management functionalities, such as: * Creating a new user-defined group in the group list* Deleting a user-defined group from the group list* Renaming a user defined group * Adding a Distribution Group to the group list* Removing a Distribution Group from the group list* Adding a person to the person list* Removing a person from the person list|
|Chat Service|Demonstrates how to send Instant Messages.|
|Audio/Video|Demonstrates how to use audio/video along with messaging in an existing conversation|
|Device Manager|Demonstrates how to perform device management for audio and video devices.|
|Conference|Demonstrates multiparty messaging and audio/video.|
|Conversation Control|Demonstrates the use of the Skype Conversation Control UI.|
|Join Meeting|Demonstrates how to join a conference anonymously with a conference URI.|
|Sign out|Demonstrates signing out the current user.|

## Additional Resources
<a name="bk_addresources"> </a>


- [Skype Web SDK Preview]( /SkypeWebSDKPreview.md)
    
- [UCWA: Code](https://ucwa.skype.com/code)
    
- [UCWA: Interactive Demo](https://ucwa.skype.com/login/explore)
    
