/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/UseConversationControl.md' : 'Content/websdk/docs/UseConversationControl.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var app = window.framework.application, 
        renderedConversations = [], // Represents **rendered** conversations, changed to 'renderedConversations'
        listeners = [],
        listeningForIncoming = false,
        callButton = <HTMLInputElement>content.querySelector('.call'),
        listenButton = <HTMLInputElement>content.querySelector('.incoming'),
        step = 1; // Keep track of what UI section to dislpay

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.sip1'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.sip2'));
    (<HTMLElement>content.querySelector('#conversationcontrol')).style.display = 'none';

    function cleanUI () {
        (<HTMLInputElement>content.querySelector('.sip1')).value = '';
        (<HTMLInputElement>content.querySelector('.sip2')).value = '';
        (<HTMLElement>content.querySelector('.conversationContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('#conversationcontrol')).style.display = 'none';

        callButton.innerHTML = 'Start Conversation';
        callButton.disabled = false;
    }

    function cleanupConversations() {
        for (const rc of renderedConversations) {
            cleanupConversation(rc);
        }
    }

    function cleanupConversation (conversation) {
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
        listeningForIncoming = false;

        if (renderedConversations.length > 0) {
            if (bySample) {
                cleanupConversations();
                cleanUI();
            } else {
                const result = window.confirm('Leaving this sample will end the conversation.  Do you really want to leave?');
                if (result) {
                    cleanupConversations();
                    cleanUI();
                }

                return result;
            }
        } else {
            cleanUI();
        }
    }


    function startOutgoingCall () {
        const conversationsManager = app.conversationsManager;
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

        createCC({
            participants: participants,
            modalities: ['Chat']
        });
    }

    function listenForIncoming () {
        if (listeningForIncoming)
            return;

        listeningForIncoming = true;

        // Render incoming call with Conversation control
        listeners.push(app.conversationsManager.conversations.added((conv) => {
            var chatState = conv.selfParticipant.chat.state;
            var audioState = conv.selfParticipant.audio.state;
            if (chatState() != 'Notified' && audioState() != 'Notified') {
                listeners.push(chatState.when('Notified', () => startIncomingCall(conv)));
                listeners.push(audioState.when('Notified', () => startIncomingCall(conv)));            
                // This is probably a leftover disconnected conversation; don't render
                // it yet, but listen in case the modalities become Notified again.
                return;
            }
            startIncomingCall(conv);
        }));
    }

    function startIncomingCall(conv) {
        // TODO: Only allow start if not already in 'conversations'
        // Add conv to 'conversations'

        // Options for renderConversation
        var options: any = {}
        var modalities = [];

        if (conv.isGroupConversation()) {
            options.conversationId = conv.uri();
        } else {
            var participants = [];
            participants.push(conv.participants(0).person.id());
            options.participants = participants;
        }
        
        if (conv.selfParticipant.chat.state() == 'Notified') {
            modalities.push('Chat');
        }
        // if (conv.selfParticipant.audio.state() == 'Notified') {
        //     modalities.push('Audio');
        // }
        // if (conv.selfParticipant.video.state() == 'Notified') {
        //     modalities.push('Video')
        // }

        options.modalities = modalities;
        createCC(options);
    }

    function createCC(options) {
        window.framework.showNotificationBar();

        window.framework.addNotification('info', 'Creating Control...');
        const div = document.createElement('div');
        var control = <HTMLElement>content.querySelector('.conversationContainer');
        control.appendChild(div);
        const divider = document.createElement('div');
        divider.className = 'mui-divider';
        control.appendChild(divider);
        (<HTMLElement>content.querySelector('#conversationcontrol')).style.display = 'block';
        
        window.framework.api.renderConversation(div, options).then(conv => {

            listeners.push(conv.selfParticipant.chat.state.when('Connected', () => {
                window.framework.addNotification('success', 'Connected to Chat');
            }));

            listeners.push(conv.participants.added(person => {
                window.framework.addNotification('info', person.displayName() + ' has joined the conversation');
            }));

            listeners.push(conv.state.changed((newValue, reason, oldValue) => {
                window.framework.addNotification('info', 'Conversation state changed from ' + oldValue + ' to ' + newValue);

                if (newValue === 'Connected' || newValue === 'Conferenced') {
                    enableInCall();
                }
                if (newValue === 'Disconnected' && (
                        oldValue === 'Connected' || oldValue === 'Connecting' ||
                        oldValue === 'Conferenced' || oldValue ==='Conferencing' )) {
                    window.framework.addNotification('info', 'Conversation disconnected');
                    allowRestart();
                }
            }));

            // Decide whether to start or accept

            window.framework.addNotification('success', 'Control Created');

            startOrAcceptModalities(conv, options);
        }, error => {
            window.framework.addNotification('error', 'Failed to create conversation control');
        });
    }

    function startOrAcceptModalities(conv, options) {
        const chatState = conv.selfParticipant.chat.state,
            audioState = conv.selfParticipant.audio.state,
            videoState = conv.selfParticipant.video.state;

        if (chatState() == 'Notified' || audioState() == 'Notified') {
            if (chatState() == 'Notified')
                monitor(conv.chatService.accept(), 'chatService', 'accept');
            if (videoState() == 'Notified')
                monitor(conv.videoService.accept(), 'videoService', 'accept');
            else if (audioState() == 'Notified')
                monitor(conv.audioService.accept(), 'audioService', 'accept');
        }
        else {
            if (options.modalities.indexOf('Chat') >= 0) 
                monitor(conv.chatService.start(), 'chatService', 'start');
            if (options.modalities.indexOf('Video') >= 0)
                monitor(conv.videoService.start(), 'videoService', 'start');
            else if (options.modalities.indexOf('Audio') >= 0)
                monitor(conv.audioService.start(), 'audioService', 'start');
        }
    }

    function endCall() {
        window.framework.addNotification('info', 'Ending conversation ...');

        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended.');
            allowRestart();
        }, error => {
            window.framework.addNotification('error', 'End Conversation: ' + error && error.message);
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

    function monitor(dfd, service, method) {
        dfd.then(() => {
                window.framework.addNotification('success', service + ' ' + method + 'ed successfully. Call connected');
            }, error => {
                window.framework.addNotification('error', service + ':' + method + ' - ' + (error ? error.message : 'unknown'));
            });
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(callButton, 'click', startOutgoingCall);
    window.framework.addEventListener(listenButton, 'click', listenForIncoming);
})();
