## Configure your project for the Skype for Business App SDK

You can start coding with the App SDK after you complete the following configuration tasks for your platform.

#### iOS

The configuration steps include:


1. **Add embedded binary**: In XCode, in the Interface Builder  Source Pane, select the project node and open the project properties pane. Add an embedded binary from the folder that 
you downloaded the SDK libraries into. 

  > Note: The SDK comes with a binary for use on physical devices and a binary for running the iOS emulator. The binaries have the 
same name but are in separate folders. To run your app on a **device**, navigate to the location where you downloaded the App SDK and 
choose the _AppSDKiOS_ folder and the _SkypeForBusiness.framework_ file. To run your app in a **simulator**, choose the _AppSDKiOSSimulator_ folder 
and then select the **SkypeForBusiness.framework** file in that folder.

2. **Import the SDK header file**: Add the following import statement to your header file.

      ```objective-c
        #import <SkypeForBusiness/SkypeForBusiness.h>
      ```
3. The SDK comes with a convenient helper class for handling a simple anonymous meeting join with AV scenario. To use this, add SfBConversationHelper.h and SfBConversationHelper.m files from the SDK download folder under helpers to your project. 

4. If using the conversation helper, use the following import statement. _SfBConversationHelper.h_ imports the _SkypeForBusiness.h_ file.
      ```objective-c
      #import "SfBConversationHelper.h"
```
