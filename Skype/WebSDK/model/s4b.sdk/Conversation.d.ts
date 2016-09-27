declare module jCafe {
    export interface Conversation {
        state: Property<string>;
        /** The participant should then be added to the participants collection */
        createParticipant(sipUri: string): Participant;
    }
}