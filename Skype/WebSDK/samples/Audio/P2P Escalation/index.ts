/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/P2PEscalation.md' : 'Content/websdk/docs/P2PEscalation.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [],
        inCall = false,
        participantAdded = false,
        callButton = <HTMLInputElement>content.querySelector('.call');

    function cleanUI() {
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
        participantAdded = false;
        callButton.innerHTML = 'Start Audio Call'

        if (conversation) {
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

    function makeCall() {
        const id = (<HTMLInputElement>content.querySelector('.sip')).value;
        const conversationsManager = window.framework.application.conversationsManager;

        if (!id) {
            window.framework.showNotificationBar();
            window.framework.updateNotification('error', 'SIP Address is not specified');
            return;
        }

        window.framework.showNotificationBar();
        window.framework.updateNotification('info', 'Sending Invitation');

        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.updateNotification('success', 'Connected to Audio');
            inCall = true;
            callButton.innerHTML = 'Add participant';
        }));

        listeners.push(conversation.participants.added(person => {
            window.console.log(person.displayName() + ' has joined the conversation');
        }));

        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.updateNotification('success', 'Conversation Ended');
                reset(true);
            }
        }));

        conversation.audioService.start().then(null, error => {
            window.framework.reportError(error, reset);
            window.framework.updateNotification('error', error & error.message);
        });
    }

    function addParticipant() {
        const id = (<HTMLInputElement>content.querySelector('.sip')).value;

        if (!id) {
            window.framework.showNotificationBar();
            window.framework.updateNotification('error', 'SIP Address is not specified');
            return;
        }

        window.framework.updateNotification('info', 'Adding Participant...');
        conversation.participants.add(id).then(() => {
            window.framework.updateNotification('success', 'Participant Added.');
            participantAdded = true;
            callButton.innerHTML = 'End Call';
        }, error => {
            window.framework.reportError(error, reset);
            window.framework.updateNotification('error', error && error.message);
        });
    }

    function endCall() {
        window.framework.updateNotification('info', 'Ending Conversation ...');
        conversation.leave().then(() => {
            window.framework.updateNotification('success', 'Conversation Ended');
        }, error => {
            window.framework.updateNotification('error', error && error.message);
        }).then(() => {
            reset(true);
        });
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(callButton, 'click', () => {
        if (!inCall) {
            return makeCall();
        }

        if (!participantAdded) {
            return addParticipant();
        }

        endCall();
    });
})();