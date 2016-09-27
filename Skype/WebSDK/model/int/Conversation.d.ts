declare module jCafe {

    export interface Conversation {
        /** 
         * To add a pending invitation to the converation call this creator and
         * add the new invitation model to PendingInvitations collection.
         * This method is enabled in Skype only.
         *
         * @param inviter - Person who created an invitation.
         * @param email - Email where the invitation is sent.
         * @param firstName - Invitee's first name.
         * @param lastName - Invitee's last name.
         */
        createInvitation(inviter: Person, email: string, firstName: string, lastName: string): Invitation;

        /** Collection of pending invitations. Any participant can add an
            invitation but only a leader can remove it. */
        pendingInvitations: Collection<Invitation>;

        /**
         * It points to a conversation that was created as a result of the escalation from 1:1 to group
         * by adding a participant to the original 1:1 conversation
         *
         * It applies only to the Skype implementation
         * In S4B the escalation just modifies the original conversation
         */
        spawnedConversation: Property<Conversation>;

        /** 
         * A URL of an avatar associated with this conversation. 
         *
         * This may either be a remote URL to a PNG/JPEG picture
         * or a data URL with embedded picture data.
         * Two sets of URLs are provided - one smaller resolution usually used
         * for small avatars across UI and one large resultion used in less common
         * use cases. API is internally responsible to provide proper resolution that
         * will work for both normal and retina displays. 
         */
        avatarUrlSmall: Property<string>;
        avatarUrlLarge: Property<string>;

        screenSharingService: ScreenSharingService;
        fileTransferService: FileTransferService;

        lastModificationTimestamp: Property<Date>;
    }
}