
# Get a person and listen for availability

 **Last modified:** February 02, 2016

 _**Applies to:** Skype for Business 2015 | Skype for Business Online_

The SDK gives you access to a user's person list. A user can start a conversation with a person from of her person list or from a person search result. After a user gets a [Person]( https://msdn.microsoft.com/en-us/library/office/dn962150(v=office.16).aspx) from one of these sources, she can start a conversation as long as the person's presence shows as available. Your app should show current person presence to give a real-time view of the availability of any person displayed in a UI.


## Requesting presence notifications

To request continued presence notifications from Skype for Business Server when a person's presence changes, get the person you are interested in and add a listener for changes in the  **Person.status** property.


### To request presence notifications


1. Get a person from the user's person list or from search results.
    
2. Register a listener for the "changed" event on the  **Person.status**[Property]( https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx).
    
3. In the listener method, show the new availability on your UI.
    
4. Call  **status.subscribe** method to subscribe for update of the person's status. In this case the code is getting a reference to the **status**[Property]( https://msdn.microsoft.com/en-us/library/office/mt657725(v=office.16).aspx) and the **subscribe** function is called on the property reference.
    

```js
//get a person. In this case, the first person in the user's person list   
var person = application.personsAndGroupsManager.all.persons(0)
person.status.changed(function (status) {
    console.log('availability status is changed to ' + status);
});
person.activity.changed(function (activity) {
    console.log('activity is changed to ' + status);
});
person.status.subscribe();
person.activity.subscribe();
```


## See also


#### Concepts


[Listening for and generating presence events]( /PresenceEvents.md)  
[Start a conversation]( /StartConversation.md)
