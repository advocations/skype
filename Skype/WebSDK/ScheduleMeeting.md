
# Scheduling meetings


 _**Applies to:** Skype for Business 2015_

The SDK gives you the ability to schedule meetings as shown below:


1. Create a new meeting. This is still a client side operation and returns a model containing observable properties.

  ```js
  var meeting = app.conversationsManager.createMeeting();
  ```

2. Set properties of the meeting if required. All parameters are optional.

  ```js
  meeting.subject('Planning meeting');
  meeting.expirationTime(new Date + 24 * 3600 * 5);
  ```

3. Do a get on the onlineMeetingUri to trigger creation of a meeting on the backend.

  ```js
  meeting.onlineMeetingUri.get().then(uri => {
      var conversation = app.conversationsManager.getConversationByUri(uri);
  });
  ```
