const utils = require("../utils.js");
const stateMachine = require('../statemachine.js');

module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    dmOnly: true,
    signedUpOnly: true,
    needsConnection: true,
    needsAdmin: false,
    execute: (message, args) => {
        stateMachine.clearState(message.author.id, "connectedServer")
        message.channel.send(utils.sendInfo(`You have disconnected from the server with IP ${connectedServer}!`));
    }
}