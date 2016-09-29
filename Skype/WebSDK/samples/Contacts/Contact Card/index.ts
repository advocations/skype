/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/SearchForPersonsAndGroups_ContactCard.md' : 'Content/websdk/docs/SearchForPersonsAndGroups_ContactCard.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.query'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.query')).value = '';
        (<HTMLElement>content.querySelector('.contacts')).innerHTML = '';
        (<HTMLElement>content.querySelector('.contacts')).style.display = 'none';
    }

    // @snippet
    function addDetail (header: string, value: string, container: HTMLElement) {
        if (value) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'table-row';
            container.appendChild(rowDiv);
            const cellDiv = document.createElement('div');
            cellDiv.className = 'table-cell';
            rowDiv.appendChild(cellDiv);
            const cellHeaderDiv = document.createElement('div');
            cellHeaderDiv.innerHTML = header;
            cellDiv.appendChild(cellHeaderDiv);
            const cellContentDiv = document.createElement('div');
            cellContentDiv.innerHTML = value;
            cellDiv.appendChild(cellContentDiv);
        }
    }

    function createContactCard (contact: jCafe.Person, container: HTMLElement) {
        const title = contact.title();
        const department = contact.department();
        const company = contact.company();
        const emails = contact.emails();
        // const workPhone = contact.workPhone();
        const id = contact.id();
        if (title || department) {
            const titleDeptarmentDiv = document.createElement('div');
            titleDeptarmentDiv.innerHTML = title ? title + ', ' : '';
            titleDeptarmentDiv.innerHTML += department ? department : '';
            container.querySelector('.table-row > .table-cell:last-child').appendChild(titleDeptarmentDiv);
        }

        const contactCardDiv = document.createElement('div');
        contactCardDiv.className = 'contactCard table';
        container.appendChild(contactCardDiv);

        addDetail('Company', company, contactCardDiv);
        if (emails.length !== 0) {
            addDetail('Send Email', emails[0].emailAddress(), contactCardDiv);
        }
        // addDetail('Call Work', workPhone, contactCardDiv);
        addDetail('IM', id, contactCardDiv);
    }
    // @end_snippet

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.search'), 'click', () => {
        const query = (<HTMLInputElement>content.querySelector('.query')).value;
        const contactsDiv = <HTMLElement>content.querySelector('.contacts');
        const application = window.framework.application;
        window.framework.reportStatus('Searching a Contact...', window.framework.status.info);
        const search = application.personsAndGroupsManager.createPersonSearchQuery();
        search.text(query);
        search.limit(1);
        search.getMore().then(() => {
            reset();
            const contacts = search.results();
            if (contacts.length !== 0) {
                contactsDiv.style.display = 'block';
                window.framework.populateContacts(search.results(), contactsDiv);
                createContactCard(search.results()[0].result, <HTMLElement>contactsDiv.querySelector('.contact'));
                window.framework.reportStatus('Contacts Found', window.framework.status.success);
            } else {
                window.framework.reportError('No contacts found, try a different search');
            }
        }, error => {
            window.framework.reportError(error, reset);
        });
    });
})();
