// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ConfirmPrompt, DialogSet, DialogTurnStatus, OAuthPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const { LogoutDialog } = require('./logoutDialog');

const { UserProfileDialog, USERPROFILE_DIALOG} = require ('./UserProfileDialog');
const { Channels } = require('botbuilder-core');
const CONFIRM_PROMPT = 'ConfirmPrompt';
const MAIN_DIALOG = 'MainDialog';
const MAIN_WATERFALL_DIALOG = 'MainWaterfallDialog';
const OAUTH_PROMPT = 'OAuthPrompt';

class MainDialog extends LogoutDialog {
    constructor(userState) {
        super(MAIN_DIALOG, process.env.connectionName);

        this.addDialog(new OAuthPrompt(OAUTH_PROMPT, {
            connectionName: process.env.connectionName,
            text: 'Please Sign In',
            title: 'Sign In',
            timeout: 300000
        }));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new UserProfileDialog(userState));
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.promptStep.bind(this),
            this.loginStep.bind(this),
            //this.checkToken.bind(this),
            this.setupUserProfile.bind(this)
            //this.displayTokenPhase1.bind(this),
            //this.displayTokenPhase2.bind(this)
        ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} dialogContext
     */
    async run(context, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(context);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async promptStep(stepContext) {
        return await stepContext.beginDialog(OAUTH_PROMPT);
    }

    async loginStep(stepContext) {
        // Get the token from the previous step. Note that we could also have gotten the
        // token directly from the prompt itself. There is an example of this in the next method.
        const tokenResponse = stepContext.result;
        if (tokenResponse) {
            await stepContext.context.sendActivity('You are now logged in.');
            //return await stepContext.prompt(CONFIRM_PROMPT, 'Would you like to view your token?');
            return await stepContext.prompt(CONFIRM_PROMPT, 'Would you like to configure user profile?');
        }
        await stepContext.context.sendActivity('Login was not successful please try again.');
        return await stepContext.endDialog();
    }

    async checkToken(stepContext) {
        await stepContext.context.sendActivity('Thank you.');

        const result = stepContext.result;
        if (result) {
            
            return await stepContext.beginDialog(OAUTH_PROMPT);
        }
        return await stepContext.endDialog();
    }

    async setupUserProfile(stepContext) {
        const tokenResponse = stepContext.result;
        if (tokenResponse) {
            if(stepContext.context.activity.channelId === Channels.Msteams)
                return await stepContext.beginDialog(USERPROFILE_DIALOG);
            else
            {
                await stepContext.context.sendActivity('It requires Teams Channel');
                return await stepContext.endDialog();
            }
                
        }
        await stepContext.context.sendActivity('Good Bye.');
        return await stepContext.endDialog();
    }

    async displayTokenPhase1(stepContext) {
        await stepContext.context.sendActivity('Thank you.');

        const result = stepContext.result;
        if (result) {
            // Call the prompt again because we need the token. The reasons for this are:
            // 1. If the user is already logged in we do not need to store the token locally in the bot and worry
            // about refreshing it. We can always just call the prompt again to get the token.
            // 2. We never know how long it will take a user to respond. By the time the
            // user responds the token may have expired. The user would then be prompted to login again.
            //
            // There is no reason to store the token locally in the bot because we can always just call
            // the OAuth prompt to get the token or get a new token if needed.
            return await stepContext.beginDialog(OAUTH_PROMPT);
        }
        return await stepContext.endDialog();
    }

    async displayTokenPhase2(stepContext) {
        const tokenResponse = stepContext.result;
        if (tokenResponse) {
            await stepContext.context.sendActivity(`Here is your token ${ tokenResponse.token }`);
        }
        return await stepContext.endDialog();
    }
}

module.exports.MainDialog = MainDialog;
