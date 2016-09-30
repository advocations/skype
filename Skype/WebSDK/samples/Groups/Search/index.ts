/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    window.framework.hideNotificationBar();

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
        window.framework.showNotificationBar();
        window.framework.updateNotification('fa fa-info-circle', 'Searching for groups...');
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
                window.framework.updateNotification('fa fa-thumbs-up', 'Group found');
            } else {
                window.framework.updateNotification('fa fa-thumbs-down', 'No groups found. Please check the spelling or try a different search.');
            }
        }, function (error) {
            window.framework.updateNotification('fa fa-thumbs-down', error);
        });
        // @end_snippet
    });
})();
