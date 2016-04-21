#Skype for Business App SDK client implementation
## Sample client implementation

This sections provides a few examples on how clients can consume the SDK. These are conceptual representations to give developers a view into the call flows.

### Scenario: Join meeting and start chat 

```java
// Get the SDK application instance
IApplication application = IApplication.getSharedApplication()

// Set display name for guest
IConfigurationManager configurationManager = application.getConfigurationManager();
configurationManager.setDisplayName(name);

// Join the meeting and register for events
IConversationsManager conversationsManager = application.getConversationsManager();

IConversation conversation = conversationsManager.getOrCreateConversationByUri (URI);
conversation.addObserver(self);

IChatService chatService = conversation.getChatService();
chatService.addObserver(self);

IHistoryService historyService = conversation.getHistoryService();
historyService.getActivityItems().addObserver(self);

// Process events
onConversationOrChatChanged() 
{
  if ((conversation.getConversationState() == Established) &&
       (chatService.canSendMessage())
  {
    chatService.sendIM( <first message to be sent> )
  }
}

onActivityItemsChanged()
{
   //Update UI with the latest activity items: including messages sent and received
}

```

### Scenario: Create a 1:1 chat session with a service endpoint

```java
// Get conversation manager
IConversationsManager conversationsManager = application.getConversationsManager();

// Create conversation
IConversation conversation = conversationsManager.createConversation()

// Add the remote participant
conversation.AddParticipant(URI,  “helpdesk@contoso.com”, token)

// Get & Start the chat service
IChatService chatService = conversation.getChatService();

// Send IM.  First IM will also establish connectivity with remote user.
chatService.sendIM( <first message to be sent> )

// Register and process events as above

```
