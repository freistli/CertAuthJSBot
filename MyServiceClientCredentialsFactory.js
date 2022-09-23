const {
    CertificateAppCredentials,
    ServiceClientCredentialsFactory
} = require('botframework-connector');

const fs = require('fs'); 

class MyServiceClientCredentialsFactory extends ServiceClientCredentialsFactory
{
    constructor() {
        super();        
        this.certKey = fs.readFileSync('c:/temp/selfsign.key').toString();
        this.thumbPrint = '<cert thumbprint>';
      }

      /**
     * Validates an app ID.
     *
     * @param appId The app ID to validate.
     * @returns {Promise<boolean>} The result is true if `appId` is valid for the controller; otherwise, false.
     */
     isValidAppId(appId)
     {
        return true;
     }

      /**
     * Checks whether bot authentication is disabled.
     *
     * @returns {Promise<boolean>} If bot authentication is disabled, the result is true; otherwise, false.
     */
     isAuthenticationDisabled()
     {
        return false;
     }

      /**
     * A factory method for creating ServiceClientCredentials.
     *
     * @param appId The appId.
     * @param audience The audience.
     * @param loginEndpoint The login url.
     * @param validateAuthority The validate authority value to use.
     * @returns {Promise<ServiceClientCredentials>} A [ServiceClientCredentials](xref:botframework-connector.ServiceClientCredentials).
     */
    createCredentials(
        appId,
        audience,
        loginEndpoint,
        validateAuthority
    )
    {
        
        const certificateAppCredentials = new CertificateAppCredentials(appId,
            this.thumbPrint,this.certKey);
        return certificateAppCredentials;
    }
}

module.exports.MyServiceClientCredentialsFactory = MyServiceClientCredentialsFactory;
