declare module jCafe {
    enum TransactionStatus {
        Pending, 
        Succeded,
        Failed,
    }
    
    export interface ConversationActivityItem {
        key: Property<string>;
        isRead: Property<boolean>;
        /** a reflection of .status.reason */
        reason: Property<Reason>;
    }

    export interface VideoMessageActivityItem extends ConversationActivityItem {
        direction: Property<Direction>;
        duration: Property<number>;
        /** it must be available after the participant leaves the conversation */
        sender: Person;
        thumbnailPath: Property<string>;
        thumbnailProgress: Property<number>;
        mediaUrl: Property<string>;
        mediaUrlProgress: Property<number>;
    }    

    /** The extended view to for PictureMessage related activity items */
    export interface PictureMessageActivityItem extends ConversationActivityItem {
        direction: Property<Direction>;
        /** it must be available after the participant leaves the conversation */
        sender: Person;
        thumbnailUrl: Property<string>;
        pictureUrl: Property<string>;
    }

    /** The extended view for ContactInfoMessage related activity items */
    export interface ContactInfoMessageActivityItem extends ConversationActivityItem {
        direction: Property<Direction>;
        sender: Person;
        contacts: Collection<Person>;
    }
    
    export interface TextMessageActivityItem {        
        /** Skype can delete messages */
        isDeleted: Property<boolean>;
         
        /** Skype can edit messages */
        isEdited: Property<boolean>;
    }

    /** Use ActivityType.CallStarted and CallEnded for this activity item and use   
        CallDisconnectionReason values to set Reason.Code */
    export interface CallingActivityItem extends ConversationActivityItem {
        direction: Property<Direction>;
        /** if .type is CallEnded then this is the duration of the call measured in seconds */
        duration: Property<number>;
    }
    
    /** The extended view to for File Transfer related activity items */
    export interface FileTransferActivityItem extends ConversationActivityItem {
        direction: Property<Direction>;
        /** it must be available after the participant sends a file */
        sender: Person;
        /** thumbnail uri */
        fileThumbnailUri: Property<string>;
        /** Name of the file */
        fileName: Property<string>;
        /** Type of the file represented by its extension */
        fileType: Property<string>;
        /** Uri of file on the cloud */
        fileUri: Property<string>;
        /** Size of file in bytes */
        fileSize: Property<number>;
        /** Number of bytes uploaded to the cloud */
        progress: Property<number>;
        /** Flag indicating that uploading process should stop */
        shouldAbort: Property<boolean>;
    }

    /** TODO: this is the current implementataion defined by SWX. This needs rewriting: 
    rename author to initiator and rethink context - use separate interfaces? */
    export interface ParticipantActivityItem extends ConversationActivityItem {
        /** the person who initiated this activity,
            e.g. who is adding participants to a conversation */
        author: Person;
        /** persons affected by this activity,
            e.g. a list of participants added to a conversation */
        persons: Collection<Person>;
        /** 
         * Activity-specific context.
         *   ParticipantRoleUpdate - the role to which participant was updated
         *   ParticipantTopicUpdate - new conversation topic set by participant
         *   ParticipantHistoryDisclosed, ParticipantJoiningEnabled - boolean values 
         *   set by participant. 
         */
        context: Property<string | boolean>;
    }
    
    export interface TransactionMessageActivityItem extends ConversationActivityItem {
        direction: Property<Direction>;
        sender: Person;
        orderId: Property<string>;
        transactionStatus: Property<TransactionStatus>;
        amount: Property<number>;
        currency: Property<string>;
        personalization: Property<string>;
    }
}