const questUtils = require('../questUtils.js');
const utils = require('../utils.js');
const db = require('../db.js')

module.exports = {
    name: "quest",
    aliases: [],
    description: "Command to manage quests",
    usage: ["", "submit"], // $quest and $quest submit
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        if (!args[0]) {
            const user = (await db.userModel.find({ userId: message.author.id }))[0];
            if (typeof user.activeQuest === "undefined") {
                return message.channel.send(utils.sendError("No active quest!"));
            } else {
                return message.channel.send(utils.sendSuccess("Your current quest number is " + user.activeQuest));
            }
        }
        if (args[0] === "submit") {
            return questUtils.checkQuestGoal(message.author.id, message.channel);
        }
        return message.channel.send(utils.sendError("Invalid usage!"));
    }
}
