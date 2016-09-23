/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id2'));

    function cleanUI () {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        (<HTMLInputElement>content.querySelector('.id2')).value = '';
        (<HTMLElement>content.querySelector('.conversationContainer')).innerHTML = '';
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
        const conversationsManager = window.framework.application.conversationsManager;
        const id = (<HTMLInputElement>content.querySelector('.id')).value;
        const id2 = (<HTMLInputElement>content.querySelector('.id2')).value;
        var participants = [];
        if (id !== '') {
            participants.push(id);
        }
        if (id2 !== '') {
            participants.push(id2);
        }
        window.framework.reportStatus('Creating Control...', window.framework.status.info);
        const div = document.createElement('div');
        var control = <HTMLElement>content.querySelector('.conversationContainer');
        control.appendChild(div);
        // @snippet
        window.framework.api.renderConversation(div, {
            modalities: ['Chat'],
            participants: participants
        }).then(conv => {
            conversation = conv;
            listeners.push(conversation.selfParticipant.chat.state.when('Connected', () => {
                window.framework.reportStatus('Connected to Chat', window.framework.status.success);
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

            window.framework.reportStatus('Control Created', window.framework.status.success);
        }, error => {
            window.framework.reportError(error, reset);
        });
        // @end_snippet
    });
    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
        window.framework.reportStatus('Ending Conversation...', window.framework.status.info);
        // @snippet
        conversation.leave().then(() => {
            window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
        }, window.framework.reportError).then(() => {
            reset(true);
        });
        // @end_snippet
    });
})();
