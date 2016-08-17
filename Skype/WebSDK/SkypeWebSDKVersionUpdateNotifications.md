# Skype Web SDK Version Updates

## Skype Web SDK Version Update 8/16/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| -----:|----------:|
| Conversation Control Preview     | 1.55.101 | 8/16/16 |1.54.107
| Skype Web SDK Preview    | 0.4.262      |  8/16/16|0.4.256
| Conversation Control Production | 1.54.107     |   8/16/16|1.53.59
| Skype Web SDK Production| 0.4.256 |  8/16/16 |  0.4.250 |

**Bugs fixed in the new public preview build:**

- Remove duplicate call ended activity items in group calls escalated from p2p
- Fix certain behavioral bugs of p2p video calls in Edge

The latest release includes fixes for activity items and improvements to video calls in Edge.

---

## Skype Web SDK Version Update 8/9/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| -----:|----------:|
| Conversation Control Preview     | 1.54.107 | 8/9/16 |1.53.59
| Skype Web SDK Preview    | 0.4.256      |  8/9/16|0.4.250
| Conversation Control Production | 1.53.59     |   8/9/16|1.52.79
| Skype Web SDK Production| 0.4.250 |  8/9/16 |  0.4.245 |

**Bugs fixed in the new public preview build:**

-  Duplicate CallStarted and CallEnded activity items if caller cancels and then connects
-  IMs sent in quick succession often posted of order
-  Implement multiple media streams in order to be able to view more than one remote participant's video at once
-  Self video state after escalation unreliable

This release includes improvements to video calls in Edge including support for multiple remote media streams in a group video call. In addition, it includes a fix to prevent IMs sent rapidly from being sent out of order, a fix for duplicate activity items in certain audio call scenarios, and improvements to our telemetry for AV calls.

---
## Skype Web SDK Version Update 8/2/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| -----:|----------:|
| Conversation Control Preview     | 1.53.59 | 8/2/16 |1.52.79
| Skype Web SDK Preview    | 0.4.250      |  8/2/16|0.4.245
| Conversation Control Production | 1.52.79     |   8/2/16|1.51.69
| Skype Web SDK Production| 0.4.245 |  8/2/16 |  0.4.239 |

**Bugs fixed in the new public preview build:**

-  Remote video is shown only if self video is on in a meeting
-  Edge user has to click twice to establish a P2P call after user ignored the call the first time
-  Adding more data to telemetry to debug call failures

The latest release includes changes to ensure that chat and video modalities are present in ‘receive’ mode in conversations even if the user has not started them explicitly and to improve our telemetry in the case of failed calls. In addition, it includes improvements to app reliability in the case of refreshing a single tab app.

---
## Skype Web SDK Version Update 7/27/16

| Product        | New Version           | Last Updated  |Previous Version
| ------------- |:-------------:| -----:|----------:|
| Conversation Control Preview     | 1.52.79 | 7/27/16 |1.51.69
| Skype Web SDK Preview    | 0.4.245      |  7/27/16|0.4.239
| Conversation Control Production | 1.51.69     |   7/27/16|1.50.51
| Skype Web SDK Production| 0.4.239 |  7/27/16 |  0.4.232 |

**Bugs fixed in the new public preview build:**
 
-  Incoming call toast doesn't cancel if accepted in another tab.
-  Receive an incoming call on tab 1. Tab 2 then shows a missed call item.
-  Conference video not working in Edge
 
The latest release includes fixes for incorrect behavior relating to audio calls when multiple tabs are active, improves application reliability 
after making and ending multiple A/V calls, and enables basic group video functionality for video calls in Edge.

---