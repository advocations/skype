declare module jCafe {

    export interface Account {

        entitlements: Collection<Entitlement>;

        balance: Property<number>;
        currency: Property<string>;

        send: Command<(recipient: Person, amount: number, currency: string, personalization: string) => Promise<void>>;
    }
}
