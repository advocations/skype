
# Remove Group


 _**Applies to:** Skype for Business 2015_

## Click to remove group

The personAndGroupsManager object exposes a group, all, which contains all persons and all groups.  Using this property we can get access to the groups collection call remove providing a group object or name and have that group removed from the user.  In this example we populate a select list containing groups that can be removed.  When the group is successfully removed a removed event will be emitted on the groups collection.

```js
window.framework.application.personsAndGroupsManager.all.groups.removed(function (group) {
    delete groups[group.name()];
    var option = content.querySelector('.groupsSelect option[value="' + group.name() + '"]');
    content.querySelector('.groupsSelect').removeChild(option);
});
window.framework.addEventListener(content.querySelector('.remove'), 'click', function () {
    var groupOption = content.querySelector('.groupsSelect option:checked');
    var group = groups[groupOption.value];
    var application = window.framework.application;
    application.personsAndGroupsManager.all.groups.remove(group).then(function () {
        // group successfully removed
    }, function (error) {
        // handle error
    }).then(reset);
});
```

## Additional resources

- [Get a person and listen for availability](ListenForAvailability.md)
