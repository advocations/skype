# Skype Web SDK Version Update

| Product        | New Version           | Last Updates  |Previous Version
| ------------- |:-------------:| -----:|----------:|
| Conversation Control DF     | 1.52.79 | 7/27/16 |1.51.69
| Web SDK DF    | 0.4.245      |  7/27/16|0.4.239
| Conversation Control Prod | 1.51.69     |   7/27/16|1.50.51
| Web SDK Prod| 0.4.239 |  7/27/16 |  0.4.232 |

**Bugs fixed in the new dogfood build:**
 
- **Bug 439898**: [Web SDK] Multi tab - incoming call toast doesn't cancel if accepted in another tab.
- **Bug 614711**: [Web SDK] Multi tab - Receive an incoming call on tab 1. Tab 2 then shows a missed call item.
- **Bug 619231**: [Web SDK][ORTC] Track and clean up non-responsive ("zombie") AudioVideoSession.
- **Bug 614938**: All telemetry properties empty when the "collect organizational identifiable information" (OII) feature is disabled
- **Bug 494271**: [ORTC] Conference video not working (Implement isVideoOn and isStarted)
 
The latest release includes fixes for incorrect behavior relating to audio calls when multiple tabs are active, improves application reliability 
after making and ending multiple A/V calls, and enables basic group video functionality for video calls in Edge.
