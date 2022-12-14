# Bot Authentication

This is a Bot Framework v4 bot authentication sample, shows how to enable Bot App to use certificate to perform bot auth, check token claims in bot cummunication，also includes multiple turns prompts working in WebBot channel, Teams Channel, Bot Emulator. 

Cert Bot Auth logic is in https://github.com/freistli/CertAuthJSBot/blob/main/MyServiceClientCredentialsFactory.js, 

![image](https://user-images.githubusercontent.com/8623897/191971918-745654a9-e8a8-4d1d-b36e-90a16e5778de.png)

To verify claims from clients check https://github.com/freistli/CertAuthJSBot/blob/main/MyBotFrameworkAuthentication.js 

![image](https://user-images.githubusercontent.com/8623897/191972014-1add3a7e-646f-4981-90c2-e79b549e979c.png)


The bot app use Certificate to do Bot App Auth. The test certificate can be self-signed. To create self-signed certificate:

  ```bash
$cert=New-SelfSignedCertificate -Subject "CN=flbutauth" -CertStoreLocation "Cert:\CurrentUser\My"  -KeyExportPolicy Exportable -KeySpec Signature
Export-Certificate -Cert $cert -FilePath "C:\temp\selfsign.cer"  
$mypwd = ConvertTo-SecureString -String "<your password>" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath "C:\temp\selfsign.pfx" -Password $mypwd
```

And then follow this [article](https://helpcenter.gsx.com/hc/en-us/articles/115015887447-Extracting-Certificate-crt-and-PrivateKey-key-from-a-Certificate-pfx-File#:~:text=Creating%20your%20privateKey.key%20file%3A%201%20Return%20to%20the,new%20Notepad%20file%20extension%20to%20.key.%20More%20items)  to get private key file to use in https://github.com/freistli/CertAuthJSBot/blob/main/MyServiceClientCredentialsFactory.js

Don'f forget to upload the self signed certificate to the AAD registered app.

This bot has been created using [Bot Framework](https://dev.botframework.com), it shows how to use authentication in your bot using OAuth too. To set it up, check https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/46.teams-auth 

![image](https://user-images.githubusercontent.com/8623897/191971634-92383393-96f8-400c-ac87-991d4d34f00d.png)


The sample uses the bot authentication capabilities in [Azure Bot Service](https://docs.botframework.com), providing features to make it easier to develop a bot that authenticates users to various identity providers such as Azure AD (Azure Active Directory), GitHub, Uber, etc. 

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14 or higher

    ```bash
    # determine node version
    node --version
    ```

## To try this sample

- Clone the repository

    ```bash
    git clone https://github.com/freistli/CertAuthJSBot.git
    ```

- In a console, navigate to `CertAuthJSBot`

    ```bash
    cd CertAuthJSBot
    ```

- Install modules

    ```bash
    npm install
    ```

- Deploy your bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment)

- [Add Authentication to your bot via Azure Bot Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp)

After Authentication has been configured via Azure Bot Service, you can test the bot.

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the latest Bot Framework Emulator from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Interacting with the bot

This sample uses bot authentication capabilities in Azure Bot Service, providing features to make it easier to develop a bot that authenticates users to various identity providers such as Azure AD (Azure Active Directory), GitHub, Uber, etc. These updates also take steps towards an improved user experience by eliminating the magic code verification for some clients.

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

## Further reading

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Azure Portal](https://portal.azure.com)
- [Add Authentication to Your Bot Via Azure Bot Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [.NET Core CLI tools](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)
