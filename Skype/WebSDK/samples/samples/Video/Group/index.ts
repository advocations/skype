/// <reference path="../../../framework.d.ts" />
(function () {
    'use strict';

    const content = window.framework.findContentDiv();
    var conversation;
    var listeners = [];

    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id'));
    window.framework.bindInputToEnter(<HTMLInputElement>content.querySelector('.id2'));

    function cleanUI () {
        (<HTMLInputElement>content.querySelector('.id')).value = '';
        (<HTMLInputElement>content.querySelector('.id2')).value = '';
        (<HTMLElement>content.querySelector('.videoContainer')).innerHTML = '';
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
        // remove any outstanding event listeners
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].dispose();
        }
        listeners = [];

        if (conversation)
        {
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
        const conversationsManager = window.framework.application.conversationsManager;
        const id = (<HTMLInputElement>content.querySelector('.id')).value;
        const id2 = (<HTMLInputElement>content.querySelector('.id2')).value;
        window.framework.reportStatus('Inviting Participants...', window.framework.status.info);
        // @snippet
        conversation = conversationsManager.createConversation();

        function setupContainer (person: jCafe.Participant, size: string) {
            const div = window.framework.createVideoContainer(<HTMLElement>content.querySelector('.videoContainer'), size, person);
            person.video.channels(0).stream.source.sink.format('Stretch');
            person.video.channels(0).stream.source.sink.container(div);
        }

        listeners.push(conversation.selfParticipant.video.state.when('Connected', () => {
            setupContainer(conversation.selfParticipant, 'large');

            window.framework.reportStatus('Connected to Video', window.framework.status.success);

            listeners.push(conversation.participants.added(person => {
                window.console.log(person.displayName() + ' has joined the conversation');

                listeners.push(person.video.state.when('Connected', () => {
                    setupContainer(person, 'large');

                    person.video.channels(0).isStarted(true);
                }));
            }));
        }));
        listeners.push(conversation.state.changed((newValue, reason, oldValue) => {
            if (newValue === 'Disconnected' && (oldValue === 'Connected' || oldValue === 'Connecting')) {
                window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
                reset(true);
            }
        }));

        conversation.participants.add(id);
        conversation.participants.add(id2);
        conversation.videoService.start().then(null, error => {
            window.framework.reportError(error, reset);
        });
        // @end_snippet
    });
    window.framework.addEventListener(content.querySelector('.end'), 'click', () => {
       window.framework.reportStatus('Ending Conversation...', window.framework.status.info);
        // @snippet
        conversation.leave().then(() => {
            window.framework.reportStatus('Conversation Ended', window.framework.status.reset);
        }, error => {
            window.framework.reportError(error);
        }).then(() => {
            reset(true);
        });
        // @end_snippet
    });
})();
