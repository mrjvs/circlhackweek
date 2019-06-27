const questUtils = require('../questUtils.js');
const quests = require("../quests.js");
const constants = require("../constants.js");
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
                return message.channel.send(utils.sendInfo("No active quest!"));
            } else {
                const attachedServer = user.questServerList[quests.questList[user.activeQuest].start.linkedServerKey];
                const fields = attachedServer ? [{name: "Attached server", value: attachedServer}] : undefined;
                return message.channel.send({
                    embed: {
                        color: constants.embed_colors.info,
                        title: `Quest ${user.activeQuest} - ${quests.questList[user.activeQuest].name}`,
                        description: quests.questList[user.activeQuest].start.text + "\n\nIf you are finished doing this quest, run `$quest submit`",
                        fields
                    }
                });
            }
            // TODO $quest <num> + $quest list
        }
        if (args[0] === "submit") {
            return questUtils.checkQuestGoal(message.author.id, message.channel);
        }
        if (args[0] === "list") {
            const user = (await db.userModel.find({ userId: message.author.id }))[0];

            // reply with quests
            let out = "";
            if (user.completedQuests.length === 0) {
                out = "No quests completed yet";
            } else {
                for (let i = 0; i < user.completedQuests.length; i++) {
                    out += `\`quest ${user.completedQuests[i]}\` - ${quests.questList[user.completedQuests[i]].name}\n`;
                }
            }
            return message.channel.send({
                embed: {
                    title: "Completed quests",
                    description: out,
                    color: constants.embed_colors.info
                }
            });
        }
        return message.channel.send(utils.sendError("Invalid usage!"));
    }
}
