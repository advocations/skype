/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/PT_Authentication_Password.md' : 'Content/websdk/docs/PT_Authentication_Password.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.username'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.password'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.username')).value = '';
        (<HTMLInputElement>content.querySelector('.password')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.signin'), 'click', () => {
        const version = config.version;
        const username = (<HTMLInputElement>content.querySelector('.username')).value;
        const password = (<HTMLInputElement>content.querySelector('.password')).value;
        const api = window.framework.api;
        window.framework.reportStatus('Signing In...', window.framework.status.info);
        // @snippet
        const application = api.UIApplicationInstance;
        application.signInManager.signIn({
            version: version,
            username: username,
            password: password
        }).then(() => {
            window.framework.reportStatus('Signed In', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
        window.framework.application = application;
    });
})();
