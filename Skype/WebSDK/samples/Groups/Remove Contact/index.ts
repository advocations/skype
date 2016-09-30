/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups_RemoveContact.md' : 'Content/websdk/docs/Groups_RemoveContact.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

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
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Removing contact...';
        application.personsAndGroupsManager.all.persons.remove(person).then(() => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Contact removed';
        }, error => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        }).then(reset);
    });
})();
