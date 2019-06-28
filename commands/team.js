const questUtils = require("../utils/questutils.js");
const embedUtils = require("../utils/embedutils.js");
const constants = require("../constants.js");
const quests = require("../quests.js");
const db = require("../db.js");

module.exports = {
    name: "team",
    aliases: [],
    description: "Actions regarding hack teams",
    usage: ["", "choose", "choose <team>", "listquests", "quest <id>"],
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    execute: async (message, args) => {
        if (args[0] === "choose") {

            const user = (await db.userModel.find({ userId: message.author.id }))[0];

            if (!args[1]) {
                return message.channel.send({
                    embed: {
                        title: "That is not a valid team",
                        description: "Use `$team invites` to list your invites",
                        color: constants.embed_colors.info
                    }
                });
            }

            if (user.team && user.teamInvites.length === 0) {
                return message.channel.send({
                    embed: {
                        title: "You're already in a team",
                        description: "You are in team: " + quests.teams[user.team].name,
                        color: constants.embed_colors.info
                    }
                });
            }

            if (!quests.teams[args[1]]) {
                return message.channel.send({
                    embed: {
                        title: "That is not a valid team",
                        description: "Use `$team invites` to list your invites",
                        color: constants.embed_colors.info
                    }
                });
            }

            if (!user.teamInvites.includes(args[1])) {
                return message.channel.send({
                    embed: {
                        title: "That is not a valid team",
                        description: "Use `$team invites` to list your invites",
                        color: constants.embed_colors.info
                    }
                });
            }

            user.team = args[1]; // set team
            user.teamInvites = []; // remove other invites

            user.save((err, user) => {
                if (err) {
                    console.error(err);
                    return message.channel.send(embedUtils.sendError("Could not save your user! ☹"));
                }
                return message.channel.send(embedUtils.sendSuccess("You have chosen team: " + quests.teams[user.team].name));
            })
        } else if (args[0] === "listquests") {
            const user = (await db.userModel.find({ userId: message.author.id }))[0];
            if (!user.team) return message.channel.send(embedUtils.sendError("You are not in a team"));
            let filteredQuests = [];
            for (let i = 0; i < quests.teams[user.team].quests.length; i++) {
                let quest = quests.questList[quests.teams[user.team].quests[i]];
                // Only adds quests that have not been completed by the user *and* all of the quests the quest requires have been completed
                if (!user.completedQuests.includes(quests.teams[user.team].quests[i])) {
                    let id = { id: quests.teams[user.team].quests[i], locked: !(!quest.required || quest.required.every(id => user.completedQuests.includes(id)))}
                    filteredQuests.push({ ...quest, ...id });
                }
            }
            let out;
            let fields = [];
            if (filteredQuests.length === 0) {
                out = "No quests to do";
            } else {
                out = "Use `$team quest <id>` to start a quest"
                for (let i = 0; i < filteredQuests.length; i++) {
                    let quest = filteredQuests[i];
                    fields.push({
                        name: `Quest ${quest.id}. ${quest.locked ? "???" : quest.name}`,
                        value: quest.locked ? "???" : quest.description
                    });
                }
            }
            return message.channel.send({
                embed: {
                    title: "Quests to do",
                    description: out,
                    color: constants.embed_colors.info,
                    fields
                }
            });
        } else if (args[0] === "quest") {
            if (!args[1]) {
                return message.channel.send(embedUtils.sendError("You need to specify a quest to do"));
            }

            const user = (await db.userModel.find({ userId: message.author.id }))[0];

            if (!user.team) {
                return message.channel.send(embedUtils.sendError("You need to have joined a team to run this command"));
            }

            const questInput = parseInt(args[1]);

            const team = quests.teams[user.team];
            if (user.completedQuests.includes(questInput)) {
                return message.channel.send(embedUtils.sendError("You've already completed this quest"));
            }

            if (!team.quests.includes(questInput)) {
                return message.channel.send(embedUtils.sendError("That quest doesn't exist"));
            }

            let completedRequired = true;
            const requiredArray = quests.questList[questInput].required;
            if (requiredArray) {
                for (let i = 0; i < requiredArray.length; i++) {
                    if (!user.completedQuests.includes(requiredArray[i])) completedRequired = false;
                }
            }
            if (!completedRequired) {
                return message.channel.send(embedUtils.sendError("You haven't unlocked this quest yet"));
            }

            // apply quest
            message.channel.send(embedUtils.sendSuccess("Applied you to the quest"));
            questUtils.startQuest(message.author.id, questInput, message.channel);
        } else if (args[0] === "invites") {
            const user = (await db.userModel.find({ userId: message.author.id }))[0];
            if (user.teamInvites && user.teamInvites.length > 0) {
                let fields = [];
                for (let i = 0; i < user.teamInvites.length; i++) {
                    fields.push({
                        name: user.teamInvites[i],
                        value: quests.teams[user.teamInvites[i]].description
                    });
                }
                return message.channel.send({
                    embed: {
                        title: "You've got team invites",
                        description: "Choose your team using `$team choose <team>`",
                        fields
                    }
                });
            } else {
                return message.channel.send({
                    embed: {
                        color: constants.embed_colors.warning,
                        description: "You don't have any invites"
                    }
                })
            }
        } else {
            return message.channel.send(embedUtils.sendError("Invalid usage"));
        }
    }
}
