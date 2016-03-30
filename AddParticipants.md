
# Add participants to a conversation

 **Last modified:** April 17, 2015

 _**Applies to:** Skype for Business 2015_




## Adding participants to a conversation

Additional Persons can be added to a conversation to escalate that conversation to an online meeting.


1. Create a conversation participant.

  ```js
  var participant = conversation.createParticipant(person);
  ```

2. Add the participant to the conversation.

  ```js
  conversation.participants.add(participant);
  ```

3. An event can be subscribed to that is fired when a new participant is added to the conversation.

  ```js
  conversation.participants.added(onConversationParticipantAdded);
  ```


>**Note:** If the participant rejects the invitation, the participant will still be in the **conversation.participants** collection with a 'rejected' state. When this occurs, you should remove the participant and clean up any associated user interface.
    
