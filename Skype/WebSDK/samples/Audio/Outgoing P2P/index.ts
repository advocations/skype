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
            window.framework.updateNotification('error', 'SIP Address is not specified');
            return;
        }

        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            console.log('Connected to audio call');
        }));

        listeners.push(conversation.participants.added(person => {
            window.console.log(person.displayName() + ' has joined the conversation');
        }));

        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            console.log('Conversation state changed from', oldValue, 'to', newValue);

            if (newValue === 'Connected') {
                callButton.innerHTML = 'End Call';
                inCall = true;
            }
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
                reset(true);
            }
        }));

        window.framework.showNotificationBar();
        window.framework.updateNotification('info', 'Sending call invitation ...');
        conversation.audioService.start().then(function () {
            window.framework.updateNotification('success', 'Remote party accepted invitation. Call is connected.');
        }, error => {
            window.framework.reportError(error, reset);
            window.framework.updateNotification('error', error && error.message);
        });
    }

    function endCall() {
        window.framework.updateNotification('info', 'Ending conversation ...');

        conversation.leave().then(() => {
            window.framework.updateNotification('success', 'Conversation ended.');
        }, error => {
            window.framework.updateNotification('error', error && error.message);
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