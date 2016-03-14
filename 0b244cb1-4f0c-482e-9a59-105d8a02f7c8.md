
# Manage devices

 **Last modified:** March 14, 2016

 _**Applies to:** Skype for Business | Skype for Business 2015_

 **In this article**
[Subscribing to Device Changes](#sectionSection0)
[Enumerating Available Devices](#sectionSection1)
[Selected Devices](#sectionSection2)



## Subscribing to Device Changes
<a name="sectionSection0"> </a>

Before accessing the device lists in devicesManager, the client must call that respective list's subscribe() function. After this function is called changes to the collection are exposed to the client, and the client may enumerate the devices in that list.


```js

client.devicesManager.cameras.subscribe();
client.devicesManager.cameras.added(function (camera) { … });
client.devicesManager.cameras.removed(function (camera) { … });

client.devicesManager.microphones.subscribe();
client.devicesManager.microphones.added(function (microphone) { … });
client.devicesManager.microphones.removed(function (microphone) { … });

client.devicesManager.subscribe();
client.devicesManager.speakers.added(function (speaker) { … });
client.devicesManager.speakers.removed(function (speaker) { … });

```


## Enumerating Available Devices
<a name="sectionSection1"> </a>

The devicesManager object has three collections for available devices: cameras, microphones, and speakers. Each collection can be iterated over to get a reference to each device:


```js

client.devicesManager.cameras.subscribe();

console.log("Available cameras:");
for(var i = 0, i < client.devicesManager.cameras.length; i++) {
	var camera = client.devicesManager.cameras[i];
	console.log(camera.name());
}

client.devicesManager.microphones.subscribe();

console.log("Available microphones");
for(var i = 0; i < client.devicesManager.microphones.length; i++) {
	var microphone = client.devicesManager.microphones[i];
	console.log(microphone.name());
}

client.devicesManager.speakers.subscribe();

console.log("Available speakers:");
for(var i = 0; i < client.devicesManager.speakers.length; i++) {
	var speakers = client.devicesManager.speakers[i];
	console.log(speaker.name());
}

```


## Selected Devices
<a name="sectionSection2"> </a>

The devicesManager object has a reference to each currently selected device: selectedCamera, selectedMicrophone, and selectedSpeaker. Each reference can be changed with their respective set() function. (Note: this function will appear enabled but will have no effect if the device is already in use.) The client can subscribe to changes to the selected devices by calling their respective changed() functions.


```js

client.devicesManager.selectedCamera.changed(function (newCamera) {
	console.log("The selected camera is now " + newCamera.name());
});
client.devicesManager.selectedCamera.set(otherCamera);

client.devicesManager.selectedMicrophone.changed(function (newMicrophone) {
	console.log("The selected microphone is now " + newMicrophone.name());
});
client.devicesManager.selectedMicrophone.set(otherMicrophone);

client.devicesManager.selectedSpeaker.changed(function (newSpeaker) {
	console.log("The selected speaker is now " + newSpeaker.name());
});
client.devicesManager.selectedSpeaker.set(otherSpeaker);

```

