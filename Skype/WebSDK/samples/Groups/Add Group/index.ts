/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

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
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Adding group...';
        // @snippet
        const group = application.personsAndGroupsManager.createGroup();
        group.name(groupName);
        application.personsAndGroupsManager.all.groups.add(group).then(() => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Group added';
        }, error => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        }).then(reset);
        // @end_snippet
    });
})();
