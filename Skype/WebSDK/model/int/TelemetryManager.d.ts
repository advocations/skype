declare module jCafe {
   export enum PIIType{
        NotSet,
        DistinguishedName,
        GenericData,
        IPV4Address,
        IPv6Address,
        MailSubject,
        PhoneNumber,
        QueryString,
        SipAddress,
        SmtpAddress,
        Identity,
        Uri,
        Fqdn
    }

    /**
     * Telemetry manager allows to convert your own event to Aria event
     * and send it to Aria.
     *
     * Uses external aria web telemetry library
     *
     *  Usage:
     *    Initialization on application load:
     *     var telemetryManager = new TelemetryManager();
     *     telemetryManager.setCommonProperty('username', getUsername, PIIType.Identity);
     *
     *    In code:
     *    telemetryManager.sendEvent('edr1g5d41d5d4gr', 'ui_action', {actionName: 'click', ipAddress: ['122.122.123.122', PIIType.IPV4Address] );
     */
    type PropertyValue = string | number | boolean;

    export interface TelemetryManager {

        setCommonProperty(name: string, value : PropertyValue |(()=> PropertyValue), PIIType?: PIIType)

        sendEvent(tenantId: string, eventName: string, properties : {[index: string]: PropertyValue |[PropertyValue, PIIType]});

    }
}