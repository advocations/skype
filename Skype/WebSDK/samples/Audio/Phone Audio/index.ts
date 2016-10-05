/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));

    function cleanUI () {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
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
    window.framework.addEventListener(content.querySelector('.call'), 'click', () => {
        const id = (<HTMLInputElement>content.querySelector('.id')).value;
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.reportStatus('Sending Invitation...', window.framework.status.info);
        // @snippet
        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.reportStatus('Connected to Audio', window.framework.status.success);
        }));
        listeners.push(conversation.participants.added(person => {
            window.console.log(person.displayName() + ' has joined the conversation');
        }));
        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
                reset(true);
            }
        }));

        conversation.audioService.start().then(null, error => {
            window.framework.reportError(error, reset);
        });
        // @end_snippet
    });
    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
       window.framework.reportStatus('Ending Conversation...', window.framework.status.info);
        // @snippet
        conversation.leave().then(() => {
            window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
        }, error => {
            window.framework.reportError(error);
        }).then(() => {
            reset(true);
        });
        // @end_snippet
    });
})();