/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/Video_AddVideo.md' : 'Content/websdk/docs/Video_AddVideo.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        (<HTMLElement>content.querySelector('.selfVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('.remoteVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
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
        window.framework.addNotification('info', 'Sending invitation...');

        listeners.push(conversation.selfParticipant.audio.state.when('Connected', () => {
            window.framework.addNotification('success', 'Connected to audio');
        }));
        listeners.push(conversation.participants.added(person => {
            window.framework.addNotification('success', person.displayName() + ' has joined the conversation');
        }));
        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.addNotification('info', 'Conversation ended');
                (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
                (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
                (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
                (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
                (<HTMLElement>content.querySelector('#step4')).style.display = 'block';
                reset(true);
            }
        }));
        conversation.audioService.start().then(null, error => {
            window.framework.addNotification('error', error);
            if (error.code && error.code == 'PluginNotInstalled') {
                window.framework.addNotification('info', 'You can install the plugin from:');
                window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
            }
        });
        (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        window.framework.addNotification('info', 'Adding video...');

        function setupContainer(person: jCafe.Participant, size: string, videoDiv: HTMLElement) {
            person.video.channels(0).stream.source.sink.format('Stretch');
            person.video.channels(0).stream.source.sink.container(videoDiv);
        }

        listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
            window.framework.addNotification('info', 'Showing self video...');
            (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'block';
            setupContainer(conversation.selfParticipant, 'small', <HTMLElement>content.querySelector('.selfVideoContainer'));
            window.framework.addNotification('success', 'Connected to video');
        }));
        listeners.push(conversation.participants.added(person => {
            listeners.push(person.video.state.when('Connected', () => {
                (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'block';
                setupContainer(person, 'large', <HTMLElement>content.querySelector('.remoteVideoContainer'));

                listeners.push(person.video.channels(0).isVideoOn.when(true, () => {
                    (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'block';
                    window.framework.addNotification('info', person.displayName() + ' started streaming their video');
                }));
                listeners.push(person.video.channels(0).isVideoOn.when(false, () => {
                    (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
                    window.framework.addNotification('info', person.displayName() + ' stopped streaming their video');
                }));
            }));
        }));
        conversation.videoService.start(null, error => {
            window.framework.addNotification('error', error);
            if (error.code && error.code == 'PluginNotInstalled') {
                window.framework.addNotification('info', 'You can install the plugin from:');
                window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
            }
        });
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
        window.framework.addNotification('info', 'Ending conversation...');
        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended');
            (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step4')).style.display = 'block';
        }, error => {
            window.framework.addNotification('error', error);
        }).then(() => {
            reset(true);
        });
    });

    window.framework.addEventListener(content.querySelector('.restart'), 'click', () => {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step4')).style.display = 'none';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
    });
})();