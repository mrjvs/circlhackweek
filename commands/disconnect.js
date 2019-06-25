const utils = require("../utils.js");
const db = require("../db.js");
const stateMachine = require('../statemachine.js');

module.exports = {
    name: "disconnect",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    execute: (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        if (!connectedServer) {
            return message.channel.send(utils.sendError("You are not connected to a server!"));
        }

        stateMachine.clearState(message.author.id, "connectedServer")
        message.channel.send(utils.sendInfo(`You have disconnected from the server with IP ${connectedServer}!`));
    }
}