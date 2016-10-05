/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/UseConversationControl.md' : 'Content/websdk/docs/UseConversationControl.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation,
        listeners = [],
        callButton = <HTMLInputElement>content.querySelector('.call'),
        step = 1; // Keep track of what UI section to dislpay

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.sip1'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.sip2'));

    function cleanUI () {
        (<HTMLInputElement>content.querySelector('.sip1')).value = '';
        (<HTMLInputElement>content.querySelector('.sip2')).value = '';
        (<HTMLElement>content.querySelector('.conversationContainer')).innerHTML = '';

        callButton.innerHTML = 'Start Conversation';
        callButton.disabled = false;
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
        content.querySelector('.notification-bar').innerHTML = '<br/> <div class="mui--text-subhead"><b>Events Timeline</b></div> <br/>'

        gotoStep(1);

        // remove any outstanding event listeners
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].dispose();
        }
        listeners = [];

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


    function startCall () {
        const conversationsManager = window.framework.application.conversationsManager;
        const id1 = (<HTMLInputElement>content.querySelector('.sip1')).value;
        const id2 = (<HTMLInputElement>content.querySelector('.sip2')).value;

        var participants = [];
        if (id1 !== '') {
            participants.push(id1);
        }
        if (id2 !== '') {
            participants.push(id2);
        }

        if (!id1 && !id2) {
            window.framework.showNotificationBar();
            window.framework.addNotification('error', 'Must specify at least 1 SIP Address');
            return;
        }

        window.framework.showNotificationBar();

        window.framework.addNotification('info', 'Creating Control...');
        const div = document.createElement('div');
        var control = <HTMLElement>content.querySelector('.conversationContainer');
        control.appendChild(div);
        
        window.framework.api.renderConversation(div, {
            modalities: ['Chat'],
            participants: participants
        }).then(conv => {
            conversation = conv;

            listeners.push(conversation.selfParticipant.chat.state.when('Connected', () => {
                window.framework.addNotification('success', 'Connected to Chat');
            }));

            listeners.push(conversation.participants.added(person => {
                window.framework.addNotification('info', person.displayName() + ' has joined the conversation');
            }));

            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                window.framework.addNotification('info', 'Conversation state changed from ' + oldValue + ' to ' + newValue);

                if (newValue === 'Connected' || newValue == 'Conferenced') {
                    enableInCall();
                }
                if (newValue === 'Disconnected' && (
                        oldValue === 'Connected' || oldValue === 'Connecting' ||
                        oldValue === 'Conferenced' || oldValue ==='Conferencing' )) {
                    window.framework.addNotification('info', 'Conversation disconnected');
                    allowRestart();
                }
            }));

            window.framework.addNotification('success', 'Control Created');
            window.framework.addNotification('info', 'Sending call invitation...');

            conversation.chatService.start().then(function () {
                window.framework.addNotification('success', 'chatService started successfully. Call connected');
            }, error => {
                window.framework.addNotification('error', error && error.message);
            });
        }, error => {
            window.framework.addNotification('error', 'Failed to create conversation control');
        });
    }

    function endCall() {
        window.framework.addNotification('info', 'Ending conversation ...');

        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended.');
        }, error => {
            window.framework.addNotification('error', error && error.message);
        });
    }

    function allowRestart() {
        const resetButton = <HTMLInputElement>content.querySelector('.restart');
        gotoStep(3);

        window.framework.addEventListener(resetButton, 'click', reset);
    }

    function enableInCall() {
        const endCallButton = <HTMLInputElement>content.querySelector('.endCall');        
        gotoStep(2);

        window.framework.addEventListener(endCallButton, 'click', endCall);        
    }

    function gotoStep(n) {
        console.log('step: ' + n);
        disableStep(step);
        step = n;
        enableStep(step);
    }

    function enableStep(n) {
        (<HTMLElement>content.querySelector('#step'+n)).style.display = 'block';
    }

    function disableStep(n) {
        (<HTMLElement>content.querySelector('#step'+n)).style.display = 'none';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(callButton, 'click', startCall);
})();
