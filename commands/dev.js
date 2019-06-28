const db = require("../db.js");
const questUtils = require("../utils/questutils.js");
const quests = require("../quests.js");

module.exports = {
    name: "test",
    aliases: [],
    description: "no",
    usage: "",
    showInHelp: false,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        const user = (await db.userModel.find({ userId: message.author.id }))[0];
        if (args[0] === 'complete') {
            questUtils.endQuest(user, quests.questList[user.activeQuest], message.channel);
            return message.channel.send("success");
        }
        user.activeQuest = args[0];
        user.save();
        return message.channel.send("success");
    }
}