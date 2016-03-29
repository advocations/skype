## Skype Web SDK - Release Notes 

_**Release Date 03/30/2016**_

What is included in this release?

- [Preview and Production API Keys]( /APIProductKeys.md)
- [Capabilities and Support for Production Use and Preview Use]( /APIProductKeys.md)
- [Updated Plugins for Windows and Mac](_/GettingStarted.md)  (Supported only against SfB 2015)
- [Samples for SfB onprem and SfB online](https://github.com/OfficeDev/skype-web-sdk-samples)
- [Release Software License Terms](_/TermsOfService.md)
- [Skype Style Guidelines](https://github.com/OfficeDev/skype-web-sdk-samples/blob/master/SkypeWebSDK-StyleGuidelines.pdf)

**New capabilities and Key resolved issues**

You can now embed and use the Skype Conversation UI control for P2P chats within your application
We have also resolved several customers reported issues related to Conversations, Chat, Audio and Video. Some key customer reported resolved issues are listed below.

- Ability to switch video device during the call
- Ability to change video mode 
- Temporarily incorrect value on conversation.uri
- Cannot stream video after restarting video service
- Participant object for a meeting's owner contains the meeting's sip address and not the user's sip address
- Incorrect value on displayName property of remote participants
- Video lost when toggling css property "display" between "none" and "block"
- Video lost when removing video container from the DOM and adding it again
- Video Channel isStarted property not in-sync and missing event
- selfParticipant.audio.isMuted(true) doesn't work in meetings

**Supported Browsers**

- IE 10+ (Skype for Business Onprem)
- IE 11 (Skype for Business Online)
- Safari 8+
- Microsoft Edge
- Firefox 40+ (non Audio Video functionality)
- Chrome 43+ (non Audio Video functionality)

**Supported Server versions**

- Lync 2013 cumulative update 6HF2 +, Skype for Business 2015 CU1+:
 
   - Scenario:
    - Sign in
    - Sign out
    - Presence
    - View Contacts
    - Groups
    - Chat services
    - Skype Conversation UI
    

- Skype for Business 2015 Cumulative Update 1+

    - Scenario: 
      - P2P AV
      - Group AV
      - Devices selection
      - Anonymous meeting join
      - Add/remove contacts and groups

