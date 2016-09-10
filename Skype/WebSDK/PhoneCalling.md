
# Making incoming and outgoing calls with phone numbers


 _**Applies to:** Skype for Business 2015_

 **In this article**  
[How to add a phone number as a contact?](#sectionSection0)  
[How to identify if a contact is a phone number or a sip contact?](#sectionSection1)  
[How to identify if a conversation is with a phone number or a sip contact?](#sectionSection2)  
[How to call a phone number using Web SDK API?](#sectionSection3)  
[How to call a phone number using conversation control?](#sectionSection4)  
[How to add a phone number to an existing call?](#sectionSection5)  
[How to answer an incoming call with a phone number?](#sectionSection6)  
[How to end a call with a phone number?](#sectionSection7)  
[How to handle the states and event updates for a call with a phone number?](#sectionSection8)  



## How to add a phone number as a contact?
<a name="sectionSection0"> </a>

A contact is represented by the Person object in Skype Web SDK (in this document, we will use contact and person interchangeably to mean the same thing). You can add a Person object that represents a phone number to your contact list.

  ```js
  // first choose a group where you want the contact to be added to
  // this example uses the 'Others' group
  var othersGroup = application.personsAndGroupsManager.all.groups.filter(function (g) {
  	return g.type == 'Others';
  })[0];

  // p can be ia person object returned by searching for the phone number
  otherGroup.persons.add(p);

  // alternatively, you can pass in the phone number directly
  othersGroup.persons.add('tel:+14259999999');
  ```


## How to identify if a contact is a phone number or a sip contact?
<a name="sectionSection1"> </a>

The 'type' property can be used to identify whether a contact is a phone number or a sip contact. The 'id' property can be used to display the telephone URI of a phone number contact.

  ```js
  // The following might show something like:
  //	'sip:yodu@microsoft.com' 'Yong Du' 'User' for a sip contact
  //	'tel:+14259999999' '+1 (425) 999-9999' 'Phone' for a phone number contact
  console.log(p.id(), p.displayName(), p.type());

  ```

## How to identify if a conversation is with a phone number or a sip contact?
<a name="sectionSection2"> </a>

When you have a reference to a conversation, you can access the participant objects in that conversation; and you can then get the type of the person object associated with a participant.


  ```js
  var conversation = application.conversationsManager.conversations(0);
  var type = conversation.participants(0).person.type(); // 'Phone' for a phone number contact

  // the uri property of the participant object is the same as the id property of the associated person object
  var id   = conversation.participants(0).person.id(); // 'tel:+14259999999'
  var uri  = conversation.participants(0).uri(); // 'tel:+14259999999'

  ```


## How to call a phone number using Web SDK API?
<a name="sectionSection3"> </a>

Calling a phone number is the same as calling a sip contact in Web SDK, the only difference is that the contact you added to the conversation is a phone number contact versus a sip contact.

  ```js
  var conversation = application.conversationsManager.createConversation();
  conversation.participants.add(p); // where p is a phone number contact
  // OR
  conversation.participants.add('tel:+14259999999'); // where you specify the phone number uri
  conversation.audioService.start();
  ```



## How to call a phone number using conversation control?
<a name="sectionSection4"> </a>

This is done using the 'renderConversation' call in conversation control.

  ```js
  // api is the object returned by calling 'Skype.initialize" via the SkypeBootstrap
  api.renderConversation('#convContainer', {
    participants: ['tel:+14259999999']
  }).then(function (conversation) {
    // Resolved promise when conversation is correctly rendered
    console.log('Conversation rendered successfully', conversation);
    conversation.participants(0).person.id(); // should be 'tel:+14259999999'
  }, function (error) {
    // Rejected promise when conversation is not correctly rendered
    // use 'error' argument for more details
    console.log('Failed to render conversation', error);
  });
  ```


## How to add a phone number to an existing call?
<a name="sectionSection5"> </a>

This is the same as adding a phone number contact to a newly created conversation.

  ```js
  conversation.participants.add(p); // where p is a phone number contact
  // OR
  conversation.participants.add('tel:+14259999999'); // where you specify the phone number uri
  ```


## How to answer an incoming call from a phone number?
<a name="sectionSection6"> </a>

This is the same as answering any other incoming calls using the 'audioService.accept' API. The state of selfParticipant.audio will become 'Notified' when an incoming conversation is ready to be accepted.


  ```js
  application.conversationsManager.conversations.added(function (conversation) {
    // a new conversation is created by the Web SDK to handle the incoming call
    // the incoming call is ready to be accepted when the audio state becomes 'Notified'
    // note: you can also listen to changes on 'conversation.audioService.state'
    conversation.selfParticipant.audio.state.changed(function (newVal) {
      if (newVal == 'Notified') {
        conversation.audioService.accept();
      }
    });
  ```

## How to end a call from a phone number?
<a name="sectionSection7"> </a>

This is the same as terminating any other ongoing calls using the 'audioService.stop' API.

  ```js
  conversation.audioService.stop();
  ```


## How to handle the states and event updates for a call with a phone number?
<a name="sectionSection8"> </a>

This is the same for handling all calls. It essentially depends on how you want to design your user application, but usually the following events and state changes need to be handled:

1. The 'added' and 'removed' events on the conversations collection:

 - When a new conversation is added, your application may want to display it somewhere in a conversation list, where you can provide more operations on that conversation (e.g., add/remove participants, mute/unmute, delete the conversation, etc.)

 - When a conversation is removed from the conversations collection, your application may want to 

2. The audio state of selfParticipant (or conversation.audioService.state):

 - When an incoming invitation arrives, the Web SDK will create a new conversation and bring the audio state of the selfParticipant to 'Notified'. This is the recommended indicator for the user application to notify the user to either accept the call or reject it.

 - When a conversation is successfully established (for both incoming or outgoing calls, and for the remote party being either a phone number or sip contact), the audio state will become 'Connected'. This is when the user application needs to render the conversation status to the user (e.g., a counter to show the elapsed time, icons to show the call is connected, and the remote party's name, type, etc.).

3. The audio state of a remote participant:

 - When you call a remote participant (a phone number or sip contact), the audio state of the remote participant can switch between 'Ringing', 'Connecting', 'Connected', and 'Disconnected'. Listening to these state changes will let your application display meaning calling states to the user.

Here is an example of calling a phone number and updating the call status:

  ```js
  var conversation = application.conversationsManager.createConversation();
  conversation.participants.add('tel:+14259999999'); // where you specify the phone number uri

  // listen to the audio state changes of the selfParticipant
  conversation.selfParticipant.audio.state.changed(function (newState, reason, oldState) {
    // showing newState in some <div-self>
  });

  // listen to the audio state changes of the remote participant
  conversation.participants(0).audio.state.changed(function (newState, reason, oldState) {
    // showing newState in some <div-remote>
  });

  // make the call
  // the user may see these changes in <div-self> and <div-remote>:
  // "Disconnected" -> "Notified" -> "Connecting" -> "Connected"
  // "Disconnected" -> "Ringing" -> "Connecting" -> "Connected"
  conversation.audioService.start();

  $('#endCall').click(function () {
    // end the call if the user chooses to do so
    // the user may see these changes in <div-self> and <div-remote>:
    // "Connected" -> "Disconnecting" -> "Disconnected"
    conversation.audioService.stop();
  });
  ```

