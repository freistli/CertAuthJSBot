const {
    CloudAdapter,
    ConversationState,
    MemoryStorage,
    UserState,
    ConfigurationBotFrameworkAuthentication
} = require('botbuilder');

class MyBotFrameworkAuthentication extends ConfigurationBotFrameworkAuthentication
{
   
     /**
     * Authenticate Bot Framework Protocol requests to Skills.
     *
     * @param authHeader The http auth header received in the skill request.
     * @returns  {Promise<ClaimsIdentity>} A [ClaimsIdentity](xref:botframework-connector.ClaimsIdentity).
     */
      authenticateChannelRequest(authHeader) {
        const result = super.authenticateChannelRequest(authHeader);
        return result;
    }

    /**
     * Validate Bot Framework Protocol requests.
     *
     * @param activity The inbound Activity.
     * @param authHeader The HTTP auth header.
     * @returns {Promise<AuthenticateRequestResult>} An [AuthenticateRequestResult](xref:botframework-connector.AuthenticateRequestResult).
     */
    authenticateRequest(activity, authHeader) {  
                   
           return super.authenticateRequest(activity,authHeader).then(function(data){
             const claimIdentity = data.claimsIdentity;   
             return data;        
             }  );   
    }

}

module.exports.MyBotFrameworkAuthentication = MyBotFrameworkAuthentication;