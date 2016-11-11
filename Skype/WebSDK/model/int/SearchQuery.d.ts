declare module jCafe {
    export interface SearchResult<T> {
        /**
        * collection of name-value pairs of Result properties matched by the search
        * For example, a search for 'ver' in Persons may return a Person object for which
        * Matches would contain pairs ('name', 'Vera Smith'), {'office', 'Denver-1/1010'} 
        */
        matches: { [key: string]: string };
        relevance: Property<number>;
    }

    export interface SearchQuery<T> {
        /** 
         * a list of supported search keywords like 'name', 'since', etc.
         *
         * A supported search keyword is a name of a searchable property of T
         * Ex: Person has DisplayName property. SearchQuery<Person> may expose a supported
         * keyword "DisplayName" which enables searching for Persons by their display name. 
         */
        supportedKeywords: Collection<string>;

        /** keyword:value pairs in the search query
            Example: ("office", "Singapore") in "Joe office:Singapore" */
        keywords: { [key: string]: string };
    
        /** Defines which search scope to use. AddressBook, SkypeDirectory or All */
        sources: Property<Scope>;
    }
}