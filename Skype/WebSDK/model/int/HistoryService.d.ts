declare module jCafe {
    export interface HistoryService {

        markAllAsRead: Command<() => Promise<void>>;

        /** 
         * When truthy, participants added to conversation later can still
         * see messages from beginning of group conversation.
         * When falsy, only messages since user was added are presented to him/her.
         * It's enabled only for group conversations
         * Will be const false in jLync 
         */
        isHistoryDisclosed: Property<boolean>;

        /** 
         * Removes all messages from conversation from server. 
         */
        removeAll: Command<() => Promise<void>>;

        unreadActivityItemsCount: Property<number>;

        /** 
         * Fetch the next batch of activity items preceeding the earliest item 
         * downloaded by the client.
         * This method can be used for scrolling through conversation history 
         */
        getMoreActivityItems: Command<(count?: number) => Promise<void>>;
    }
}