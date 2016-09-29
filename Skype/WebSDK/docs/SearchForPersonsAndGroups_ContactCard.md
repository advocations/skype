
# Search for persons and distribution groups - Display Contact Card


 _**Applies to:** Skype for Business 2015_

## Provide a SIP URI or contact name to see expanded info

With a Person object it is possible to retrieve additional information such as department, title, company, email addresses, phone numbers, and SIP URI among other information.  With this information we will build a simple contact card displaying additional information about a contact.  In this example we re-use logic from contact search and limit the results to a single contact and build a simple table containing the extra information.

```js
addContactCardDetail: function (header, value, container) {
    if (value) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'mui-row';
        const colLeftDiv = document.createElement('div');
        colLeftDiv.className = 'mui-col-md-6';
        colLeftDiv.style.fontWeight = 'bold';
        colLeftDiv.innerHTML = header;
        const colRightDiv = document.createElement('div');
        colRightDiv.className = 'mui-col-md-6';
        colRightDiv.style.fontStyle = 'italic';
        colRightDiv.innerHTML = value;
        rowDiv.appendChild(colLeftDiv);
        rowDiv.appendChild(colRightDiv);
        container.appendChild(rowDiv);
    }
}

createContactCard: function (contact, container) {
    const contactCardDiv = document.createElement('div');
    contactCardDiv.className = 'contactCard table';
    container.appendChild(document.createElement('br'));
    container.appendChild(contactCardDiv);
    contact.department() && window.framework.addContactCardDetail('Department', contact.department(), contactCardDiv);
    contact.company() && window.framework.addContactCardDetail('Company', contact.company(), contactCardDiv);
    contact.emails().length !== 0 && window.framework.addContactCardDetail('Email Address', contact.emails()[0].emailAddress(), contactCardDiv);
    contact.id() && window.framework.addContactCardDetail('IM', contact.id(), contactCardDiv);
    contact.phoneNumbers().length !== 0 && window.framework.addContactCardDetail('Phone Number', contact.phoneNumbers()[0].displayString(), contactCardDiv);
}
```

## Additional resources

- [Get a person and listen for availability](ListenForAvailability.md)
