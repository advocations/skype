/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/OutgoingP2PAudio.md' : 'Content/websdk/docs/OutgoingP2PAudio.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);


    var conversation,
        listeners = [],
        inCall = false,
        callButton = <HTMLInputElement>content.querySelector('.call');

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.call'));

    function resetUI() {
        callButton.innerHTML = 'Start Audio Call';
        callButton.disabled = false;
    }

    function cleanupConversation() {
        if (conversation.state() !== 'Disconnected') {
            conversation.leave().then(() => {
                conversation = null;
            });
        } else {
            conversation = null;
        }
    }

    function reset(bySample: Boolean) {
        window.framework.hideNotificationBar();
        content.querySelector('.notification-bar').innerHTML = '<br/> <div class="mui--text-subhead"><b>Events Timeline</b></div> <br/>';

        // remove any outstanding event listeners
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].dispose();
        }
        listeners = [];

        inCall = false;

        if (conversation) {
            if (bySample) {
                cleanupConversation();
                resetUI();
            } else {
                const result = window.confirm('Leaving this sample will end the conversation.  Do you really want to leave?');
                if (result) {
                    cleanupConversation();
                    resetUI();
                }

                return result;
            }
        } else {
            resetUI();
        }
    }

    function startCall() {
        const id = (<HTMLInputElement>content.querySelector('.sip')).value;
        const conversationsManager = window.framework.application.conversationsManager;

        if (!id) {
            window.framework.showNotificationBar();
            window.framework.addNotification('error', 'SIP Address is not specified');
            return;
        }

        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.addNotification('success', 'Connected to audio call');
        }));

        listeners.push(conversation.participants.added(person => {
            window.framework.addNotification('info', person.displayName() + ' has joined the conversation');
        }));

        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            oldValue && newValue && window.framework.addNotification('info', 'Conversation state changed from ' + oldValue + ' to ' + newValue);

            if (newValue === 'Connected') {
                callButton.innerHTML = 'End Call';
                inCall = true;
            }
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.addNotification('info', 'Conversation Ended');
                reset(true);
            }
        }));

        window.framework.showNotificationBar();
        window.framework.addNotification('info', 'Sending call invitation ...');
        conversation.audioService.start().then(function () {
            window.framework.addNotification('success', 'Remote party accepted invitation. Call is connected.');
        }, error => {
            window.framework.updateNotification('error', error && error.message);
            if (error.code && error.code == 'PluginNotInstalled') {
                window.framework.addNotification('info', 'You can install the plugin from:');
                window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
            }
        });
    }

    function endCall() {
        window.framework.updateNotification('info', 'Ending conversation ...');

        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended.');
        }, error => {
            window.framework.addNotification('error', error && error.message);
        }).then(() => {
            reset(true);
        });
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(callButton, 'click', () => {
        if (inCall) {
            return endCall();
        }
        startCall();
    });
})();