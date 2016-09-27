/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    const persons = {};

    window.framework.application.personsAndGroupsManager.all.persons.subscribe();
    window.framework.application.personsAndGroupsManager.all.persons.added(person => {
        person.displayName.get();
        person.displayName.changed(value => {
            const option = document.createElement('option');
            const name = person.displayName();
            option.value = name;
            option.innerHTML = name;
            content.querySelector('.personsSelect').appendChild(option);
            persons[name] = person;
        });
    });
    window.framework.application.personsAndGroupsManager.all.persons.removed(person => {
        delete persons[person.displayName()];
        const option = content.querySelector('.personsSelect option[value="' + person.displayName() + '"]');
        content.querySelector('.personsSelect').removeChild(option);
    });

    function reset () {
        (<HTMLSelectElement>content.querySelector('.personsSelect')).selectedIndex = 0;
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.remove'), 'click', () => {
        var personOption = <HTMLOptionElement>content.querySelector('.personsSelect option:checked');
        var person = persons[personOption.value];
        var application = window.framework.application;
        window.framework.reportStatus('Removing Contact...', window.framework.status.info);
        // @snippet
        application.personsAndGroupsManager.all.persons.remove(person).then(() => {
            window.framework.reportStatus('Contact Removed', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
    });
})();
