/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '/' ? '../../../docs/PTMeetingsAuthJoin.md' : 'Content/websdk/docs/PTMeetingsAuthJoin.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation,
        listeners = [],
        videoMap = {};

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.uri'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.uri')).value = '';
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
        if (!(<HTMLInputElement>content.querySelector('.uri')).value) {
            window.framework.addNotification('info', 'Please enter valid conference URI to join');
            return;
        }

        (<HTMLInputElement>content.querySelector('.call')).disabled = true;
        const conversationsManager = window.framework.application.conversationsManager;
        const uri = window.framework.updateUserIdInput((<HTMLInputElement>content.querySelector('.uri')).value);
        window.framework.addNotification('info', 'Joining conference...');

        conversation = conversationsManager.getConversationByUri(uri);

        function setupContainer(channel: jCafe.VideoChannel, videoDiv: HTMLElement) {
            channel.stream.source.sink.format('Stretch');
            channel.stream.source.sink.container(videoDiv);
        }

        listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
            (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'block';
            setupContainer(conversation.selfParticipant.video.channels(0), <HTMLElement>content.querySelector('.selfVideoContainer'));
            window.framework.addNotification('success', 'Connected to video');

            // In multiview, listen for added participants, set up a container for each,
            // set up listeners to call isStarted(true/false) when isVideoOn() becomes true/false
            if (conversation.videoService.videoMode == 'MultiView') {
                listeners.push(conversation.participants.added(person => {
                    window.framework.addNotification('success', person.displayName() + ' has joined the conversation');

                    listeners.push(person.video.state.when('Connected', () => {
                        if (Object.keys(videoMap).length === 1) {
                            videoMap[person.displayName()] = 2;
                            (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'block';
                            setupContainer(person.video.channels(0), <HTMLElement>content.querySelector('.remoteVideoContainer2'));
                        } else {
                            videoMap[person.displayName()] = 1;
                            (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'block';
                            setupContainer(person.video.channels(0), <HTMLElement>content.querySelector('.remoteVideoContainer1'));
                        }
                        person.video.channels(0).isStarted(true);

                        listeners.push(person.video.channels(0).isVideoOn.when(true, () => {
                            const remoteVideo: number = videoMap[person.displayName()];
                            if (remoteVideo && remoteVideo === 1) {
                                (<HTMLElement>content.querySelector('#remotevideo1')).style.display = 'block';
                            }
                            if (remoteVideo && remoteVideo === 2) {
                                (<HTMLElement>content.querySelector('#remotevideo2')).style.display = 'block';
                            }
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
                            window.framework.addNotification('info', person.displayName() + ' stopped streaming their video');
                        }));
                    }));
                }));
            } 
            // In activeSpeaker mode, set up one container for activeSpeaker channel, and call
            // isStarted(true/false) when channel.isVideoOn() becomes true/false
            else {
                var activeSpeaker = conversation.videoService.activeSpeaker;
                setupContainer(activeSpeaker.channel, <HTMLElement>content.querySelector('.remoteVideoContainer1'));
                listeners.push(activeSpeaker.channel.isVideoOn.when(true, () => {
                    (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'block';
                    window.framework.addNotification('info', 'ActiveSpeaker video channel isVideoOn == true');
                    activeSpeaker.channel.isStarted(true);
                }));
                listeners.push(activeSpeaker.channel.isVideoOn.when(false, () => {
                    (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
                    window.framework.addNotification('info', 'ActiveSpeaker video channel isVideoOn == false');
                    activeSpeaker.channel.isStarted(false);
                }));
                listeners.push(activeSpeaker.participant.changed(p => {
                    window.framework.addNotification('info', 'ActiveSpeaker has changed to: ' + p.displayName());                            
                }));
            }

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

