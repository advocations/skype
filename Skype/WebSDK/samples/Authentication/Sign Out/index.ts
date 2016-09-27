/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    window.framework.addEventListener(content.querySelector('.signout'), 'click', () => {
        const application = window.framework.application;
        window.framework.reportStatus('Signing Out...', window.framework.status.info);
        // @snippet
        application.signInManager.signOut().then(() => {
            window.framework.reportStatus('Signed Out', window.framework.status.success);
        }, error => {
            window.framework.reportError(error);
        });
        // @end_snippet
    });
})();
