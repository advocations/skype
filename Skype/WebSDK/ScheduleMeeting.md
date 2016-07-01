
# Scheduling meetings


 _**Applies to:** Skype for Business 2015_

The SDK lets you schedule online meetings. The meeting you create can be joined from the time it is created until the specified expiration date.
>Note: The scheduled meeting is a Skype-only meeting. It is not visible in or available to join from a user's Outlook calendar.


1. Create a new online meeting and store the returned [scheduledMeeting](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.scheduledmeeting.html) object. 
This is still a client side operation and returns a model containing observable properties.

  ```js
  var meeting = app.conversationsManager.createMeeting();
  ```

2. Set properties of the meeting if required. All parameters are optional.
  >Note:  Meeting property values can only be set or updated before the meeting model is POSTed to the UCWA server endpoint. 
  Set any desired properties before you get the onlineMeetingUri and join the meeting.

  ```js
  meeting.subject('Planning meeting');
  meeting.expirationTime(new Date + 24 * 3600 * 5);
  ```

3. Call the [get()](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.scheduledmeeting.html#onlinemeetinguri) method on the [onlineMeetingUri](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.scheduledmeeting.html#onlinemeetinguri) 
to create the meeting on the server.

  ```js
  meeting.onlineMeetingUri.get().then(uri => {
      var conversation = app.conversationsManager.getConversationByUri(uri);
  });
  ```

4. [Join the online meeting](https://msdn.microsoft.com/en-us/skype/websdk/joinmeeting) by using the [conversation](https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.conversation.html) returned in the previous step.
