/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.message'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.message')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.set'), 'click', () => {
        const message = (<HTMLInputElement>content.querySelector('.message')).value;
        const application = window.framework.application;
        window.framework.reportStatus('Changing Note...', window.framework.status.info);
        // @snippet
        const mePerson = application.personsAndGroupsManager.mePerson;
        mePerson.note.text.set(message).then(() => {
            window.framework.reportStatus('Note Changed', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
    });
})();
