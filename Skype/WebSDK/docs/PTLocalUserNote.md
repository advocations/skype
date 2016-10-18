
# Note


 _**Applies to:** Skype for Business 2015_

## Local user - Set Note

We can make use of the mePerson object exposed by personsAndGroupsManager and from this object get access to the note property.  This property exposes a writeable text property allowing changes via a set(...) method that takes a provided string.

### Provide a message and click to change note

```js
var mePerson = application.personsAndGroupsManager.mePerson;
mePerson.note.text.set(message).then(function () {
    // note changed succesfully 
}, function (error) {
    // handle error
});
```

#### Other resources

<a href="https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.meperson.html" target="">MePerson</a>
