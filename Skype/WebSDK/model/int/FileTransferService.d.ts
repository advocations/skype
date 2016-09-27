declare module jCafe {
    export interface FileTransferService {

        /** Collection of all Files that the user has started to upload during one session */
        files: Collection<File>;

        /** Send one or multiple files. The file is then added to the files collection **/
        send: Command<(files: File[]) => Promise<void>>;
    }
}