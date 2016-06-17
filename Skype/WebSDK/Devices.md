
# Devices


 _**Applies to:** Skype for Business 2015_

 **In this article**  
[Cameras](#cameras)  
[Microphones](#microphones)  
[Speakers](#speakers)


The [DevicesManager](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html) object has members representing audio and video devices for use with Skype Web SDK. This object is a member of the [Application](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.application.html) object. It has properties for the currently selected devices: **selectedCamera**, **selectedMicrophone**, and **selectedSpeaker**. There are also three lists, each representing the available devices: cameras, microphones, and speakers. The objects in these lists each have properties describing the device they represent, including name, id, type.

## Cameras
<a name="sectionSection0"> </a>

The currently selected camera can be referenced by [DevicesManager.selectedCamera](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html#selectedcamera). The application can change this device by passing an instance from the cameras collection to  **DevicesManager.selectedCamera.set()**. 

>**Note**: **set()** will have no effect if the new device is already in use by another application. If the application is to be notified when this device changes, it must set a callback using the **DevicesManager.selectedCamera.changed()** function.

A collection of all available cameras is in [DevicesManager.cameras](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html#cameras). Before using this collection, the application must first subscribe to changes in the list by calling  **DevicesManager.cameras.subscribe()**. Callbacks for when cameras are added or removed from the collection are set by calling **DevicesManage.cameras.added()** and **DevicesManager.cameras.removed()**.


## Microphones
<a name="sectionSection1"> </a>

The currently selected microphone can be referenced by [DevicesManager.selectedMicrophone](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html#selectedmicrophone). The application can change this device by passing an instance from the microphones collection to  **DevicesManager.selectedMicrophone.set()**. 

>**Note*: **set()** will have no effect if the new device is already in use by another application. If the application is to be notified of when this device changes, it must set a callback using the **DevicesManager.selectedMicrophone.changed()** function.

A collection of all available microphones is in [DevicesManager.microphones](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html#microphones). Before using this collection, the application must first subscribe to changes in the list by calling  **DevicesManager.microphones.subscribe()**. Callbacks for when microphones are added or removed from the collection are set by calling **DevicesManage.microphones.added()** and **DevicesManager.speakers.removed()**.


## Speakers
<a name="sectionSection2"> </a>

The currently selected speaker can be referenced by [DevicesManager.selectedSpeaker](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html#selectedspeaker). The application can change this device by passing an instance from the speakers collection to  **DevicesManager.selectedSpeaker.set()**. 

>**Note**: **set()** will have no effect if the new device is already in use by another application. If the application is to be notified when this device changes, it must set a callback using the **DevicesManager.selectedSpeaker.changed()** function.

A collection of all available speakers is in [DevicesManager.speakers](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.devicesmanager.html#speakers). Before using this collection, the application must first subscribe to changes in the list by calling  **DevicesManager.speakers.subscribe()**. Callbacks for when speakers are added or removed from the collection are set by calling **DevicesManage.speakers.added()** and **DevicesManager.speakers.removed()**.


## Additional resources

- [Manage devices](ManageDevices.md)
