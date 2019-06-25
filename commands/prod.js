const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");
const quests = require("../quests.js")

module.exports = {
    name: "prod",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];
        const ports = server.ports.portList;

        let out = `**PORTS**\nOpen ports required to hack: ${server.ports.requiredAmount}\n\n`;
        for (let i = 0; i < ports.length; i++) {
            out += `**${ports[i].portNumber}** - ${ports[i].portType}\n`;
        }
        return message.channel.send(out);
    }
}