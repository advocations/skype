declare module jCafe {
    export enum AuthType {
        Password,
        Token,
        Passive,
        ImplicitOAuth,
        Guest,
        Integrated
    }

    interface SignInParameter {
        type: AuthType;
    }

    /** 
     * Password grant authentication.
     * Sends user credentials in plain text.
     * This authentication is useful for testing. 
     */
    interface PasswordSignInParameter extends SignInParameter {
        username: string;
        password: string;
    }

    /** 
     * Integrated OS authentication.
     *
     * In this authentication the client shows a popup where the user enters
     * credentials. This feature isn't supported on all platforms. It's more
     * secure than the basic password authentication because it doesn't send
     * credentials in plain text. 
     */
    interface IntegratedSignInParameter extends SignInParameter {
    }

    /** 
     * The ADFS passive authentication.
     *
     * In this authnetication the user enters credentials on a secure website
     * that issues an access token. The client doesn't have access to the user
     * credentials and usually gets the access token only. 
     */
    interface PassiveSignInParameter extends SignInParameter {
    }

    /** 
     * The implcit grant OAuth2 flow.
     *
     * This authentication is very similar to the passive authentication
     * (the user also enters credentials on a designated website) and it's
     * designed for JS web apps. 
     */
    interface ImplicitOAuthSignInParameter extends SignInParameter {
        /** 
         * This id is obtained on the authorization website: every web app that needs to sign in
         * must first be registered and assigned an id. Later the authorization service may revoke
         * this id if it needs to block the web app. Typically the id looks like a GUID or string
         * of random alphanumeric characters. 
         */
        client_id: string;
    }

    /** The anonymous meeting authentication.
        Used to join online meetings anonymously. */
    interface AnonymousMeetingJoinSignInParameter extends SignInParameter {
        /** The unique identifier of the conference which usually looks like a SIP address.
            Not to be confused with the join URL which is an HTTPS address of a website. */
        conferenceUri: string;
        /** 
         * Typically this is the last part of the conference URI and thus the key can be extracted from the URI.
         * If the owner of the meeting needs to allow only certain audience, the key will be different. If the key
         * is not set, it's assumed that it should be extracted from the URI. 
         */
        conferenceKey: string;
    }

    interface GuestSignInParameter extends SignInParameter {
        /** Guest name */
        displayName: string;
    }

    /** The Skype authentication.
        This authentication method accepts getToken method which should return a valid token at all times. */
    interface TokenSignInParameter extends SignInParameter {
        getToken(): string;
    }

    export interface SignInManager {
        createPasswordSignInParameter(sp: { username: string; password: string }): PasswordSignInParameter;
        createTokenSignInParameter(sp: { token: string }): TokenSignInParameter;
        createImplicitOAuthSignInParameter(sp: { client_id: string }): ImplicitOAuthSignInParameter;
        createGuestSignInParameter(sp: { displayName: string }): GuestSignInParameter;
    }
}