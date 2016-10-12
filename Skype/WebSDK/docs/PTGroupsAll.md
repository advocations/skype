
# Retrieve All Groups


 _**Applies to:** Skype for Business 2015_

## Click to retrieve all groups

The personAndGroupsManager object exposes a group, all, which contains all persons and all groups.  Using this property we can get access to the groups collection and make a one-time request via Get() to retrieve information for all groups.  It would also be possible to retrieve all groups by calling subscribe on the groups collection and listening to the added event.

```js
var application = window.framework.application;
// Notify search in progress
var groups = application.personsAndGroupsManager.all.groups;
groups.get().then(function (groups) {
    // updateUI(groups)
    // Groups search complete
}, function (error) {
    // handleError(error)
    // Groups search error
});
```

## Additional resources

- [Get a person and listen for availability](ListenForAvailability.md)
