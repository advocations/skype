/// <reference path="../../../framework.d.ts" />
declare var mui: any;
(function () {
    'use strict';
    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/PT_ConvHistory_Single.md' : 'Content/websdk/docs/PT_ConvHistory_Single.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [];

    function cleanUI() {
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
    window.framework.addEventListener(content.querySelector('.get'), 'click', () => {
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.showNotificationBar();
        window.framework.addNotification('info', 'Fetching conversations...');
        (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
        conversationsManager.getMoreConversations().then(() => {
            // console.log('done')
        });
        window.framework.convNum = 0;
        var i = 0;
        listeners.push(conversationsManager.conversations.added(conv => {
            window.framework.addNotification('success', 'Fetched conversation ' + (window.framework.convNum + 1));
            const div = (<HTMLElement>content.querySelector('#step2'));
            var conv1 = document.createElement('div');
            var yesBtn = document.createElement('span');
            window.framework.convs[window.framework.convNum] = conv;
            yesBtn.innerHTML = '<button class="mui-btn mui-btn--raised mui-btn--primary" onclick="window.framework.invokeHistory(' + i + ')">Get History</button> <br/> <div class="mui-divider"></div>';
            var text = document.createElement('p');
            window.framework.convNum++; i++;
            text.innerHTML = 'Conversation ' + window.framework.convNum;
            text.className = 'mui--text-title';
            conv1.appendChild(text); conv1.appendChild(yesBtn);
            div.appendChild(conv1);
            listeners.push(conv.historyService.activityItems
                .filter(item => item.type() === "TextMessage")
                .added((msg: any) => {
                    window.framework.addNotification('info', msg.sender.id() + ': ' + msg.text());
                }));
        }));
        (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.restart'), 'click', () => {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).innerHTML = '';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        window.framework.hideNotificationBar();
        content.querySelector('.notification-bar').innerHTML = '<br/> <div class="mui--text-subhead"><b>Events Timeline</b></div> <br/>';
        window.framework.convNum = 0;
        window.framework.convs = {};
    });
})();
