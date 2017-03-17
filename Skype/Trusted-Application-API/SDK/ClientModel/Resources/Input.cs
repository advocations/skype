using Microsoft.Rtc.Internal.RestAPI.ResourceModel;
using Microsoft.Rtc.Internal.Platform.ResourceContract;

namespace Microsoft.SfB.PlatformService.SDK.ClientModel
{
    /// <summary>
    /// Base class for all input objects required by SDK
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class IInput<T> where T : Input
    {
        /// <summary>
        /// Converts the input object into corresponding resource in Platorm's ResourceContract
        /// </summary>
        /// <returns></returns>
        internal abstract T ToPlatformInput();
    }

    /// <summary>
    /// Provides all configuration needed to create an adoc meeting
    /// </summary>
    public class AdhocMeetingCreationInput : IInput<AdhocMeetingInput>
    {
        /// <summary>
        /// Subject of the meeting
        /// </summary>
        public string Subject { get; }

        /// <summary>
        /// Defines who all can join the meeting
        /// </summary>
        public AccessLevel AccessLevel { get; }

        /// <summary>
        /// Creates an instance of <see cref="AdhocMeetingCreationInput"/>
        /// </summary>
        /// <param name="subject">Subject of the meeting</param>
        /// <param name="accessLevel"><see cref="AccessLevel"/> deciding who all can join the meeting</param>
        public AdhocMeetingCreationInput(string subject, AccessLevel accessLevel = AccessLevel.Everyone)
        {
            Subject = subject;
            AccessLevel = accessLevel;
        }

        /// <summary>
        /// Converts the object into <see cref="AdhocMeetingInput"/> object
        /// </summary>
        /// <returns><see cref="AdhocMeetingInput"/> object containing all properties of <code>this</code> object.</returns>
        internal override AdhocMeetingInput ToPlatformInput()
        {
            return new AdhocMeetingInput()
            {
                Subject = Subject,
                AccessLevel = this.AccessLevel
            };
        }
    }
}
