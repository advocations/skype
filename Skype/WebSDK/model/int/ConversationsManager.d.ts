declare module jCafe {

    export interface ConversationsManager {

        /** 
         *  Fetch the next batch of conversations after the latest item downloaded by the client.
         *
         *  This method can be used for scrolling through recent conversations history.
         *  Note that conversations are received in order how they were updated.
         *  Conversations already received by previous calls will not be received again.
         *  Command will be disabled when there are no more conversation on server available. 
         */
        getMoreConversations: Command<(count?: number) => Promise<void>>;

        unreadConversationsCount: Property<number>;
    }
}