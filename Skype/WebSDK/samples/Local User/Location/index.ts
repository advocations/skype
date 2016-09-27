/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.location'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.location')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.set'), 'click', () => {
        const location = (<HTMLInputElement>content.querySelector('.location')).value;
        const application = window.framework.application;
        window.framework.reportStatus('Changing Location...', window.framework.status.info);
        // @snippet
        const mePerson = application.personsAndGroupsManager.mePerson;
        mePerson.location.set(location).then(() => {
            window.framework.reportStatus('Location Changed', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
    });
})();
