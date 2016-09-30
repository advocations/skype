/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups_AddContact.md' : 'Content/websdk/docs/Groups_AddContact.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    const groups = {};

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));

    window.framework.application.personsAndGroupsManager.all.groups.subscribe();
    window.framework.application.personsAndGroupsManager.all.groups.added(group => {
        group.name.get();
        group.name.changed(value => {
            if (!groups[value] && group.type() !== 'Distribution') {
                const option = document.createElement('option');
                option.value = value;
                option.innerHTML = value;
                content.querySelector('.groupsSelect').appendChild(option);
                groups[value] = group;

            }
        });
    });

    window.framework.application.personsAndGroupsManager.all.groups.removed(group => {
        delete groups[group.name()];
        const option = content.querySelector('.groupsSelect option[value="' + group.name() + '"]');
        content.querySelector('.groupsSelect').removeChild(option);
    });

    function reset() {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        // (<HTMLSelectElement>content.querySelector('.groupsSelect')).selectedIndex = 0;
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const id = (<HTMLInputElement>content.querySelector('.id')).value;
        const group = groups[(<HTMLOptionElement>content.querySelector('.groupsSelect option:checked')).value];
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Adding contact...';
        group.persons.add(id).then(() => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Contact added';
        }, error => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        }).then(reset);
    });
})();
