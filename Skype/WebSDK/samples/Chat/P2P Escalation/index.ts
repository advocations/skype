/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Chat_P2PEscalation.md' : 'Content/websdk/docs/Chat_P2PEscalation.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id2'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.messageToSend'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        (<HTMLInputElement>content.querySelector('.id2')).value = '';
        (<HTMLInputElement>content.querySelector('.messageToSend')).value = '';
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
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';
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
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        const notificationElement = document.createElement('p');
        notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Sending Invitation... </text>';
        content.querySelector('.notification-bar').appendChild(notificationElement);

        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.chat.state.when('Connected', () => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text> Connected to chat </text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
        }));
        listeners.push(conversation.participants.added(person => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text>' + person.displayName() + ' has joined the conversation </text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
        }));
        listeners.push(conversation.chatService.messages.added(item => {
            window.framework.addMessage(item, <HTMLElement>content.querySelector('.messages'));
        }));
        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                const notificationElement = document.createElement('p');
                notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Conversation ended </text>';
                content.querySelector('.notification-bar').appendChild(notificationElement);
                reset(true);
            }
        }));

        conversation.chatService.start().then(null, error => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text>' + error + '</text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
            reset(false);
        });
        (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const id = (<HTMLInputElement>content.querySelector('.id2')).value;
        const notificationElement = document.createElement('p');
        notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Adding Participant ended </text>';
        content.querySelector('.notification-bar').appendChild(notificationElement);
        conversation.participants.add(id).then(() => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text> Participant added </text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
            (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
        }, error => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text>' + error + '</text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
            reset(false);
        });
    });

    window.framework.addEventListener(content.querySelector('.send'), 'click', () => {
        const message = <HTMLInputElement>content.querySelector('.messageToSend');
        conversation.chatService.sendMessage(message.value).then(() => {
            message.value = '';
            (<HTMLElement>content.querySelector('#bimessages')).style.display = 'block';
        });
    });

    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
        const notificationElement = document.createElement('p');
        notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Ending conversation... </text>';
        content.querySelector('.notification-bar').appendChild(notificationElement);
        conversation.leave().then(() => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text> Conversation ended</text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
            (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step4')).style.display = 'block';
            (<HTMLElement>content.querySelector('#bimessages')).style.display = 'none';
        }, error => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text>' + error + '</text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
        }).then(() => {
            reset(true);
        });
    });

    window.framework.addEventListener(content.querySelector('.restart'), 'click', () => {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step4')).style.display = 'none';
        (<HTMLElement>content.querySelector('#bimessages')).style.display = 'none';
    });
})();
