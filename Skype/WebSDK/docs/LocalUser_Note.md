
# Local user Note


 _**Applies to:** Skype for Business 2015_

## Local user - Set Note

We can make use of the mePerson object exposed by personsAndGroupsManager and from this object get access to the note property.  This property exposes a writeable text property allowing changes via a set(...) method that takes a provided string.

### Provide a message and click to change note

```js
var mePerson = application.personsAndGroupsManager.mePerson;
mePerson.note.text.set(message).then(function () {
    window.framework.reportStatus('Note Changed', window.framework.status.success);
}, function (error) {
    window.framework.reportError(error);
}).then(reset);
```

#### Other resources

[MePerson]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.meperson.html)
