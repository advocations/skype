/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    window.framework.hideNotificationBar();

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups_RemoveContact.md' : 'Content/websdk/docs/Groups_RemoveContact.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    const groups = {};

    window.framework.application.personsAndGroupsManager.all.groups.subscribe();
    window.framework.application.personsAndGroupsManager.all.groups.added(group => {
        group.name.get();
        group.name.changed(value => {
            if (!groups[value] && group.type() === 'Custom' || group.type() === 'Distribution') {
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
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.remove'), 'click', () => {
        const groupOption = <HTMLOptionElement>content.querySelector('.groupsSelect option:checked');
        const group = groups[groupOption.value];
        const application = window.framework.application;
        window.framework.showNotificationBar();
        window.framework.updateNotification('fa fa-info-circle', 'Removing group...');
        application.personsAndGroupsManager.all.groups.remove(group).then(() => {
            window.framework.updateNotification('fa fa-thumbs-up', 'Group removed');
        }, error => {
            window.framework.updateNotification('fa fa-thumbs-down', error);
        }).then(reset);
    });
})();
