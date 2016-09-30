/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Chat_OutgoingP2P.md' : 'Content/websdk/docs/Chat_OutgoingP2P.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.messageToSend'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.messageToSend2'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        (<HTMLInputElement>content.querySelector('.messageToSend')).value = '';
        (<HTMLInputElement>content.querySelector('.messageToSend2')).value = '';
        (<HTMLElement>content.querySelector('.messages')).innerHTML = '';
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

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.call'), 'click', () => {
        const id = (<HTMLInputElement>content.querySelector('.id')).value;
        const conversationsManager = window.framework.application.conversationsManager;
        conversation = conversationsManager.getConversation(id);
        window.framework.showNotificationBar();

        listeners.push(conversation.selfParticipant.chat.state.when('Connected', () => {
            window.framework.addNotification('fa fa-thumbs-up', 'Connected to Chat');
        }));
        listeners.push(conversation.participants.added(person => {
            window.framework.addNotification('fa fa-thumbs-up', person.displayName() + ' has joined the conversation');
        }));
        listeners.push(conversation.chatService.messages.added(item => {
            window.framework.addMessage(item, <HTMLElement>content.querySelector('.messages'));
        }));
        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.addNotification('fa fa-info-circle', 'Conversation ended');
                reset(true);
            }
        }));
        window.framework.addNotification('fa fa-info-circle', 'Events subscribed');
        (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.send'), 'click', () => {
        const message = <HTMLInputElement>content.querySelector('.messageToSend');
        window.framework.addNotification('fa fa-info-circle', 'Sending invitation...');
        conversation.chatService.sendMessage(message.value).then(() => {
            message.value = '';
            (<HTMLElement>content.querySelector('#outgoingmessages')).style.display = 'block';
        }, error => {
            window.framework.addNotification('fa fa-thumbs-down', error);
        });
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.send2'), 'click', () => {
        const message = <HTMLInputElement>content.querySelector('.messageToSend2');
        conversation.chatService.sendMessage(message.value).then(() => {
            message.value = '';
        });
    });

    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
        window.framework.addNotification('fa fa-info-circle', 'Ending conversation...');
        conversation.leave().then(() => {
            window.framework.addNotification('fa fa-thumbs-up', 'Conversation ended');
            (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step4')).style.display = 'block';
            (<HTMLElement>content.querySelector('#outgoingmessages')).style.display = 'none';
        }, error => {
            window.framework.addNotification('fa fa-thumbs-down', error);
        }).then(function () {
            reset(true);
        });
    });

    window.framework.addEventListener(content.querySelector('.restart'), 'click', () => {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step4')).style.display = 'none';
        (<HTMLElement>content.querySelector('#outgoingmessages')).style.display = 'none';
    });
})();
