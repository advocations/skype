declare module jCafe {
    export interface ParticipantScreenSharing {
        /** 
         * Screen sharing connection state (either sharing or viewing).  
         *
         * This is the signalling channel state. The media stream state
         * is exposed by MediaStream::state 
         */
        state: Property<CallConnectionState>;

        /** Use stream.source to set up the viewer window */
        stream: MediaStream;

        /** Set this remote participant property to grant/revoke control
            over the local participant's shared screen. */
        isControlling: Property<boolean>;
    }
}
