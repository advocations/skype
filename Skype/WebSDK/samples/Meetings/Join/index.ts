/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '/' ? '../../../docs/PTMeetingsAuthJoin.md' : 'Content/websdk/docs/PTMeetingsAuthJoin.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var conversation,
        listeners = [];

    const remoteVidContainerMap: { [displayName: string]: HTMLElement } = {};

    var meetingUri;

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.uri'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.uri')).value = '';
        (<HTMLElement>content.querySelector('.selfVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('.remoteVideoContainers')).innerHTML = '';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
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

        meetingUri = "";
        
        // remove remote video containers and reset mapping
        const containerParentElt = content.querySelector('.remoteVideoContainers');
        Object.keys(remoteVidContainerMap).forEach(participantId => {
            containerParentElt.removeChild(remoteVidContainerMap[participantId]);
            delete remoteVidContainerMap[participantId];
        });

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
        goToStep(1);
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
        (<HTMLInputElement>content.querySelector('.call')).disabled = false;
    }

    window.framework.registerNavigation(reset);
    // window.framework.addEventListener(content.querySelector('.call'), 'click', () => {
    function joinMeeting () {
        window.framework.showNotificationBar();
        if (!(<HTMLInputElement>content.querySelector('.uri')).value) {
            window.framework.addNotification('info', 'Please enter valid conference URI to join');
            return;
        }

        (<HTMLInputElement>content.querySelector('.call')).disabled = true;
        const conversationsManager = window.framework.application.conversationsManager;
        meetingUri = window.framework.updateUserIdInput((<HTMLInputElement>content.querySelector('.uri')).value);
        window.framework.addNotification('info', 'Joining conference...');

        conversation = conversationsManager.getConversationByUri(meetingUri);

        const isActiveSpeakerMode = conversation.videoService.videoMode() == 'ActiveSpeaker';

        setUpListeners();
        startVideoService();

        function setupContainer(videoChannel: jCafe.VideoChannel, videoDiv: HTMLElement) {
            videoChannel.stream.source.sink.format('Stretch');
            videoChannel.stream.source.sink.container(videoDiv);
        }

        function createVideoContainer(labelText: string) {
            var containersDiv = content.querySelector('.remoteVideoContainers');
            var newContainer = document.createElement('div');
            newContainer.className = 'remoteVideoContainer';
            containersDiv.appendChild(newContainer);

            var labelElement = document.createElement('b');
            labelElement.className = 'remoteVideoLabel';
            labelElement.innerHTML = labelText;
            newContainer.appendChild(labelElement);

            return newContainer;
        }

        function showHideVideoContainer(show: boolean, container: HTMLElement) {
            if (container)
                container.style.display = show ? "block" : "none";
        }

        function createAndSetUpContainer(participant: jCafe.Participant) {
            var container = remoteVidContainerMap[participant.person.displayName()] ||
                createVideoContainer(participant.person.displayName());
            remoteVidContainerMap[participant.person.displayName()] = container;
            setupContainer(participant.video.channels(0), container);
        }

        function disposeParticipantContainer(participant: jCafe.Participant) {
            const container = remoteVidContainerMap[participant.person.displayName()];
            if (container) {
                var containerParentElt = content.querySelector('.remoteVideoContainers');
                containerParentElt.removeChild(container);
                delete remoteVidContainerMap[participant.person.displayName()];
            }
        }

        function handleIsVideoOnChangedMV(newState: boolean, oldState: boolean, participant: jCafe.Participant) {
            const nRemoteVids = conversation.participants().filter(p => p.video.channels(0).isVideoOn() == true).length;       
            (<HTMLElement>content.querySelector('#remotevideo')).style.display = 
                nRemoteVids > 0 ? 'block' : 'none';

            const msg = newState ? ' started streaming their video' : ' stopped streaming their video';
            window.framework.addNotification('info', participant.person.displayName() + msg);
            showHideVideoContainer(newState, remoteVidContainerMap[participant.person.displayName()]);
            participant.video.channels(0).isStarted(newState);
        }

        function handleIsVideoOnChangedAS(newState: boolean, activeSpeaker: jCafe.ActiveSpeaker) {
            (<HTMLElement>content.querySelector('#remotevideo')).style.display = newState ? 'block': 'none';
            window.framework.addNotification('info', 'ActiveSpeaker video channel isVideoOn == ' + newState);
            showHideVideoContainer(newState, <HTMLElement>content.querySelector('.remoteVideoContainer'));
            activeSpeaker.channel.isStarted(newState);
        }

        function handleParticipantVideoStateChanged(newState: string, oldState: string, participant: jCafe.Participant) {
            if (newState == "Connected") {
                window.framework.addNotification('info', participant.person.displayName() + ' is connected to video');
                
                // In multiview, listen for added participants, set up a container for each,
                // set up listeners to call isStarted(true/false) when isVideoOn() becomes true/false                                                       
                if (!isActiveSpeakerMode) {
                    createAndSetUpContainer(participant);
                    listeners.push(participant.video.channels(0).isVideoOn.changed((newState, reason, oldState) => {
                        handleIsVideoOnChangedMV(newState, oldState, participant);
                    }));
                }
            } else if (newState == "Disconnected" && oldState == "Connected") {
                window.framework.addNotification('info', participant.person.displayName() + ' has disconnected their video');
                if (!isActiveSpeakerMode) {
                    disposeParticipantContainer(participant);
                }
            }
        }

        function handleConversationStateChanged(newState: string, reason: any, oldState: string) {
            if (newState === 'Disconnected' && (oldState === 'Connected' || oldState === 'Connecting')) {
                window.framework.addNotification('success', 'Conversation ended');
                (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
                (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
                goToStep(3);
                reset(true);
            } else if (newState == 'Connected')
                window.framework.addNotification('success', 'Conversation connected');
        }

        function setUpParticipantListeners() {
            listeners.push(conversation.participants.added(participant => {
                window.framework.addNotification('success', participant.person.displayName() + ' has joined the conversation');
                listeners.push(participant.video.state.changed((newState, reason, oldState) => {
                    handleParticipantVideoStateChanged(newState, oldState, participant)
                }));
            }));
            listeners.push(conversation.participants.removed(participant => {
                window.framework.addNotification('success', participant.person.displayName() + ' has left the conversation');
                if (!isActiveSpeakerMode)
                    disposeParticipantContainer(participant);
            }));
        }

        function setUpListeners () {
            listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
                window.framework.addNotification('info', 'Showing self video...');
                (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'block';
                setupContainer(conversation.selfParticipant.video.channels(0), <HTMLElement>content.querySelector('.selfVideoContainer'));
                window.framework.addNotification('success', 'Connected to video');

                registerControlElements(conversation);
                setUpParticipantListeners();

                // In activeSpeaker mode, set up one container for activeSpeaker channel, and call
                // isStarted(true/false) when channel.isVideoOn() becomes true/false
                if (isActiveSpeakerMode) {
                    var activeSpeaker = conversation.videoService.activeSpeaker;
                    setupContainer(activeSpeaker.channel, createVideoContainer("Active Speaker"));
                    listeners.push(activeSpeaker.channel.isVideoOn.changed(newState => {
                        handleIsVideoOnChangedAS(newState, activeSpeaker);
                    }));
                    listeners.push(activeSpeaker.participant.changed(p => {
                        window.framework.addNotification('info', "ActiveSpeaker has changed to: " + p.person.displayName());
                        var videoLabelElement = content.querySelector('.remoteVideoLabel');
                        videoLabelElement.innerHTML = p.person.displayName();
                    }));
                } 
            }));

            listeners.push(conversation.state.changed((newState, reason, oldState) => {
                handleConversationStateChanged(newState, reason, oldState);
            }));
        }

        function startVideoService () {
            conversation.videoService.start().then(null, error => {
                window.framework.addNotification('error', error);
                if (error.code && error.code == 'PluginNotInstalled') {
                    window.framework.addNotification('info', 'You can install the plugin from:');
                    window.framework.addNotification('info', '(Windows) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeMeetingsApp.msi');
                    window.framework.addNotification('info', '(Mac) https://swx.cdn.skype.com/s4b-plugin/16.2.0.67/SkypeForBusinessPlugin.pkg');
                }
            });
            goToStep(2);
        }
    }

    function endConversation () {
        window.framework.addNotification('info', 'Ending conversation...');
        if (!conversation) {
            reset(true);
            restart();
            return;
        }
        conversation.leave().then(() => {
            window.framework.addNotification('success', 'Conversation ended');
            goToStep(3);
        }, error => {
            window.framework.addNotification('error', error);
        }).then(() => {
            reset(true);
        });
    }

    function registerControlElements(conversation) {
        var audioControl = content.querySelector('.js-toggleSelfAudio'),
            videoControl = content.querySelector('.js-toggleSelfVideo'),
            holdControl = content.querySelector('.js-toggleSelfHold');

        registerToggleAudio(audioControl);
        registerToggleVideo(videoControl);
        registerToggleHold(holdControl);

        function registerToggleAudio(control) {
            var muted = false,
                pastTense,
                action;

            control.onclick = function () {
                muted = !muted;
                
                if (!muted) {
                    control.querySelector('.text').innerHTML = 'Turn Off';
                    pastTense = 'Unmuted';
                    action = 'Unmuting';
                } else {
                    control.querySelector('.text').innerHTML = 'Turn On';
                    pastTense = 'Muted';
                    action = 'Muting';
                }

                conversation.selfParticipant.audio.isMuted.set(muted).then(function () {
                    window.framework.addNotification('success', pastTense + ' self');
                }, function (error) {
                    window.framework.addNotification('error', action + ' failed. See console.');
                    console.error(action + ' self failed', error);
                });
            }
        }

        function registerToggleVideo(control) {
            var isStarted = true,
                pastTense,
                action;

            control.onclick = function () {
                isStarted = !isStarted;
                
                if (!isStarted) {
                    control.querySelector('.text').innerHTML = 'Turn On';
                    pastTense = 'Turned off';
                    action = 'Turning off';
                } else {
                    control.querySelector('.text').innerHTML = 'Turn Off';
                    pastTense = 'Turned on';
                    action = 'Turning on';
                }

                conversation.selfParticipant.video.channels(0).isStarted.set(isStarted).then(function () {
                    window.framework.addNotification('success', pastTense + ' self video');
                }, function (error) {
                    window.framework.addNotification('error', action + ' self video failed. See console.');
                    console.error(action + ' self video failed', error);
                });
            }
        }

        function registerToggleHold(control) {
            var onHold = false,
                pastTense,
                action;

            control.onclick = function () {
                onHold = !onHold;
                
                if (onHold) {
                    control.querySelector('.text').innerHTML = 'Resume';
                    pastTense = 'Put call on hold';
                    action = 'Putting call on hold';
                } else {
                    control.querySelector('.text').innerHTML = 'Hold';
                    pastTense = 'Resumed call';
                    action = 'Resuming call';
                }

                conversation.selfParticipant.audio.isOnHold.set(onHold).then(function () {
                    window.framework.addNotification('success', pastTense);
                }, function (error) {
                    window.framework.addNotification('error', action + ' failed. See console.');
                    console.error(action + ' failed', error);
                });
            }
        }
    }

    function goToStep(step) {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step' + step)).style.display = 'block';
    }

    window.framework.registerNavigation(reset);

    window.framework.addEventListener(content.querySelector('.call'), 'click', joinMeeting);    
    window.framework.addEventListener(content.querySelector('.end'), 'click', endConversation);
    window.framework.addEventListener(content.querySelector('.restart'), 'click', restart);
})();

