/// <reference path="../../../framework.d.ts" />
declare var mui: any;
(function () {
    'use strict';
    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Chat_IncomingP2P.md' : 'Content/websdk/docs/Chat_IncomingP2P.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.messageToSend'));

    function cleanUI() {
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
    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const conversationsManager = window.framework.application.conversationsManager;
        (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'block';
        const notificationElement = document.createElement('p');
        notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Waiting for invitation... </text>';
        content.querySelector('.notification-bar').appendChild(notificationElement);
        listeners.push(conversationsManager.conversations.added(conv => {
            conversation = conv;
            listeners.push(conversation.chatService.accept.enabled.when(true, () => {
                // todo
                // // initialize modal element
                // var modalEl = document.createElement('div');
                // modalEl.style.width = '400px';
                // modalEl.style.height = '300px';
                // modalEl.style.margin = '100px auto';
                // modalEl.style.backgroundColor = '#fff';

                // // show modal
                // mui.overlay('on', modalEl);
                const result = confirm('Accept incoming Chat invitation?');
                if (result) {
                    conversation.chatService.accept();
                    listeners.push(conversation.participants.added(person => {
                        const notificationElement = document.createElement('p');
                        notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text>' + person.displayName() + ' has joined the conversation </text>';
                        content.querySelector('.notification-bar').appendChild(notificationElement);
                    }));
                    listeners.push(conversation.chatService.messages.added(item => {
                        window.framework.addMessage(item, <HTMLElement>content.querySelector('.messages'));
                    }));
                    const notificationElement = document.createElement('p');
                    notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Invitation Accepted </text>';
                    content.querySelector('.notification-bar').appendChild(notificationElement);
                    (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#step2')).style.display = 'block';
                } else {
                    conversation.chatService.reject();
                    const notificationElement = document.createElement('p');
                    notificationElement.innerHTML = '<i class="fa fa-thumbs-down"></i> <text> Invitation Rejected </text>';
                    content.querySelector('.notification-bar').appendChild(notificationElement);
                }
            }));
            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                    const notificationElement = document.createElement('p');
                    notificationElement.innerHTML = '<i class="fa fa-info-circle"></i> <text> Conversation ended </text>';
                    content.querySelector('.notification-bar').appendChild(notificationElement);
                    reset(true);
                }
            }));
        }));
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
            notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text> Conversation ended </text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
            (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
            (<HTMLElement>content.querySelector('#bimessages')).style.display = 'none';
        }, error => {
            const notificationElement = document.createElement('p');
            notificationElement.innerHTML = '<i class="fa fa-thumbs-up"></i> <text>' + error + '</text>';
            content.querySelector('.notification-bar').appendChild(notificationElement);
        }).then(function () {
            reset(true);
        });
    });

    window.framework.addEventListener(content.querySelector('.restart'), 'click', () => {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#bimessages')).style.display = 'none';
    });
})();
