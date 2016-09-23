declare module jCafe {

    /** An Entitlement represents a service that is available for the logged in user,
        for example a Calling subscription, a PES Package */
    export interface Entitlement {

        name: Property<string>;
    }
}
