
# Search for persons and distribution groups - Retrieve All Contacts


 _**Applies to:** Skype for Business 2015_

## Click to retrieve all Contacts

The personAndGroupsManager object exposes a group, all, which contains all persons and all groups.  Using this property we can get access to the persons collection and make a one-time request via Get() to retrieve information for all contacts.  It would also be possible to retrieve all persons by calling subscribe on the persons collection and listening to the added event.

```js
var persons = application.personsAndGroupsManager.all.persons;
persons.get().then(function (contacts) {
    contactsDiv.style.display = 'block';
    window.framework.populateContacts(contacts, contactsDiv);
    window.framework.reportStatus('Retrieved all Contacts', window.framework.status.success);
}, function (error) {
    window.framework.reportError(error);
});
// persons.subscribe();
// persons.added(function (person) {
//  handle persons here
// });
}
```

## Additional resources

- [Get a person and listen for availability](ListenForAvailability.md)
