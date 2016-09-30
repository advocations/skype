/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    window.framework.hideNotificationBar();

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups_AddGroup.md' : 'Content/websdk/docs/Groups_AddGroup.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.groupName'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.groupName')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const groupName = (<HTMLInputElement>content.querySelector('.groupName')).value;
        const application = window.framework.application;
        window.framework.showNotificationBar();
        window.framework.updateNotification('fa fa-info-circle', 'Adding group...');
        // @snippet
        const group = application.personsAndGroupsManager.createGroup();
        group.name(groupName);
        application.personsAndGroupsManager.all.groups.add(group).then(() => {
            window.framework.updateNotification('fa fa-thumbs-up', 'Group added');
        }, error => {
            window.framework.updateNotification('fa fa-thumbs-down', error);
        }).then(reset);
        // @end_snippet
    });
})();
