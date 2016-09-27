declare module jCafe {
    /** A Skype-only feature: a conversation invitation to a non-Skype contact to
        be sent via email. */
    export interface Invitation {
        /** Date when the invitation is created */
        invitationDate: Property<Date>;

        /** 
         * The invitation sender. 
         * The sender is a Person rather than a Participant because this person could leave 
         * the conversation. 
         */
        inviter: Property<Person>;

        /** The email address where this invitation is sent. */
        email: Property<string>;

        /** The first name of the invitee if known. E.g. an invitee can be picked from some directory. */
        firstName: Property<string>;

        /** The last name of the invitee if known. E.g. invitee can be pick from some directory. */
        lastName: Property<string>;

        displayName: Property<string>;

        /** Sends the invitation email to the Email address. This method can be called multiple
            times to resend this invitation. */
        send: Command<() => Promise<void>>;

        /** Revokes the invitation.
            This action can be performed by a conversation leader or the Inviter. */
        revoke: Command<() => Promise<void>>;
    }
}