const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "serverlist",
    aliases: ["servers"],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        const user = (await db.userModel.find({userId: message.author.id}))[0];
        const serverList = user.serverList;
        const ips = Object.keys(serverList);

        // reply with servers
        let out = "Server list:\n";
        for (let i = 0; i < ips.length; i++) {
            out += `**${ips[i]}** - ${serverList[ips[i]]}\n`;
        }
        message.channel.send(out);
    }
}