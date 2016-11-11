declare module jCafe {
    enum SharedResourceType {
        Desktop,
        Application,
        Window
    }

    export interface SharedResource {
        type: Property<SharedResourceType>;
        id: Property<string>;
    }

    // TODO: where do shareable resources come from?  

    /** 
     * Screen sharing service of a conversation
     *
     * ::start starts sharing.
     * ::accept and ::reject handle the incoming session.
     * ::accept starts viewing.
     * ::stop will terminate the ongoing session. 
     */
    export interface ScreenSharingService extends ConversationService {
        /** Who is currently sharing? */
        sharer: Property<Participant>;

        /** What is being shared? */
        sharedResources: Collection<SharedResource>;

        /** Who is controlling the sharer's screen? */
        controller: Property<Participant>;

        /** Who is requesting control? */
        controlRequesters: Collection<Participant>;

        /** Request control over the sharer's screen. */
        requestControl: Command<() => Promise<void>>;

        /** Release control over the sharer's screen. */
        releaseControl: Command<() => Promise<void>>;

        /** Accept sharing control request */
        acceptControlRequest: Command<(person: Person) => Promise<void>>;

        /** Decline sharing control request */
        rejectControlRequest: Command<(person: Person) => Promise<void>>;
    }
}