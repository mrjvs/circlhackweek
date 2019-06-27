const questUtils = require("../utils/questutils.js");
const embedUtils = require("../utils/embedutils.js");
const constants = require("../constants.js");
const quests = require("../quests.js");
const db = require("../db.js");

module.exports = {
    name: "team",
    aliases: [],
    description: "Actions regarding hack teams",
    usage: ["","choose", "choose <team>", "listquests", "quest <id>"],
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    execute: async (message, args) => {
        // TODO test all of this
        if (args[0] === "choose") {
            if (!args[1]) {
                return message.channel.send(embedUtils.sendError("You need to specify a team to join! Valid teams: " + quests.teams.join(", ")));
            }

            const user = (await db.userModel.find({ userId: message.author.id }))[0];

            if (user.team) {
                return message.channel.send(embedUtils.sendError("You have already joined a team! You are in team: " + quests.teams[user.team].name));
            }

            if (!quests.teams[args[1]]) {
                return message.channel.send(embedUtils.sendError("That is not a valid team! Valid teams: " + quests.teams.join(", ")));
            }

            user.team = args[1];

            user.save((err, user) => {
                if (err) {
                    console.error(err);
                    return message.channel.send(embedUtils.sendError("Could not save your user! :("));
                }
                return message.channel.send(embedUtils.sendSuccess("You have chosen team: " + quests.teams[user.team].name))
            })
        } else if (args[0] === "listquests") {
            const user = (await db.userModel.find({ userId: message.author.id }))[0];
            let filteredQuests = [];
            for (let i = 0; i < quests.teams[user.team].length; i++) {
                // Only adds quests that have not been completed by the user *and* all of the quests the quest requires have been completed
                let quest = quests.questList[quests.teams[user.team][i]];
                if (!user.completedQuests.includes(i) && quest.required && quest.required.every(id => user.completedQuests.includes(id))) {
                    filteredQuests.push(quest);
                }
            }
            if (filteredQuests.length === 0) {
                out = "No quests to do";
            } else {
                for (let i = 0; i < filteredQuests.length; i++) {
                    out += `Quest \`${filteredQuests[i]}\` - ${filteredQuests[i].name}\n`;
                }
            }
            return message.channel.send({
                embed: {
                    title: "Quests to do",
                    description: out,
                    color: constants.embed_colors.info
                }
            });
        } else if (args[0] === "quest") {
            if (!args[1]) {
                return message.channel.send(embedUtils.sendError("You need to specify a quest to do!"));
            }

            const user = (await db.userModel.find({ userId: message.author.id }))[0];

            if (!user.team) {
                return message.channel.send(embedUtils.sendError("You need to have joined a team to run this command!"));
            }
            
            const team = quest.teams[user.team];
            if (user.completedQuests.includes(args[1])) {
                return message.channel.send(embedUtils.sendError("You've already completed this quest!"));
            }

            if (!team.quests.includes(args[1])) {
                return message.channel.send(embedUtils.sendError("That quest doesn't exist!"));
            }

            let completedRequired = true;
            for (let i = 0; i < quests.questList[args[1]].required.length; i++) {
                if (!user.completedQuests.includes(quests.questList[args[1]].required[i])) completedRequired = false;
            }
            if (completedRequired) {
                return message.channel.send(embedUtils.sendError("You haven't unlocked this quest yet!"));
            }

            // apply quest
            message.channel.send(embedUtils.sendSuccess("Applied you to the quest!"));
            questUtils.startQuest(message.author.id, args[1], message.channel);
        }
    }
}
