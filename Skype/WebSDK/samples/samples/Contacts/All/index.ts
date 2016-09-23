/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    function reset () {
        (<HTMLElement>content.querySelector('.contacts')).innerHTML = '';
        (<HTMLElement>content.querySelector('.contacts')).style.display = 'none';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.get'), 'click', () => {
        reset();
        const contactsDiv = <HTMLElement>content.querySelector('.contacts');
        const application = window.framework.application;
        window.framework.reportStatus('Retrieving all Contacts...', window.framework.status.info);
        // @snippet
        const persons = application.personsAndGroupsManager.all.persons;
        persons.get().then(contacts => {
            contactsDiv.style.display = 'block';
            window.framework.populateContacts(contacts, contactsDiv);
            window.framework.reportStatus('Retrieved all Contacts', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        });

        // persons.subscribe();
        // persons.added(function (person) {
        //  handle persons here
        // });
        // @end_snippet
    });
})();
