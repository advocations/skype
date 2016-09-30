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

        window.framework.reportStatus('Sending Invitation...', window.framework.status.info);
        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.reportStatus('Connected to Audio', window.framework.status.success);
        }));

        listeners.push(conversation.participants.added(person => {
            window.console.log(person.displayName() + ' has joined the conversation');
        }));

        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Connected') {
                callButton.innerHTML = 'End Call';
                callButton.disabled = false;
                inCall = true;
            }
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
                reset(true);
            }
        }));

        callButton.innerHTML = 'Connecting Call ...';
        callButton.disabled = true;
        conversation.audioService.start().then(null, error => {
            window.framework.reportError(error, reset);
        });
    }

    function endCall() {
        window.framework.reportStatus('Ending Conversation...', window.framework.status.info);

        conversation.leave().then(() => {
            window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
        }, error => {
            window.framework.reportError(error);
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