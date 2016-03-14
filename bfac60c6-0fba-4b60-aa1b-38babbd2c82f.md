
# Join an existing meeting

 **Last modified:** February 02, 2016

 _**Applies to:** Skype for Business 2015_

A user can join an existing meeting with that meeting's URI.


### Joining an existing meeting


1. Get an instance of the [Conversation](http://technet.microsoft.com/library/0c5a6d3a-d3cb-40c0-96f3-0d42c36af4a8%28Office.14%29.aspx). Note that at this point the user still has not joined the conversation.


  ```js
  var conversation = client.conversationsManager.getConversationByUri(uri);
  ```

2. Start the desired modality for this conversation. At this point the user will have joined the conversation.
    
    The user can join the conversation when the app starts the desired service:
    


  ```js
  // join chat
conversation.chatService.start().then(function() {
…
});
  ```




  ```js
  // join audio
conversation.audioService.start().then(function() {
…
});
  ```




  ```js
  // join video
conversation.videoService.start().then(function() {
…
});
  ```


## See also


#### Concepts


[Join a meeting anonymously](f285efcd-834d-43e5-a222-fae2bbb14e8f.md)
