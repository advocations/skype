# Skype Web SDK Version Updates

## Skype Web SDK Version Update 11/1/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | Unchanged | 10/25/16 |1.65.51
| Skype Web SDK Preview    | Unchanged |  10/25/16| 0.4.327
| Conversation Control Production | Unchanged  | 10/25/16 | 1.64.47
| Skype Web SDK Production| Unchanged |  10/25/16 | 0.4.325 |

New builds will not be rolled out to preview or production this week because of the release of Microsoft Teams.

**Bugs fixed in the new public preview build:**

None

---
## Skype Web SDK Version Update 10/25/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.65.51 | 10/25/16 |1.63.51
| Skype Web SDK Preview    | 0.4.327 |  10/25/16| 0.4.312
| Conversation Control Production | 1.64.47  | 10/25/16 | 1.63.51
| Skype Web SDK Production| 0.4.325 |  10/25/16 | 0.4.312 |

The latest preview release includes improvements to reliability on certain application failures,
improvements to AV call reliability in Microsoft Edge, and a fix to correctly handle device changes in plugin-based AV calls.

**Bugs fixed in the new public preview build:**

- Send conversation subject along with audioService invitation
- Retry on 483 “TooManyHops”
- Retry on 409 “PGetReplaced” in certain cases
- Cache UCWA FQDN to accelerate auto discovery
- Ensure `application.devicesManager.mediaCapabilities.pluginDownloadLinks` returns a valid array of links
- Add a console debugging command to quickly save all console output to a file
- Correctly handle microphone and speaker changes during plugin-based AV calls

---
## Skype Web SDK Version Update 10/19/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | Unchanged | 10/12/16 |1.63.51
| Skype Web SDK Preview    | Unchanged  |  10/12/16| 0.4.312
| Conversation Control Production | 1.63.51  |   10/19/16| 1.62.45
| Skype Web SDK Production| 0.4.312 |  10/19/16 |  0.4.306  |

There is no new preview version this week. There will be a new version next week that includes the changes that would have been released this week.

**Bugs fixed in the new public preview build:**

No new preview release

---
## Skype Web SDK Version Update 10/12/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.63.51 | 10/12/16 |1.62.45
| Skype Web SDK Preview    | 0.4.312  |  10/12/16| 0.4.306
| Conversation Control Production | 1.62.45  |   10/12/16| 1.61.68
| Skype Web SDK Production| 0.4.306 |  10/12/16 |  0.4.300  |

The latest preview release includes several small reliability improvements and fixes for unusual scenarios, but no major functional changes.

**Bugs fixed in the new public preview build:**

- Remove dependency on "MediaRelayAccessToken" to avoid issues where it cannot be found

---
## Skype Web SDK Version Update 10/4/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.62.45 | 10/4/16 |1.61.68 
| Skype Web SDK Preview    | 0.4.306  |  10/4/16| 0.4.300
| Conversation Control Production | 1.61.68   |   10/4/16|1.60.72
| Skype Web SDK Production| 0.4.300 |  10/4/16 |  0.4.293  |

The latest preview release includes a fix to accepting video calls with audio only in 
Microsoft Edge, a fix for receiving ‘Meet Now’ invites on applications that don’t support AV, 
and a fix for joining conferences anonymously in an ‘on prem’ topology.

**Bugs fixed in the new public preview build:**

-	Accepting incoming video call with only audio briefly broadcasts video
-	'Meet Now' invitations come as group call instead of group IM in platforms
    which don't support audio
-	Use /autodiscover/xframe/xframe.html in the 'on prem' join URL discovery

---
## Skype Web SDK Version Update 9/27/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.61.68 | 9/27/16 |1.60.72 
| Skype Web SDK Preview    | 0.4.300  |  9/27/16| 0.4.293
| Conversation Control Production | 1.60.72   |   9/27/16|1.59.79 
| Skype Web SDK Production| 0.4.293 |  9/27/16 |  0.4.288  |

The latest preview release includes an improvement to AV calls in Microsoft Edge, a fix for an edge case where suspended
multi-tab apps may not resume correctly, preview support for call transfer, and support for call hold and resume in Microsoft Edge.

**Bugs fixed in the new public preview build:**

- Implement basic call transfer
- Implement self hold/resume in P2P calls in Microsoft Edge
- Set person.type to phone if its sip uri ends with ;user=phone
- Fix bug in which SDK only relays the first SDP offer to media stack when accepting 
    an incoming AV call in Microsoft Edge

---
## Skype Web SDK Version Update 9/20/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.60.72 | 9/20/16 |1.59.79
| Skype Web SDK Preview    | 0.4.293  |  9/20/16| 0.4.288
| Conversation Control Production | 1.59.79   |   9/20/16|1.58.81 
| Skype Web SDK Production| 0.4.288 |  9/20/16 |  0.4.288  |

The latest release includes preview support for phone audio calling (PSTN) and improvements to AV calls in Microsoft Edge.

**Bugs fixed in the new public preview build:**

- Implement phone audio conversation modality
- Fix issue where SWX in Microsoft Edge doesn't process multiple media offers 

---
## Skype Web SDK Version Update 9/13/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.59.79 | 9/13/16 |1.58.81
| Skype Web SDK Preview    | 0.4.288  |  9/13/16| 0.4.281
| Conversation Control Production | 1.58.81   |   9/13/16|1.57.72 
| Skype Web SDK Production| 0.4.288 |  9/13/16 |  0.4.269  |

The latest release includes a critical fix to telemetry for the standalone SDK and improvements to AV calls in Microsoft Edge.

**Bugs fixed in the new public preview build:**

