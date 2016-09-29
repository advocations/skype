/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    let status: string = '';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/LocalUser_Status.md' : 'Content/websdk/docs/LocalUser_Status.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    function reset () {
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.set'), 'click', () => {
        // const status = (<HTMLOptionElement>content.querySelector('select option:checked')).value;
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

    window.framework.addEventListener(content.querySelector('.online'), 'click', () => {
        status = 'Online';
        (content.querySelector('.selectedstatus') as any).value = 'Online';
    });
    window.framework.addEventListener(content.querySelector('.away'), 'click', () => {
        status = 'Away';
        (content.querySelector('.selectedstatus') as any).value = 'Away';
    });
    window.framework.addEventListener(content.querySelector('.brb'), 'click', () => {
        status = 'BeRightBack';
        (content.querySelector('.selectedstatus') as any).value = 'BeRightBack';
    });
    window.framework.addEventListener(content.querySelector('.dnb'), 'click', () => {
        status = 'DoNotDisturb';
        (content.querySelector('.selectedstatus') as any).value = 'DoNotDisturb';
    });
})();
