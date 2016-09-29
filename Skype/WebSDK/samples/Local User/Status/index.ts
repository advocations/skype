/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    let status: string = '';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/LocalUser_Status.md' : 'Content/websdk/docs/LocalUser_Status.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    function reset () {
        (<HTMLInputElement>content.querySelector('.selectedstatus')).value = '';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.set'), 'click', () => {
        const application = window.framework.application;
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Changing Status...';
        const mePerson = application.personsAndGroupsManager.mePerson;
        mePerson.status.set(status).then(() => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Status Changed';
        }, error => {
            content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-down';
            content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = error;
        }).then(reset);
    });

    window.framework.addEventListener(content.querySelector('.online'), 'click', () => {
        status = 'Online';
        (<HTMLInputElement>content.querySelector('.selectedstatus')).value = 'Online';
    });
    window.framework.addEventListener(content.querySelector('.away'), 'click', () => {
        status = 'Away';
        (<HTMLInputElement>content.querySelector('.selectedstatus')).value = 'Away';
    });
    window.framework.addEventListener(content.querySelector('.busy'), 'click', () => {
        status = 'Busy';
        (<HTMLInputElement>content.querySelector('.selectedstatus')).value = 'Busy';
    });
    window.framework.addEventListener(content.querySelector('.brb'), 'click', () => {
        status = 'BeRightBack';
        (<HTMLInputElement>content.querySelector('.selectedstatus')).value = 'BeRightBack';
    });
    window.framework.addEventListener(content.querySelector('.dnb'), 'click', () => {
        status = 'DoNotDisturb';
        (<HTMLInputElement>content.querySelector('.selectedstatus')).value = 'DoNotDisturb';
    });
})();
