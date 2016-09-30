/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups_RenameGroup.md' : 'Content/websdk/docs/Groups_RenameGroup.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    const groups = {};

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.groupName'));

    window.framework.application.personsAndGroupsManager.all.groups.subscribe();
    window.framework.application.personsAndGroupsManager.all.groups.added(group => {
        group.name.get();
        group.name.changed(value => {
            if (!groups[value] && group.type() === 'Custom') {
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

    function reset () {
        (<HTMLSelectElement>content.querySelector('.groupsSelect')).selectedIndex = 0;
        (<HTMLInputElement>content.querySelector('.groupName')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.rename'), 'click', () => {
        const groupOption = <HTMLOptionElement>content.querySelector('.groupsSelect option:checked');
        const groupName = (<HTMLInputElement>content.querySelector('.groupName')).value;
        const group = groups[groupOption.value];
        const application = window.framework.application;
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Renaming group...';
        // @snippet
        group.name.set(groupName).then(() => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Group renamed';
        }, error => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        }).then(reset);
        // @end_snippet
    });
})();
