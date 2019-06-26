const utils = require("../utils.js");
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
        stateMachine.clearState(message.author.id, "loginState")
        message.channel.send(utils.sendInfo(`You have logged out of the server with IP ${connectedServer}!`));
    }
}