/// <reference path="pm.d.ts" />
/// <reference path="Participant.d.ts" />
/// <reference path="ConversationService.d.ts" />

declare module jCafe {
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
        /** 
         *  Number of participants' video streams that can be displayed in
         *  a multiparty call. This is an upper bound defined by the platform
         *  (6 for Lync).
         */
        maxVideos: Property<number>;
    }
}
