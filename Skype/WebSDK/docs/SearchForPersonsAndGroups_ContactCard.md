
# Search for persons and distribution groups - Display Contact Card


 _**Applies to:** Skype for Business 2015_

## Provide a SIP URI or contact name to see expanded info

With a Person object it is possible to retrieve additional information such as department, title, company, email addresses, phone numbers, and SIP URI among other information.  With this information we will build a simple contact card displaying additional information about a contact.  In this example we re-use logic from contact search and limit the results to a single contact and build a simple table containing the extra information.

```js
function addDetail(header, value, container) {
    if (value) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'table-row';
        container.appendChild(rowDiv);
        var cellDiv = document.createElement('div');
        cellDiv.className = 'table-cell';
        rowDiv.appendChild(cellDiv);
        var cellHeaderDiv = document.createElement('div');
        cellHeaderDiv.innerHTML = header;
        cellDiv.appendChild(cellHeaderDiv);
        var cellContentDiv = document.createElement('div');
        cellContentDiv.innerHTML = value;
        cellDiv.appendChild(cellContentDiv);
    }
}

function createContactCard(contact, container) {
    var title = contact.title();
    var department = contact.department();
    var company = contact.company();
    var emails = contact.emails();
    // const workPhone = contact.workPhone();
    var id = contact.id();
    if (title || department) {
        var titleDeptarmentDiv = document.createElement('div');
        titleDeptarmentDiv.innerHTML = title ? title + ', ' : '';
        titleDeptarmentDiv.innerHTML += department ? department : '';
        container.querySelector('.table-row > .table-cell:last-child').appendChild(titleDeptarmentDiv);
    }
    var contactCardDiv = document.createElement('div');
    contactCardDiv.className = 'contactCard table';
    container.appendChild(contactCardDiv);
    addDetail('Company', company, contactCardDiv);
    if (emails.length !== 0) {
        addDetail('Send Email', emails[0].emailAddress(), contactCardDiv);
    }
    // addDetail('Call Work', workPhone, contactCardDiv);
    addDetail('IM', id, contactCardDiv);
}
```

## Additional resources

- [Get a person and listen for availability](ListenForAvailability.md)
