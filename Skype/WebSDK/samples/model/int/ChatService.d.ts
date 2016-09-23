declare module jCafe {

    export interface ChatService {

        /** Alert filters for IM notifications in Skype */
        alertFilters: Collection<string>;

        /** Set/reset this property to enable/disable IM notifications in Skype */
        isAlerting: Property<boolean>;
    }
}