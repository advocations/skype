declare module jCafe {

    enum FileUploadState {
        Uploading,
        FileMissing,
        Failed,
        FailedMallwareScan,
        Cancelled,
        Sent
    }

    export interface File {

        /** Fullname of the file including the extension **/
        name: Property<string>;

        /** Size of the file in bytes **/
        size: Property<number>;

        /** The representative icon/thumbnail of the file. **/
        icon: Property<string>;

        /** Progress of the file upload in percentage **/
        progress: Property<number>;

        /** State of the upload **/
        state: Property<FileUploadState>;

        /** Cancel the file upload **/
        cancel: Command<() => Promise<void>>;

        /** Pause the file upload **/
        pause: Command<() => Promise<void>>;

        /** Resume the file upload **/
        resume: Command<() => Promise<void>>;
    }
}