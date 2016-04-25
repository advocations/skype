
# Search for persons and distribution groups

 **Last modified:** February 02, 2016

 _**Applies to:** Skype for Business 2015_

A Person represents a user. The [Person](https://msdn.microsoft.com/en-us/library/office/dn962150(v=office.16).aspx) object can be queried for information about a person, such as their availability to join a conversation. The [Person](https://msdn.microsoft.com/en-us/library/office/dn962150(v=office.16).aspx) object is passed to the conversation starting methods, such as the [ConversationsManager](https://msdn.microsoft.com/en-us/library/office/dn962151(v=office.16).aspx)**.getConversation** method, so that the conversation invitation is sent to the person represented by the [Person](https://msdn.microsoft.com/en-us/library/office/dn962150(v=office.16).aspx) object.

A [Group](https://msdn.microsoft.com/en-us/library/office/dn962156(v=office.16).aspx) can represent a distribution group, server-defined person set, or user-defined person set. If the [Group](https://msdn.microsoft.com/en-us/library/office/dn962156(v=office.16).aspx) is a distribution group, it can also link to other distribution groups. Persons in a distribution group are represented by [Person](https://msdn.microsoft.com/en-us/library/office/dn962150(v=office.16).aspx) objects. The arguments for the [PersonsAndGroupsManager](https://msdn.microsoft.com/en-us/library/office/dn962153(v=office.16).aspx).**createGroupSearchQuery** method include a partial or full name query and a numeric limit to the size of the result sets. Results include a collection of distribution groups. To find persons, use the [PersonsAndGroupsManager](https://msdn.microsoft.com/en-us/library/office/dn962153(v=office.16).aspx).**createPersonSearchQuery** method.
The following procedure assumes that a user has signed in before searching for persons and groups.

### Search for persons


1. Create a  **SearchQuery** for person search: **personsAndGroupsManager.createPersonSearchQuery**.
    
2. Specify the search terms in the  **SearchQuery**.
    
3. Execute the  **searchQuery.getMore** method and get the search **results** in the **onSuccess** method.
    
4. Call the  **forEach** method of the array of results. For each result, **Person** object is the result.result.
    
>**Note**:  The maximum number of results for a person search query is 50. 

  ```js
  var personSearchQuery = application.personsAndGroupsManager.createPersonSearchQuery();
personSearchQuery.text('John Doe');
personSearchQuery.limit(50);
personSearchQuery.getMore().then(null, function (results) {
    results.forEach(function (result) {
        var person = result.result;
        person.avatarUrl.get().then(function (url) {
            console.log('The person`s photo: ' + url);
        });
        person.status.get().then(function (status) {
            console.log('The person`s online status: ' + status);
        });
    });
});

  ```


### Search for groups


1. Create a  **SearchQuery** for group search: **personsAndGroupsManager.createGroupSearchQuery**.
    
2. Specify the search terms in the  **SearchQuery**.
    
3. Execute the  **searchQuery.getMore** method and get the search **results** in the **onSuccess** method.
    
4. Call the  **forEach** method of the array of results. For each result, **Group** object is the **result.result**.


  ```js
  var groupSearchQuery = application.personsAndGroupsManager.createGroupSearchQuery();
groupSearchQuery.text('mygroup');
groupSearchQuery.limit(50);
groupSearchQuery.getMore().then(null, function (results) {
    results.forEach(function (result) {
        var group = result.result;
        console.log('Distribution Group ', group.name());
    });
});

  ```


## Additional resources


- [Get a person and listen for availability](ListenForAvailability.md)
