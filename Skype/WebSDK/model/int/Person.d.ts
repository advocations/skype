declare module jCafe {

    /**
    * Location object with self describing properties that can be empty.
    */
    export interface Location {
        type: Property<LocationType>;
        street: Property<string>;
        city: Property<string>;
        state: Property<string>;
        country: Property<string>;
        postalCode: Property<string>;
    }

    export interface Person {
        firstName: Property<string>;
        lastName: Property<string>;

        /** 
         * Creates the subscription to changes of Person state.
         *
         * Makes the server observe the changes of Person properties and notify the client. This command is needed
         * in Lync where otherwise the server would not know if Person properties have changed in the backing store.
         * In Skype this is a no-op. Lync presence subscriptions are expensive, so the client should call this 
         * command only when it is planning to constantly show the up-to-date view of the Person's online status, 
         * note or location. Otherwise, observing the Person properties guarantees one-time fetch.
         * 
         * A client should keep the returned subscription object and call its Dispose method when the subscription
         * is no longer needed. 
         */
        subscribe(): { dispose: () => void };
        
        /** Moves the contact to the "Blocked" group. */
        isBlocked: Property<boolean>;
    }  
    
    export interface MePerson {
         account: Property<Account>;
    }

    export interface Capabilities {
        screenSharing: Property<boolean>;
        dataCollaboration: Property<boolean>;
    }
}