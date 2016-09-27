/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.client_id'));

    (<HTMLInputElement>content.querySelector('.reply_url')).value = window.location.href.replace('#', '');

    function reset () {
        (<HTMLInputElement>content.querySelector('.client_id')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.signin'), 'click', () => {
        var client_id = (<HTMLInputElement>content.querySelector('.client_id')).value;
        // @snippet
        window.sessionStorage.setItem('client_id', client_id);

        var href = 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=token&client_id=';
        href += client_id + '&resource=https://webdir.online.lync.com&redirect_uri=' + window.location.href;

        window.location.href = href;
        // @end_snippet
    });
})();