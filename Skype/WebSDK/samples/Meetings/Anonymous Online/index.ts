/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    (<HTMLElement>content.querySelector('.notification-bar')).style.display = 'none';

    const mdFileUrl: string = window.framework.getContentLocation() === '' ? '../../../docs/PTMeetingsAnonJoinOnline.md' : 'Content/websdk/docs/PTMeetingsAnonJoinOnline.md';
    content.querySelector('zero-md').setAttribute('file', mdFileUrl);

    var app;
    var conversation;
    var listeners = [];

    const discoverUrl = "/fake/url/";
    const authToken = "Bearer psat=abcdefg";

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.anon_name'));

    function cleanUI() {
        (<HTMLInputElement>content.querySelector('.anon_name')).value = '';
        (<HTMLElement>content.querySelector('.selfVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('.remoteVideoContainer')).innerHTML = '';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
        (<HTMLInputElement>content.querySelector('.join')).disabled = false;
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
        if (app.signInManager.state() == 'SignedIn') {
            app.signInManager.signOut();
            window.framework.addNotification('info', 'Signed out of anonymous conference');
        }
    }

    function restart() {
        (<HTMLElement>content.querySelector('#step1')).style.display = 'block';
        (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
        (<HTMLElement>content.querySelector('#step3')).style.display = 'none';
        (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
        (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
        (<HTMLInputElement>content.querySelector('.join')).disabled = false;
    }

    function joinMeeting () {
        window.framework.showNotificationBar();
        if (!(<HTMLInputElement>content.querySelector('.anon_name')).value) {
            window.framework.addNotification('info', 'Please enter a name to use for joining the meeting anonymously');
            return;
        }

        (<HTMLInputElement>content.querySelector('.join')).disabled = true;
        const name = (<HTMLInputElement>content.querySelector('.anon_name')).value;
        const conversationsManager = app.conversationsManager;

        window.framework.addNotification('info', 'Attempting to join conference anonymously');

        app.signInManager.signIn({
            name: name,
            cors: true,
            root: { user: discoverUrl },
            auth: function (req, send) {
                // Send token with all requests except for the GET /discover
                if (req.url != discoverUrl)
                    req.headers['Authorization'] = authToken;
                
                return send(req);
            }
        }).then(() => {
            // When joining a conference anonymously, sdk automatically creates
            // a conversation object to represent the conference being joined
            conversation = conversationsManager.conversations(0);

            setUpListeners();
            startVideoService();
        });

        function setupContainer(person: jCafe.Participant, size: string, videoDiv: HTMLElement) {
            person.video.channels(0).stream.source.sink.format('Stretch');
            person.video.channels(0).stream.source.sink.container(videoDiv);
        }

        function setUpListeners () {
            listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
                window.framework.addNotification('info', 'Showing self video...');
                (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'block';
                setupContainer(conversation.selfParticipant, 'small', <HTMLElement>content.querySelector('.selfVideoContainer'));
                window.framework.addNotification('success', 'Connected to video');
            }));

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

            listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
                if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                    window.framework.addNotification('success', 'Conversation ended');
                    (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#selfvideo')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#remotevideo')).style.display = 'none';
                    (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
                    reset(true);
                }
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
            (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step2')).style.display = 'block';
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
            (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
        }, error => {
            window.framework.addNotification('error', error);
        }).then(() => {
            reset(true);
        });
    }

    if (window.framework.application && window.framework.application.signInManager.state() == 'SignedIn') {
        if (confirm('You must sign out of your existing session to anonymously join ' +
                    'a meeting. Sign out now?'))
            window.framework.application.signInManager.signOut();
        else {
            window.framework.addNotification('error', 'Must refresh the page or allow sign ' +
                'out in order to use this sample.');
            (<HTMLElement>content.querySelector('#step1')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step2')).style.display = 'none';
            (<HTMLElement>content.querySelector('#step3')).style.display = 'block';
        }
    }

    app = window.framework.api.UIApplicationInstance;

    window.framework.registerNavigation(reset);

    window.framework.addEventListener(content.querySelector('.join'), 'click', joinMeeting);    
    window.framework.addEventListener(content.querySelector('.end'), 'click', endConversation);
    window.framework.addEventListener(content.querySelector('.restart'), 'click', restart);
})();
