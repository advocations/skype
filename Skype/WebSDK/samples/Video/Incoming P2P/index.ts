/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '/' ? '../../../docs/PTVideoIncomingP2P.md' : 'Content/websdk/docs/PTVideoIncomingP2P.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation;
    var listeners = [];

    function cleanUI() {
        (<HTMLElement>content.querySelector('.selfVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('.remoteVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
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
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
    }

    window.framework.registerNavigation(reset);
    window.framework.addEventListener(content.querySelector('.add'), 'click', () => {
        const conversationsManager = window.framework.application.conversationsManager;
        window.framework.showNotificationBar();
        window.framework.addNotification('info', 'Waiting for invitation...');

        listeners.push(conversationsManager.conversations.added(conv => {
            conversation = conv;
            function setupContainer(person: jCafe.Participant, size: string, videoDiv: HTMLElement) {
                person.video.channels(0).stream.source.sink.format('Stretch');
                person.video.channels(0).stream.source.sink.container(videoDiv);
            }
            listeners.push(conversation.videoService.accept.enabled.when(true, () => {
                window.framework.showModal('Accept incoming video invitation?');
                const checkPopupResponse = () => {
                    if (window.framework.popupResponse === 'undefined') {
                        setTimeout(checkPopupResponse, 100);
                    } else {
                        if (window.framework.popupResponse === 'yes') {
                            window.framework.popupResponse = 'undefined';
                            conversation.videoService.accept();
                            listeners.push(conversation.participants.added(person => {
                                window.framework.addNotification('success', person.displayName() + ' has joined the conversation');

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
                            window.framework.addNotification('success', 'Invitation accepted');
                        } else {
                            window.framework.popupResponse = 'undefined';
                            conversation.videoService.reject();
                            window.framework.addNotification('error', 'Invitation rejected');
                            reset(true);
                            restart();
                        }
                    }
                }
                checkPopupResponse();
            }));
            listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
                (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'block';
                setupContainer(conversation.selfParticipant, 'small', <HTMLElement>content.querySelector('.selfVideoContainer'));
                window.framework.addNotification('success', 'Connected to video');
            }));
            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                    window.framework.addNotification('info', 'Conversation ended');
                    (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
                    reset(true);
                }
            }));
        }));
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
