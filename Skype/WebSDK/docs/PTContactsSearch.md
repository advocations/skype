
# Search for persons and distribution groups


 _**Applies to:** Skype for Business 2015_

A Person represents a user. The <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.person.html" target="">Person</a> object can be queried for information about a person, such as their availability to join a conversation. The <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.person.html" target="">Person</a> object is passed to the conversation starting methods, such as the <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.conversationsmanager.html#getconversation" target="">ConversationsManager.getConversation</a> method, so that the conversation invitation is sent to the person represented by the <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.person.html" target="">Person</a> object.

A <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.group.html" target="">Group</a> can represent a distribution group, server-defined person set, or user-defined person set. If the <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.group.html" target="">Group</a> is a distribution group, it can also link to other distribution groups. Persons in a distribution group are represented by <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.person.html" target="">Person</a> objects. The arguments for the <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.personsandgroupsmanager.html#creategroupsearchquery" target="">PersonsAndGroupsManager.createGroupSearchQuery</a> method include a partial or full name query and a numeric limit to the size of the result sets. Results include a collection of distribution groups. To find persons, use the <a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.personsandgroupsmanager.html#createpersonsearchquery" target="">PersonsAndGroupsManager.createPersonSearchQuery</a> method.
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
      window.framework.populateContacts(person, contactsDiv);
      // success - Contact Found            
    }, 
    function (error) {
     // handle error
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
      // success - Group Found
    }, 
    function (error) {
      // error
    });
});

  ```

## Additional resources

- <a href="https://msdnstage.redmond.corp.microsoft.com/skype/websdk/docs/ListenForAvailability?branch=ajkher/project-shakespeare" target="">Get a person and listen for availability</a>

