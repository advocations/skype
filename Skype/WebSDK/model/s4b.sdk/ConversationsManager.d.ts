declare module jCafe {
    export interface ConversationsManager {
        /** 
         * This method finds or creates a conversation with a given SIP URI.
         */
        getConversation(sipUri: string): Conversation;

        /**
         * Schedules a meeting, but doesn't join it.
         * To join ameeting, one can use getConversationByUri.
         */
        createMeeting(): ScheduledMeeting;
    }
}