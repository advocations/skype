/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();

    const vm = {
        start: content.querySelector('#start'),
        stop: content.querySelector('#stop'),
        transfer: content.querySelector('#transfer'),
        sipuri: content.querySelector('#to') as HTMLInputElement,
        transferto: content.querySelector('#transfer-to') as HTMLInputElement,
    };

    var conversation;
    var listeners = [];

    content.querySelector('zero-md').setAttribute('file', !window.framework.getContentLocation() ?
        '../../../docs/CallTransfer.md' :
        'Content/websdk/docs/CallTransfer.md');

    function cleanUI () {
        
    }

    function cleanupConversation () {
        if (conversation.state() !== 'Disconnected') {
            conversation.leave().then(() => {
                conversation = null;
            });
        } else {
            conversation = null;
        }
    }

    function reset (bySample: Boolean) {
        window.framework.hideNotificationBar();
        content.querySelector('.notification-bar').innerHTML = '<br/> <div class="mui--text-subhead"><b>Events Timeline</b></div> <br/>';

        // remove any outstanding event listeners
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].dispose();
        }
        listeners = [];

        if (conversation)
        {
            if (bySample) {
                cleanupConversation();
                cleanUI();
            } else {
                const result = window.confirm('Leaving this sample will end the conversation.  Do you really want to leave?');
                if (result) {
                    cleanupConversation();
                    cleanUI();
                }

                return result;
            }
        } else {
            cleanUI();
        }
    }

    window.framework.registerNavigation(reset);



    window.framework.addEventListener(vm.start, 'click', () => {
        const id = vm.sipuri.value;
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.showNotificationBar();
        window.framework.addNotification('info', 'Sending invitation...');
        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.addNotification('success', 'Connected to audio');
        }));
        listeners.push(conversation.participants.added(person => {
            window.framework.addNotification('success', person.displayName() + ' has joined the conversation');
        }));
        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.addNotification('info', 'Conversation Ended');
                reset(true);
            }
        }));

        conversation.audioService.start().then(null, error => {
            window.framework.addNotification('error', error);
            if (error.code && error.code == 'PluginNotInstalled') {
                window.framework.addNotification('info', 'You can install the plugin from:');
                window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
            }
        });
    });

    window.framework.addEventListener(vm.stop, 'click', () => {
       window.framework.addNotification('info', 'Ending conversation');
        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended');
        }, error => {
            window.framework.addNotification('error', error);
        }).then(() => {
            reset(true);
        });
    });

    window.framework.addEventListener(vm.transfer, 'click', () => {
        const target = vm.transferto.value;
        window.framework.addNotification('info', 'Transferring the call...');
        conversation.audioService.transfer(target).then(() => {
            window.framework.addNotification('success', 'Call transferred');
        }, error => {
            window.framework.addNotification('error', error);
        });
    });
})();
