/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/ManageDevices.md' : 'Content/websdk/docs/ManageDevices.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    function reset() {
        // (<HTMLElement>content.querySelector('.speakers')).innerHTML = '';
        // (<HTMLElement>content.querySelector('.speakers')).style.display = 'none';
    }

    function addDevice(device, id) {
        device.name.changed(value => {
            const option = document.createElement('option');
            option.value = value;
            option.innerHTML = value;
            content.querySelector('#' + id + 'sSelect').appendChild(option);
        });
    }

    function selectDevice(device, id) {
        if (device) {
            // Should have been done by:
            //      content.querySelector('#' + id + 'sSelect').value = device.name();
            // but 'value' is undefined in the Node/Element interface in TypeScript/lib.d.ts.
            // So we have to remove the option and insert it to the beginning to make it
            // the selected device in the list.
            (<HTMLOptionElement>content.querySelector('#' + id + 'sSelect')).value = device.name();
            window.framework.updateNotification('info', id + ' loading done');
            /*
            const select = content.querySelector('#' + id + 'sSelect');
            const option = select.removeChild(content.querySelector('#' + id + 'sSelect option[value="' + device.name() + '"]'));
            select.insertBefore(option, select.firstChild);
            window.framework.updateNotification('info', id + ' loading done');
            */
        }
    }

    // window.framework.registerNavigation(reset);

    window.framework.updateNotification('info', 'Retrieving device info...');

    const devicesManager = window.framework.application.devicesManager;

    devicesManager.speakers.subscribe();
    devicesManager.speakers.added(speaker => addDevice(speaker, 'speaker'));
    devicesManager.selectedSpeaker.changed(speaker => selectDevice(speaker, 'speaker'));

    devicesManager.microphones.subscribe();
    devicesManager.microphones.added(microphone => addDevice(microphone, 'microphone'));
    devicesManager.selectedMicrophone.changed(microphone => selectDevice(microphone, 'microphone'));

    devicesManager.cameras.subscribe();
    devicesManager.cameras.added(camera => addDevice(camera, 'camera'));
    devicesManager.selectedCamera.changed(camera => selectDevice(camera, 'camera'));

    window.framework.addEventListener(content.querySelector('#set-speaker'), 'click', () => {
        setDevice(devicesManager.speakers, devicesManager.selectedSpeaker, (<HTMLOptionElement>content.querySelector('#speakersSelect Option:checked')).value);
    });
    window.framework.addEventListener(content.querySelector('#set-microphone'), 'click', () => {
        setDevice(devicesManager.microphones, devicesManager.selectedMicrophone, (<HTMLOptionElement>content.querySelector('#microphonesSelect option:checked')).value);
    });
    window.framework.addEventListener(content.querySelector('#set-camera'), 'click', () => {
        setDevice(devicesManager.cameras, devicesManager.selectedCamera, (<HTMLOptionElement>content.querySelector('#camerasSelect option:checked')).value);
    });

    function setDevice(devices, device, option) {
        // reset();
        const filteredDevices = devices.filter(d => d.name() == option);
        if (filteredDevices.size() > 0) {
            device.set(filteredDevices(0)).then(() => {
                window.framework.updateNotification('success', 'Set selected device');
            }).catch(error => {
                window.framework.updateNotification('error', error);
            });
        }
    }
})();
