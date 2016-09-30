/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups_All.md' : 'Content/websdk/docs/Groups_All.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    function reset() {
        (<HTMLElement>content.querySelector('.groups')).innerHTML = '';
        (<HTMLElement>content.querySelector('.groups')).style.display = 'none';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.get'), 'click', () => {
        reset();
        const groupsDiv = <HTMLElement>content.querySelector('.groups');
        const application = window.framework.application;
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Retrieving all groups...';
        const groups = application.personsAndGroupsManager.all.groups;
        groups.get().then(groups => {
            groupsDiv.style.display = 'block';
            window.framework.populateGroups(groups, groupsDiv);
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Retrieved all groups';
        }, error => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        });
    });
})();
