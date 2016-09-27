/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.messageToSend'));

    function cleanUI () {
        (<HTMLInputElement>content.querySelector('.messageToSend')).value = '';
        (<HTMLElement>content.querySelector('.messages')).innerHTML = '';
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
    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.reportStatus('Waiting for Invitation...', window.framework.status.info);
        // @snippet
        listeners.push(conversationsManager.conversations.added(conv => {
            conversation = conv;

            listeners.push(conversation.chatService.accept.enabled.when(true, () => {
                const result = confirm('Accept incoming Chat invitation?');
                if (result) {
                    conversation.chatService.accept();

                    listeners.push(conversation.participants.added(person => {
                        window.console.log(person.displayName() + ' has joined the conversation');
                    }));
                    listeners.push(conversation.chatService.messages.added(item => {
                        window.framework.addMessage(item, <HTMLElement>content.querySelector('.messages'));
                    }));
                    window.framework.reportStatus('Invitation Accepted', window.framework.status.success);
                } else {
                    conversation.chatService.reject();
                    window.framework.reportStatus('Invitation Rejected', window.framework.status.reset);
                }
            }));
            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                    window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
                    reset(true);
                }
            }));
        }));
        // @end_snippet
    });
    window.framework.addEventListener(content.querySelector('.send'), 'click', () => {
        const message = <HTMLInputElement>content.querySelector('.messageToSend');
        conversation.chatService.sendMessage(message.value).then(() => {
            message.value = '';
        });
    });
    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
        window.framework.reportStatus('Ending Conversation...', window.framework.status.info);
        // @snippet
        conversation.leave().then(() => {
            window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
        }, error => {
            window.framework.reportError(error);
        }).then(function () {
            reset(true);
        });
        // @end_snippet
    });
})();
