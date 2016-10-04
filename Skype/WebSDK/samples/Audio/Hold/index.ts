/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Audio_HoldResume.md' : 'Content/websdk/docs/Audio_HoldResume.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);
    
    var conversation,
        listeners = [],
        inCall = false,
        callButton = <HTMLInputElement>content.querySelector('.call'),
        holdButton = <HTMLInputElement>content.querySelector('.hold');

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.call'));

    function resetUI () {
        callButton.innerHTML = 'Start Audio Call';
        holdButton.innerHTML = 'Hold Audio Call';
        holdButton.style.display = 'none';        
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
        content.querySelector('.notification-bar').innerHTML = '<br/> <div class="mui--text-subhead"><b>Events Timeline</b></div> <br/>';

        // remove any outstanding event listeners
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].dispose();
        }
        listeners = [];

        inCall = false;

        if (conversation)
        {
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


    function startCall () {
        const id = (<HTMLInputElement>content.querySelector('.sip')).value;
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.showNotificationBar();
        window.framework.addNotification('info', 'Sending invitation...');
        conversation = conversationsManager.getConversation(id);

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.addNotification('success', 'Connected to audio');
        }));

        listeners.push(conversation.participants.added(person => {
            window.framework.addNotification('success', person.displayName() + ' has joined the conversation');
        }));

        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Connected') {
                callButton.innerHTML = 'End Call';
                callButton.disabled = false;
                inCall = true;
                holdButton.style.display = 'block';
            }
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.addNotification('info', 'Conversation Ended');
                reset(true);
            }
        }));

        callButton.innerHTML = 'Connecting Call ...';
        callButton.disabled = true;
        conversation.audioService.start().then(null, error => {
            window.framework.addNotification('error', error);
            if (error.code && error.code == 'PluginNotInstalled') {
                window.framework.addNotification('info', 'You can install the plugin from:');
                window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
            }
        });
    }

    function holdResumeCall () {
        const selfParticipant = conversation.selfParticipant;
        const audio = selfParticipant.audio;

        const onHold = audio.isOnHold();
        if (!onHold) {
            window.framework.addNotification('info', 'Putting call on hold');

            audio.isOnHold.set(true).then(() => {
                window.framework.addNotification('success', 'Call on hold');
                holdButton.innerHTML = 'Resume Audio Call';
            }, error => {
                window.framework.addNotification('error', error);
                reset(false);
            });
        } else {
            window.framework.addNotification('info', 'Resuming call...');
            
            audio.isOnHold.set(false).then(() => {
                window.framework.reportStatus('Call Resumed', window.framework.status.success);
                holdButton.innerHTML = 'Hold Audio Call';                
            }, error => {
                window.framework.addNotification('error', error);
                reset(false);
            });
        }
    }

    function endCall () {
       window.framework.reportStatus('Ending Conversation...', window.framework.status.info);

        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended');
        }, error => {
            window.framework.addNotification('error', error);
        }).then(() => {
            reset(true);
        });
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.call'), 'click', () => {
        if (inCall) {
            return endCall();
        }
        startCall();
    });
    window.framework.addEventListener(content.querySelector('.hold'), 'click', holdResumeCall)

})();