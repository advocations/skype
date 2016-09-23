declare module jCafe {
    /**
     *  Active speaker of a conversation.
     *
     *  Active speaker defines a video channel which always
     *  holds a stream of an active speaker. It also defines
     *  a property which holds reference to participant model
     *  of current active speaker (can be subscribed to). 
     */
    export interface ActiveSpeaker {

        channel: VideoChannel;

        participant: Property<Participant>
    }

    /** 
     *  Video component of a conversation.
     *
     *  ConversationService::start either adds video to the exisitng
     *  audio call or starts a new outbound audio/video call, i.e. starts
     *  the AudioService as well. Accept and Reject handle the incoming
     *  video invitation. Stop removes the video portion of the AV call.
     *  On Skype it will stop the ScreenSharing service as well. 
     */
    export interface VideoService extends ConversationService {
        /** the active (dominant) speaker in this conversation */
        activeSpeaker: ActiveSpeaker;
    }
}