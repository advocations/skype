# Customer Chat care call flow

 
The call flow is as follows -
 
1. The Service Application (SA) discovers the location of the Trusted Application API (API)
2. The SA gets the capabilities,
3. SA uses anonApplicationTokens resource to get a token and a ms:rtc:saas:discover link that can be shared with the anonymous chat client
4. The chat client uses the ms:rtc:saas:discover link to get the anonApplications resource, which can be used to establish a ucwa session with the Trusted Application API
5. The chat client establishes a ucwa session with the API and uses the token got from step 3, to authenticate itself.
6. The chat client sends a messaging invitation to the helpdesk uri: sip:helpdesk@contoso.com
7. The API sends a callback to the SA on receiving this messaging invitation, along with a link called  ms:rtc:saas:startAdhocMeeting, another called ms:rtc:saas:acceptAndBridge and another called ms:rtc:saas:inviteUserToMeeting
 
8. SA sees that it received a support request and spins up an on demand meeting, using the link in the resource ms:rtc:saas:startAdhocMeeting. SA receives a callback event with conversation state as conferenced, along with an ms:rtc:saas:addParticipant link. This link is used to add participants to the meeting.
9. SA then uses the ms:rtc:saas:acceptAndBridge capability to bridge the incoming messaging invitation into the on demand meeting that it just created.
10. SA receives a callback  - ms:rtc:saas:conversationBridge added event, meaning a new conversation bridge has been created. Calling a GET on this resource shows you another resource, which can be used to get or add bridge participants - ms:rtc:saas:bridgedParticipants.
11. SA POSTs on the ms:rtc:saas:bridgedParticipants link to add the SFB online users who are handling the chat support requests to the conversation bridge. This request includes a messageFilterState parameter set to disabled. If enabled, it means that the messages sent by the participant are not sent to the chat client, and vice versa. This request also has displayName and participantUri parameters to set the display name and indicate the sip uri of the SFB online user to add.
 
12. The SA does a POST on the ms:rtc:saas:sendMessage token link with a welcome text and gets callbacks informing that the message has been successfully sent.
13. The chat client receives the message in its event channel
14. SA then proceeds to add one or more participants to the meeting, using POST on the link of the resource - ms:rtc:saas:addParticipant, got in step 8. These participants are the customer service representatives that will answer the chat support request, and are SFB online users.
15. The SA gets a callback when the SFB Online user joined the IM meeting.
16. If the SFB Online user is sending an "Is Typing" notification, it will be conveyed to the chat client on its event channel
17. SFB online user sends a message, it will be conveyed to the chat client on its event channel
18. The chat client sends an IsTyping notification, it will be conveyed to all the SFB online users joined to the conference.
19. The chat client sends a message, it will be conveyed to all the SFB online users joined to the conference.
20. The chat client now closes the conversation
21. API sends a callback to the SA, indicating the conversation has been deleted.
22. The SA then sends a request to terminate the conference conversation with the Trusted Application API
 
 
The way the API informs the SA of any event is via the callback url. In order for the SA to keep context when starting a new invitation or message, an operation id can be passed in. This id will be sent back in the callback event.
 
The general principles, capabilities, API style, API concepts are modeled to closely follow the already released UCWA API. Please see this link for detailed info - [UCWA API reference](https://msdn.microsoft.com/en-us/skype/ucwa/ucwa2_0apireference)
 
Being familiar with the UCWA concepts greatly simplifies understanding the Trusted Application APIs
 
 
The detailed call flow is shown in the diagram below. Each of the capability related APIs, related callbacks are modeled on the UCWA capabilities and callback structure. Please refer to the [UCWA API reference](https://msdn.microsoft.com/en-us/skype/ucwa/ucwa2_0apireference) to get detailed description
about these  calls.
## Next step
The callflow describes the customer care chat scenario from the perspective of a service application. To see how client side logic is implemented, get the [Web SDK chat sample](https://github.com/OfficeDev/skype-docs/tree/master/Skype/WebSDK/samples/Chat) or review the following topic.
- [Implementing a Chat Client with the Skype Web SDK](ImplementingChatClientWithSkypeWebSDK.md)

![UCAP initiated callflow](images/CallFlow1image001.png) 