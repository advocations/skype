/// <reference path="../common/Application.d.ts" />
/// <reference path="Account.d.ts" />
/// <reference path="ActivityItems.d.ts" />
/// <reference path="ChatService.d.ts" />
/// <reference path="Conversation.d.ts" />
/// <reference path="ConversationsManager.d.ts" />
/// <reference path="Entitlement.d.ts" />
/// <reference path="File.d.ts" />
/// <reference path="FileTransferService.d.ts" />
/// <reference path="Group.d.ts" />
/// <reference path="HistoryService.d.ts" />
/// <reference path="Invitation.d.ts" />
/// <reference path="MarketplaceManager.d.ts" />
/// <reference path="Participant.d.ts" />
/// <reference path="ParticipantScreenSharing.d.ts" />
/// <reference path="Person.d.ts" />
/// <reference path="SearchQuery.d.ts" />
/// <reference path="ScreenSharingService.d.ts" />
/// <reference path="SignInManager.d.ts" />
/// <reference path="VideoService.d.ts" />

declare module jCafe {
    export interface Application {
        /** 
         * Its value becomes `true` once the tab is kicked out.
         * Changing the value back to `false` recreates the tab. 
         * Resuming must be done only after some user activity:
         *
         *      app.suspended.when(true, () => {
         *          console.log('the tab is suspended, waiting for user activity...');
         *      });
         *
         *      window.addEventListener('mousemove', () => {
         *          app.suspended(false); // the user has moved the mouse, hence resuming
         *      });
         *
         * Note, that resuming the session immediately when it
         * gets suspended will likely result in a sort of a DDoS
         * attack on UCWA. So use with care :)
         */
        suspended: Property<boolean>;
    }
}
