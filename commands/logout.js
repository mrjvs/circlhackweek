const embedUtils = require("../utils/embedutils.js");
const stateMachine = require('../statemachine.js');

module.exports = {
    name: "logout",
    aliases: [],
    description: "Logs you off a server",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsConnection: true,
    needsAdmin: true,
    execute: (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        stateMachine.clearState(message.author.id, "loginState");
        message.channel.send(embedUtils.sendInfo(`Logged out: ${connectedServer}`));
    }
}