/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.groupName'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.groupName')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const groupName = (<HTMLInputElement>content.querySelector('.groupName')).value;
        const application = window.framework.application;
        window.framework.reportStatus('Adding Group...', window.framework.status.info);
        // @snippet
        const group = application.personsAndGroupsManager.createGroup();
        group.name(groupName);
        application.personsAndGroupsManager.all.groups.add(group).then(() => {
            window.framework.reportStatus('Group Added', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
    });
})();
