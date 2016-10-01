/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/IncomingP2PAudio.md' : 'Content/websdk/docs/IncomingP2PAudio.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [],
        button = <HTMLInputElement>content.querySelector('.registerListeners'),
        inCall = false;

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

        window.framework.updateNotification('success', 'Conversation Ended');
        inCall = false;
        button.innerHTML = 'Listen for incoming invites';

        if (conversation) {
            if (bySample) {
                cleanupConversation();
            } else {
                const result = window.confirm('Leaving this sample will end the conversation.  Do you really want to leave?');
                if (result) {
                    cleanupConversation();
                }

                return result;
            }
        }
    }

    function registerInviteListener() {
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.showNotificationBar();
        window.framework.updateNotification('info', 'Waiting for Invitation...');
        listeners.push(conversationsManager.conversations.added(conv => {
            conversation = conv;

            listeners.push(conversation.audioService.accept.enabled.when(true, () => {
                if (confirm('Accept incoming Audio invitation?')) {
                    conversation.audioService.accept();

                    listeners.push(conversation.participants.added(participant => {
                        console.log('Participant:', participant.displayName(), 'has been added to the conversation');
                    }));

                    window.framework.updateNotification('success', 'Invitation Accepted');
                    button.innerHTML = 'End Call'
                    inCall = true;
                } else {
                    conversation.audioService.reject();
                    window.framework.updateNotification('success', 'Invitation Rejected');
                }
            }));

            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                console.log('Conversation state changed from', oldValue, 'to', newValue);

                if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                    window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
                    reset(true);
                }
            }));
        }));
    }

    function endCall() {
        window.framework.updateNotification('info', 'Ending conversation ...');
        conversation.leave().then(() => {
        }, error => {
            window.framework.updateNotification('error', error && error.message);
        }).then(() => {
            reset(true);
        });
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.registerListeners'), 'click', () => {
        if (inCall) {
            return endCall();
        }

        registerInviteListener();
    });
})();
