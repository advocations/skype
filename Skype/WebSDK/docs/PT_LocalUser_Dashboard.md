
# Load Dashboard


 _**Applies to:** Skype for Business 2015_

## Local user


### Using the mePerson object

The [MePerson]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.meperson.html) object is retrieved through the **[application]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.application.html).[personsAndGroupsManager.mePerson]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.personsandgroupsmanager.html#meperson)** property. For example, the following JavaScript code sample sets the availability of the signed in user to online.


```js
// tell the mePerson to change the availability state

app.personsAndGroupsManager.mePerson.status.set('Online').then(function () {
    alert('The status of mePerson has been changed');
}).then(null, function (error) {
    // and if could not be changed, report the failure
    alert(error || 'The server has rejected this availability state.');
});
```

[MePerson]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.meperson.html) properties which can be set


|||
|:-----|:-----|
|Property|Description|
|location|Gets or sets the location of the signed in user.|
|note.text|Gets or sets the personal note of the signed in user.|
|status|Gets or sets the availability of the signed in user.|
>**Note:** When the above values contain special characters such as <, >, and they will be padded with zero width whitespace. This can cause equality operations to fail unexpectedly. One option for handling this situation is to filter out these special values so they are not used.

[MePerson]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.meperson.html) properties which are read-only


|||
|:-----|:-----|
|Property|Description|
|department|Gets the work department of the signed in user.|
|email|Gets the primary email address of the signed in user.|
|emails|Gets the email addresses associated with the signed in user.|
|displayName|Gets the display name of the signed in user.|
|avatarUrl|Gets the photo URL of the signed in user.|
|title|Gets the business title of the signed in user.|
|id|Gets the SIP URI of the signed in user.|

```js
function createContactCard(contact, container) {
    contact.company.get().then(function () {
        var contactCardDiv = document.createElement('div');
        contactCardDiv.className = 'contactCard table';
        container.appendChild(document.createElement('br'));
        container.appendChild(contactCardDiv);
        contact.displayName() && window.framework.addContactCardDetail('Name', contact.displayName(), contactCardDiv);
        contact.company() && window.framework.addContactCardDetail('Company', contact.company(), contactCardDiv);
        contact.department() && window.framework.addContactCardDetail('Department', contact.department(), contactCardDiv);
        contact.id() && window.framework.addContactCardDetail('IM', contact.id(), contactCardDiv);
        contact.emails().length !== 0 && window.framework.addContactCardDetail('Email', contact.emails()[0].emailAddress(), contactCardDiv);
        contact.phoneNumbers().length !== 0 && window.framework.addContactCardDetail('Phone', contact.phoneNumbers()[0].displayString(), contactCardDiv);
    });

const application = window.framework.application;
// retrieve local user details
const mePerson = application.personsAndGroupsManager.mePerson;
const contactsDiv = content.querySelector('.contacts');
const mePersonArray = []; 
mePersonArray.push(mePerson);
contactsDiv.innerHTML = '';
window.framework.populateContacts(mePersonArray, contactsDiv);
window.framework.createContactCard(mePerson, contactsDiv.querySelector('.contact'));
window.framework.createContactCard(mePerson, content.querySelector('.contactcard'));
```

## See also


#### Concepts



[Show a person's information](ShowPersonInfo.md)
#### Other resources


[MePerson]( https://ucwa.skype.com/reference/WebSDK/interfaces/_s4b_sdk_d_.jcafe.meperson.html)
