/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    function reset () {
        (<HTMLElement>content.querySelector('.groups')).innerHTML = '';
        (<HTMLElement>content.querySelector('.groups')).style.display = 'none';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.get'), 'click', () => {
        reset();
        const groupsDiv = <HTMLElement>content.querySelector('.groups');
        const application = window.framework.application;
        window.framework.reportStatus('Retrieving all Groups...', window.framework.status.info);
        // @snippet
        const groups = application.personsAndGroupsManager.all.groups;
        groups.get().then(groups => {
            groupsDiv.style.display = 'block';
            window.framework.populateGroups(groups, groupsDiv);
            window.framework.reportStatus('Retrieved all Groups', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        });

        // groups.subscribe();
        // groups.added(function (group) {
        //  handle groups here
        // });
        // @end_snippet
    });
})();
