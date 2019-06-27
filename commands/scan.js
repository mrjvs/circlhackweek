const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");
const embedUtils = require("../utils/embedutils.js");

module.exports = {
    name: "scan",
    aliases: ["linked"],
    description: "Scans linked servers of a server",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const server = (await db.serverModel.find({ip: connectedServer}))[0];

        const user = (await db.userModel.find({userId: message.author.id}))[0];

        // reply with linked servers
        if (!server.linked || server.linked.length === 0) return message.channel.send(embedUtils.sendInfo("No linked servers"));
        let out = ""
        for (let i = 0; i < server.linked.length; i++) {
            out += "- " + user.questServerList[server.linked[i]] + "\n"; // TODO show server name
        }
        message.channel.send({
            embed: {
                color: constants.embed_colors.info,
                title: "Linked servers",
                description: out
            }
        });
        
    }
}

