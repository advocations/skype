# Skype for Business App SDK - API overview
## SDK Object Model 	
 
Figure 1 provides an overview of the object model hierarchy of the Skype for Business App SDK. A brief description of the objects follows.  Detailed descriptions of the operations provided by each object are available in the Deep Dive section.
  
![Skype for Business App SDK object model diagram](images/Fig4_.skype_for_business_OM.png "Figure 4. The Skype for Business App SDK object model hierarchy")

Figure 1. The Skype for Business App SDK object model hierarchy

### Application

The **Application** object is a root entity that provides access to all other entities and services in the SDK. Developers are expected to initialize the application before using other entities in the SDK. It provides access to the **ConversationsManager** object.

### ConversationsManager

<!--- I think Dev have deleted this for now, so need to update here and the diagram. -->

The **ConversationsManager** object provides functionality to start a new conversation and manage current conversations.  In the early stages, where the focus is on scenarios where the app user is a consumer without Skype for Business credentials, the SDK will only support a single active conversation at a time. 

### Conversation

<!--- Let's discuss the Conversation Helper here when discussing Conversation -->

The **Conversation** object represents a communication between one or more participants and is controlled by a set of “services”.

* Participant child objects can be added and removed.   Events are available that indicate when, for example, a new participant has joined the conversation.
* The service child objects are fixed and cannot be added or removed; there is one for each aspect to the communication.

#### Service

Each service object is of a different type, and provides management of a specific aspect of the conversation, for example, management of chat message sending or its activity history: 
 
* **Chat**  To send an IM, to send message that the participant is typing, and so on.
* **Audio** To start/stop audio in the conversation, to control local audio devices etc.
* **Video** To start/stop video in the conversation, to control local video devices etc.
* **History** To view and manage the previous events (for example, sent messages) for the conversation. 

Events are available that indicate that a new message has arrived or the audio/video state has changed.

#### Participant

The **Participant** object represents a specific participant in the conversation.  (A conversation may have many participants.)   This object provides access to the participant’s attributes (for example, name) and to the chat, audio, and video services that are specific to that participant.

Events are available that indicate when, for example, the participant starts typing or their audio/video state has changed.

### DevicesManager

The **DevicesManager** object provides access to configuration of multimedia devices used in audio and video calls. It provides lists of available devices of each type (speakers, microphones, cameras) and allows selection of which one should be used.  Devices and their attributes may vary between platforms. 
