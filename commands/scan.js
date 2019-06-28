const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");
const embedUtils = require("../utils/embedutils.js");
const quests = require("../quests")
const achievements = require("../achievements.js");

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
            out += "`" + user.questServerList[server.linked[i]] + "` - " + quests.questServers[server.linked[i]].name + "\n";
        }
        achievements.unlockAchievement(message, "scan");
        message.channel.send({
            embed: {
                color: constants.embed_colors.info,
                title: "Linked servers",
                description: out
            }
        });
        
    }
}

