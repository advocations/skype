/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
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
        window.framework.reportStatus('Removing Group...', window.framework.status.info);
        // @snippet
        application.personsAndGroupsManager.all.groups.remove(group).then(() => {
            window.framework.reportStatus('Group Removed', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
    });
})();
