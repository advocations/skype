/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/PTVideoGroup.md' : 'Content/websdk/docs/PTVideoGroup.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation,
        listeners = [],
        videoMap = {};

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id2'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        (<HTMLInputElement>content.querySelector('.id2')).value = '';
        (<HTMLElement>content.querySelector('.selfVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('.remoteVideoContainer1')).innerHTML = '';
        (<HTMLElement>content.querySelector('.remoteVideoContainer2')).innerHTML = '';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'none';
        (<HTMLInputElement>content.querySelector('.call')).disabled = false;
    }

    function cleanupConversation() {
        if (conversation && conversation.state() !== 'Disconnected') {
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
        videoMap = {};

        if (conversation) {
            if (bySample) {
                cleanupConversation();
                cleanUI();
            } else {
                const result = window.confirm('Leaving this sample will end the conversation.  Do you really want to leave?');
                if (result) {
                    cleanupConversation();
                    cleanUI();
                    restart();
                }

                return result;
            }
        } else {
            cleanUI();
        }
    }

    function restart() {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'none';
        (<HTMLInputElement>content.querySelector('.call')).disabled = false;
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.call'), 'click', () => {
        window.framework.showNotificationBar();
        if (!(<HTMLInputElement>content.querySelector('.id')).value || !(<HTMLInputElement>content.querySelector('.id2')).value) {
            window.framework.addNotification('info', 'Please enter valid user ids');
            return;
        }

        (<HTMLInputElement>content.querySelector('.call')).disabled = true;
        const conversationsManager = window.framework.application.conversationsManager;
        const id = window.framework.updateUserIdInput((<HTMLInputElement>content.querySelector('.id')).value);
        const id2 = window.framework.updateUserIdInput((<HTMLInputElement>content.querySelector('.id2')).value);
        window.framework.addNotification('info', 'Inviting participants...');
        conversation = conversationsManager.createConversation();

        function setupContainer(person: jCafe.Participant, size: string, videoDiv: HTMLElement) {
            person.video.channels(0).stream.source.sink.format('Stretch');
            person.video.channels(0).stream.source.sink.container(videoDiv);
        }

        listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
            (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'block';
            setupContainer(conversation.selfParticipant, 'large', <HTMLElement>content.querySelector('.selfVideoContainer'));
            window.framework.addNotification('success', 'Connected to video');

            listeners.push(conversation.participants.added(person => {
                window.framework.addNotification('success', person.displayName() + ' has joined the conversation');

                listeners.push(person.video.state.when('Connected', () => {
                    if (Object.keys(videoMap).length === 1) {
                        videoMap[person.displayName()] = 2;
                        (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'block';
                        setupContainer(person, 'large', <HTMLElement>content.querySelector('.remoteVideoContainer2'));
                    } else {
                        videoMap[person.displayName()] = 1;
                        (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'block';
                        setupContainer(person, 'large', <HTMLElement>content.querySelector('.remoteVideoContainer1'));
                    }

                    listeners.push(person.video.channels(0).isVideoOn.when(true, () => {
                        const remoteVideo: number = videoMap[person.displayName()];
                        if (remoteVideo && remoteVideo === 1) {
                            (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'block';
                        }
                        if (remoteVideo && remoteVideo === 2) {
                            (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'block';
                        }
                        person.video.channels(0).isStarted(true);
                        window.framework.addNotification('info', person.displayName() + ' started streaming their video');
                    }));
                    listeners.push(person.video.channels(0).isVideoOn.when(false, () => {
                        const remoteVideo: number = videoMap[person.displayName()];
                        if (remoteVideo && remoteVideo === 1) {
                            (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'none';
                        }
                        if (remoteVideo && remoteVideo === 2) {
                            (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'none';
                        }
                        person.video.channels(0).isStarted(false);                        
                        window.framework.addNotification('info', person.displayName() + ' stopped streaming their video');
                    }));
                }));
            }));
            listeners.push(conversation.participants.removed(person => {
                window.framework.addNotification('info', person.displayName() + ' has left the conversation');
                conversation.participants.size() === 0 && window.framework.addNotification('alert', 'You are the only one in this conversation. You can end this conversation and start a new one.');
            }));
        }));

        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.addNotification('info', 'Conversation ended');
                (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
                (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
                (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'none';
                (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'none';
                (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
                reset(true);
            }
        }));

        conversation.participants.add(id);
        conversation.participants.add(id2);
        conversation.videoService.start().then(null, error => {
            window.framework.addNotification('error', error);
            if (error.code && error.code == 'PluginNotInstalled') {
                window.framework.addNotification('info', 'You can install the plugin from:');
                window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
            }
            reset(true);
        });
        (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'block';
    });

    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
        window.framework.addNotification('info', 'Ending conversation...');
        if (!conversation) {
            reset(true);
            restart();
            return;
        }
        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended');
            (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
        }, error => {
            window.framework.addNotification('error', error);
        }).then(() => {
            reset(true);
        });
    });

    window.framework.addEventListener(content.querySelector('.restart'), 'click', () => {
        restart();
    });
})();