- Stop waiting for renegotiation in Microsoft Edge to declare call connected
- Remote user turning on video turns on self video if both users in Microsoft Edge
- Standalone telemetry manager sending events incorrectly

---
## Skype Web SDK Version Update 9/6/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.58.81 | 9/6/16 |1.57.70
| Skype Web SDK Preview    | 0.4.281      |  9/6/16| 0.4.275
| Conversation Control Production | 1.57.72    |   9/6/16|1.56.78
| Skype Web SDK Production| 0.4.275 |  9/6/16 |  0.4.269  |

The latest release includes improvements to group video calling in Chrome, the implementation of DevicesManager properties isMicrophoneEnabled and isCameraEnabled, and improvements to application telemetry, calling and overall reliability.

**Bugs fixed in the new public preview build:**

- Fix SfB native client and Microsoft Edge web client do not see remote video from Chrome client
- Implement isMicrophoneEnabled and isCameraEnabled for pluginless calling scenarios
- Delete minimum telemetry data necessary collectOII disabled
- Fix TypeError when stop is called while receiving an incoming call

---
## Skype Web SDK Version Update 8/30/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.57.70 | 8/30/16 |1.56.78
| Skype Web SDK Preview    | 0.4.275      |  8/30/16| 0.4.269
| Conversation Control Production | 1.56.78    |   8/30/16|1.55.101
| Skype Web SDK Production| 0.4.269 |  8/30/16 |  0.4.262  |

The latest release includes improvements to application telemetry and a fix for an audio bug that can arise when a p2p conversation is escalated to a group conversation.

**Bugs fixed in the new public preview build:**

- Add telemetry parameter to indicate whether sign in is online or onprem
- After escalating a call to group call mute/unmute feature/button no longer stops working for escalatee

---
## Skype Web SDK Version Update 8/23/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.56.78 | 8/23/16 |1.55.101
| Skype Web SDK Preview    | 0.4.269      |  8/23/16| 0.4.262
| Conversation Control Production | 1.55.101    |   8/23/16|1.54.107
| Skype Web SDK Production| 0.4.262 |  8/23/16 |  0.4.256 |

The latest release includes improvements to video calls in Edge, allows AV calls in Safari to proceed after the plugin is installed without refreshing, and allows video calls to continue when the video container is nulled and restored.

**Bugs fixed in the new public preview build:**

- A/V plugin installation flow now completes successfully on Safari
- During Edge audio calls, self video is no longer turned on automatically when remote turns on video
- Video no longer dropped after nulling and restoring the video container during a video call

---
## Skype Web SDK Version Update 8/16/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.55.101 | 8/16/16 |1.54.107
| Skype Web SDK Preview    | 0.4.262      |  8/16/16|0.4.256
| Conversation Control Production | 1.54.107     |   8/16/16|1.53.59
| Skype Web SDK Production| 0.4.256 |  8/16/16 |  0.4.250 |

The latest release includes fixes for activity items and improvements to video calls in Edge.

**Bugs fixed in the new public preview build:**

- Remove duplicate call ended activity items in group calls escalated from p2p
- Fix certain behavioral bugs of p2p video calls in Edge

---
## Skype Web SDK Version Update 8/9/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.54.107 | 8/9/16 |1.53.59
| Skype Web SDK Preview    | 0.4.256      |  8/9/16|0.4.250
| Conversation Control Production | 1.53.59     |   8/9/16|1.52.79
| Skype Web SDK Production| 0.4.250 |  8/9/16 |  0.4.245 |

This release includes improvements to video calls in Edge including support for multiple remote media streams in a group video call. In addition, it includes a fix to prevent IMs sent rapidly from being sent out of order, a fix for duplicate activity items in certain audio call scenarios, and improvements to our telemetry for AV calls.

**Bugs fixed in the new public preview build:**

-  Duplicate CallStarted and CallEnded activity items if caller cancels and then connects
-  IMs sent in quick succession often posted of order
-  Implement multiple media streams in order to be able to view more than one remote participant's video at once
-  Self video state after escalation unreliable

---
## Skype Web SDK Version Update 8/2/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.53.59 | 8/2/16 |1.52.79
| Skype Web SDK Preview    | 0.4.250      |  8/2/16|0.4.245
| Conversation Control Production | 1.52.79     |   8/2/16|1.51.69
| Skype Web SDK Production| 0.4.245 |  8/2/16 |  0.4.239 |

The latest release includes changes to ensure that chat and video modalities are present in ‘receive’ mode in conversations even if the user has not started them explicitly and to improve our telemetry in the case of failed calls. In addition, it includes improvements to app reliability in the case of refreshing a single tab app.

**Bugs fixed in the new public preview build:**

-  Remote video is shown only if self video is on in a meeting
-  Edge user has to click twice to establish a P2P call after user ignored the call the first time
-  Adding more data to telemetry to debug call failures

---
## Skype Web SDK Version Update 7/27/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| :-----:|:----------:|
| Conversation Control Preview     | 1.52.79 | 7/27/16 |1.51.69
| Skype Web SDK Preview    | 0.4.245      |  7/27/16|0.4.239
| Conversation Control Production | 1.51.69     |   7/27/16|1.50.51
| Skype Web SDK Production| 0.4.239 |  7/27/16 |  0.4.232 |

The latest release includes fixes for incorrect behavior relating to audio calls when multiple tabs are active, improves application reliability 
after making and ending multiple A/V calls, and enables basic group video functionality for video calls in Edge.

**Bugs fixed in the new public preview build:**
 
-  Incoming call toast doesn't cancel if accepted in another tab.
-  Receive an incoming call on tab 1. Tab 2 then shows a missed call item.
-  Conference video not working in Edge
 
---