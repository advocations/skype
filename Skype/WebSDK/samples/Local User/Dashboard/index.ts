/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/LocalUser.md' : 'Content/websdk/docs/LocalUser.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    function reset () {
        (<HTMLElement>content.querySelector('.meDashboard')).style.display = 'none';
        (<HTMLImageElement>content.querySelector('.photo')).src = window.framework.getContentLocation() + 'images/samples/default.png';
        (<HTMLElement>content.querySelector('.name')).innerHTML = '';
        (<HTMLImageElement>content.querySelector('.status')).src = window.framework.getContentLocation() + 'images/samples/status/unknown.png';
        (<HTMLElement>content.querySelector('.noteMessage')).innerHTML = '';
        (<HTMLElement>content.querySelector('.location')).innerHTML = '';
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';
    }

    function getStatusPath (value: string): string {
        const path = window.framework.getContentLocation() + 'images/samples/status/';

        switch (value) {
            case 'Online':
                return path + 'available.png';
            case 'Away':
            case 'BeRightBack':
            case 'IdleOnline':
                return path + 'away.png';
            case 'Busy':
            case 'IdleBusy':
                return path + 'busy.png';
            case 'DoNotDisturb':
                return path + 'do-not-disturb.png';
            default:
                return path + 'unknown.png';
        }
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.get'), 'click', () => {
        const meDashboard = <HTMLElement>content.querySelector('.meDashboard');
        const photo = <HTMLImageElement>content.querySelector('.photo');
        const name = <HTMLElement>content.querySelector('.name');
        const status = <HTMLImageElement>content.querySelector('.status');
        const message = <HTMLElement>content.querySelector('.noteMessage');
        const location = <HTMLElement>content.querySelector('.location');
        meDashboard.style.display = 'block';
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-info-circle';

        const application = window.framework.application;
        const mePerson = application.personsAndGroupsManager.mePerson;
        photo.src = mePerson.avatarUrl();
        window.setTimeout(function (photo: HTMLImageElement) {
            // if the photo isn't set revert back to a default
            if (photo.naturalWidth === 0 || photo.naturalHeight === 0) {
                photo.src = window.framework.getContentLocation() + 'images/samples/default.png';
            }
        }, 1000, photo);

        name.innerHTML = mePerson.displayName();
        status.src = getStatusPath(mePerson.status());
        message.innerHTML = mePerson.note.text();
        location.innerHTML = mePerson.location();
        content.querySelector('.notification-bar').getElementsByTagName('i')[0].className = 'fa fa-thumbs-up';
        content.querySelector('.notification-bar').getElementsByTagName('p')[0].getElementsByTagName('text')[0].innerHTML = 'Dashboard Loaded';
    });
})();
