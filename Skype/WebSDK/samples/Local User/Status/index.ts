/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    function reset () {
        (<HTMLSelectElement>content.querySelector('select')).selectedIndex = 0;
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.set'), 'click', () => {
        const status = (<HTMLOptionElement>content.querySelector('select option:checked')).value;
        const application = window.framework.application;
        window.framework.reportStatus('Changing Status...', window.framework.status.info);
        // @snippet
        const mePerson = application.personsAndGroupsManager.mePerson;
        mePerson.status.set(status).then(() => {
            window.framework.reportStatus('Status Changed', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
    });
})();
