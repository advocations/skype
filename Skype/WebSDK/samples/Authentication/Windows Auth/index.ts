/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.domain'));

    function reset () {
        (<HTMLInputElement>content.querySelector('.domain')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.signin'), 'click', () => {
        const version = config.version;
        const domain = (<HTMLInputElement>content.querySelector('.domain')).value;
        const api = window.framework.api;
        window.framework.reportStatus('Signing In...', window.framework.status.info);
        // @snippet
        const application = api.UIApplicationInstance;
        application.signInManager.signIn({
            version: version,
            domain: domain
        }).then(() => {
            window.framework.reportStatus('Signed In', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        }).then(reset);
        // @end_snippet
        window.framework.application = application;
    });
})();
