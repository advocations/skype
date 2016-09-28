/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    const updateAuthenticationList = () => {
        const sidebar: Element = document.getElementsByClassName('sidebar')[0];
        const abc: any = sidebar.childNodes[0].childNodes[0].childNodes[0].childNodes[1];
        abc.childNodes[0].removeAttribute('style');
        abc.childNodes[1].removeAttribute('style');
        abc.childNodes[2].removeAttribute('style');
        abc.childNodes[3].removeAttribute('style');
        abc.childNodes[5].style.display = 'none';
        abc.childNodes[6].style.display = 'none';
    }

    window.framework.addEventListener(content.querySelector('.signout'), 'click', () => {
        const application = window.framework.application;
        window.framework.reportStatus('Signing Out...', window.framework.status.info);
        // @snippet
        application.signInManager.signOut().then(() => {
            window.framework.reportStatus('Signed Out', window.framework.status.success);
            updateAuthenticationList();
        }, error => {
            window.framework.reportError(error);
        });
        // @end_snippet
    });
})();
