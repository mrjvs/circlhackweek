const embedUtils = require("../utils/embedutils.js");
const stateMachine = require('../statemachine.js');

module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    description: "Disconnects you off a server",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsConnection: true,
    needsAdmin: false,
    execute: (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        stateMachine.clearState(message.author.id, "connectedServer");
        message.channel.send(embedUtils.sendInfo(`Disconnected: ${connectedServer}`));
    }
}