# Skype Web SDK Version Update

| Product        | New Version           | Last Updates  |Previous Version
| ------------- |:-------------:| -----:|----------:|
| Conversation Control DF     | 1.52.79 | 7/27/16 |1.51.69
| Web SDK DF    | 0.4.245      |  7/27/16|0.4.239
| Conversation Control Prod | 1.51.69     |   7/27/16|1.50.51
| Web SDK Prod| 0.4.239 |  7/27/16 |  0.4.232 |

**Bugs fixed in the new dogfood build:**
 
- **Bug 439898**: [jLync] Multi tab - incoming call toast doesn't cancel if accepted in another tab
- **Bug 614711**: [jLync] Multi tab - Receive an incoming call on tab1. Tab 2 then shows a missed call item
- **Bug 619231**: [jLync][ORTC] Track and clean up zombie AudioVideoSession
- **Bug 614938**: All telemetry properties empty when Collect OII disabled
- **Bug 494271**: [ORTC] Conference video not working (Implement isVideoOn and isStarted)
 
The latest release includes fixes for incorrect behavior relating to audio calls when multiple tabs are active, improves application reliability after making and ending multiple A/V calls, and enables basic group video functionality for video calls in Edge.
