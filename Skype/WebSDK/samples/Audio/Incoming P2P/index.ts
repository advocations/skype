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
        window.framework.hideNotificationBar();
        content.querySelector('.notification-bar').innerHTML = '<br/> <div class="mui--text-subhead"><b>Events Timeline</b></div> <br/>';

        // remove any outstanding event listeners
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].dispose();
        }
        listeners = [];

        inCall = false;
        button.innerHTML = 'Start Listening';

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
        window.framework.addNotification('info', 'Waiting for invitation...');
        listeners.push(conversationsManager.conversations.added(conv => {
            conversation = conv;

            listeners.push(conversation.audioService.accept.enabled.when(true, () => {
                window.framework.showModal('Accept incoming audio invitation?');
                const checkPopupResponse = () => {
                    if (window.framework.popupResponse === 'undefined') {
                        setTimeout(checkPopupResponse, 100);
                    } else {
                        if (window.framework.popupResponse === 'yes') {
                            window.framework.popupResponse = 'undefined';
                            conversation.audioService.accept();

                            listeners.push(conversation.participants.added(participant => {
                                window.framework.addNotification('info', participant.displayName() + 'has been added to the conversation');
                            }));

                            window.framework.addNotification('success', 'Invitation Accepted');
                            button.innerHTML = 'End Call'
                            inCall = true;
                        } else {
                            window.framework.popupResponse = 'undefined';
                            conversation.audioService.reject();
                            window.framework.addNotification('info', 'Invitation Rejected');
                        }
                    }
                }
                checkPopupResponse();
            }));

            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                oldValue && newValue && window.framework.addNotification('info', 'Conversation state changed from ' + oldValue + ' to ' + newValue);

                if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                    window.framework.addNotification('info', 'Conversation ended');
                    reset(true);
                }
            }));
        }));
    }

    function endCall() {
        window.framework.addNotification('info', 'Ending conversation ...');
        conversation.leave().then(() => {
        }, error => {
            window.framework.addNotification('error', error && error.message);
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
