/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Groups.md' : 'Content/websdk/docs/Groups.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.query'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.query')).value = '';
        (<HTMLElement>content.querySelector('.groups')).innerHTML = '';
        (<HTMLElement>content.querySelector('.groups')).style.display = 'none';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.search'), 'click', () => {
        const query = (<HTMLInputElement>content.querySelector('.query')).value;
        const groupsDiv = <HTMLElement>content.querySelector('.groups');
        const application = window.framework.application;
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Searching for groups...';
        // @snippet
        const search = application.personsAndGroupsManager.createGroupSearchQuery();
        search.text(query);
        search.limit(5);
        search.getMore().then(() => {
            reset();
            const groups = search.results();
            if (groups.length !== 0) {
                groupsDiv.style.display = 'block';
                window.framework.populateGroups(search.results(), groupsDiv);
                content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
                content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Groups Found';
            } else {
                content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
                content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'No groups found. Please check the spelling or try a different search.';
            }
        }, function (error) {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        });
        // @end_snippet
    });
})();
