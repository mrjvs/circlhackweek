const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "scan",
    aliases: ["linked"],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const server = (await db.serverModel.find({ip: connectedServer}))[0];

        // reply with linked servers
        if (!server.linked) return message.channel.send("No nearby servers found.");
        let out = "**Linked servers**\n";
        for (let i = 0; i < server.linked.length; i++) {
            out += "- " + server.linked[i] + "\n";
        }
        message.channel.send(out);
        
    }
}

