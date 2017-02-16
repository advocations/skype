namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    // We need this interface so that we can hide the setter of Invitation.RelatedConversation
    internal interface IInvitationWithConversation
    {
        void SetRelatedConversation(Conversation conversation);
    }
}
