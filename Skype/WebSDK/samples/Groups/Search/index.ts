/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

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
        window.framework.reportStatus('Searching for Groups...', window.framework.status.info);
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
                window.framework.reportStatus('Groups Found', window.framework.status.success);
            } else {
                window.framework.reportError('No groups found, try a different search');
            }
        }, function (error) {
            window.framework.reportError(error, reset);
        });
        // @end_snippet
    });
})();
