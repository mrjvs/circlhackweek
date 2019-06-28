const quests = require('../quests.js');
const db = require('../db.js');
const embedUtils = require('./embedutils.js');
const constants = require('../constants.js');
const achievements = require('../achievements.js');
const randomString = require('randomstring');
const path = require('path');

async function startQuest(userId, questId, channel) {
    const user = (await db.userModel.find({userId}))[0];

    // get info
    const startText = quests.questList[questId].start.text;
    const attachedServer = user.questServerList[quests.questList[questId].start.linkedServerKey];

    // update active quest
    user.activeQuest = questId;
    await user.save();

    // send info

    const fields = attachedServer ? [{name: "Attached server", value: attachedServer}] : undefined;
    channel.send({
        embed: {
            color: constants.embed_colors.info,
            title: `Quest ${user.activeQuest} - ${quests.questList[user.activeQuest].name}`,
            description: startText,
            fields
        }
    });
    if (quests.questList[user.activeQuest].start.tutorial) {
        channel.send(quests.questList[user.activeQuest].start.tutorial());
    }
}

async function checkQuestGoal(userId, channel) {
    const fileUtils = require("./fileutils.js");
    const user = (await db.userModel.find({userId}))[0];

    // see if a quest is active
    if (typeof user.activeQuest !== "number") return channel.send(embedUtils.sendError("No quest active"));
    if (!quests.questList[user.activeQuest].end) return;
    const endCondition = quests.questList[user.activeQuest].end.condition;

    let serverIp;
    if (endCondition.server === "LOCAL") serverIp = user.serverIp;
    else serverIp = user.questServerList[endCondition.server];

    if (endCondition.type === "progress") {
        return await endQuest(user, quests.questList[user.activeQuest], channel);
    } else if (endCondition.type === "delete") {
        const server = (await db.serverModel.find({ip: serverIp }))[0];
        if (!fileUtils.hasFileContent(endCondition.value, server.files)) {
            return await endQuest(user, quests.questList[user.activeQuest], channel);
        }
    } else if (endCondition.type === "present") {
        const server = (await db.serverModel.find({ip: serverIp }))[0];
        if (fileUtils.hasFileContent(endCondition.value, server.files)) {
            return await endQuest(user, quests.questList[user.activeQuest], channel);
        }
    } else if (endCondition.type === "change") {
        const server = (await db.serverModel.find({ip: serverIp }))[0];
        const file = fileUtils.explorePath(server.files, fileUtils.splitPath(path.join(endCondition.file)), "files");
        if (file !== false && file.contents === endCondition.newValue) {
            return await endQuest(user, quests.questList[user.activeQuest], channel);
        }
    }

    // quest not yet completed
    return channel.send(embedUtils.sendError("Quest not completed"));
}

async function endQuest(user, quest, channel) {

    // save completed quest
    user.completedQuests.push(user.activeQuest);
    user.activeQuest = undefined;
    await user.save();


    // send text
    const endText = quest.end.text;
    channel.send({
        embed: {
            color: constants.embed_colors.success,
            title: "Quest completed",
            description: endText,
        }
    });

    // give reward
    if (quest.end.next) {
        if (quest.end.next.type === "quest") {
            // start new quest
            await startQuest(user.userId, quest.end.next.value, channel);
        } else if (quest.end.next.type === "team") {

            if (quest.name === quests.questList[5].name) {
                achievements.unlockAchievement(channel, user.userId, "walkthrough-quests");
            }

            // overwrite invites in user object
            user.teamInvites = quest.end.next.value;
            await user.save();

            let fields = [];
            for (let i = 0; i < quest.end.next.value.length; i++) {
                fields.push({
                    name: quest.end.next.value[i],
                    value: quests.teams[quest.end.next.value[i]].description
                });
            }
            channel.send({
                embed: {
                    title: "You've been given team invites",
                    description: "Choose your team using `$team choose <team>`",
                    fields
                }
            });
        }
    }
    if (quest.end.tutorial) {
        channel.send(quest.end.tutorial());
    }
}

async function createQuestServer(questServer) {
    const ip = await db.serverSchema.statics.generateUniqueIp();
    const fileUtils = require("./fileutils.js");
    return {
        ip,
        name: questServer.name,
        files: fileUtils.parseShortenedFileSystem(questServer.fileSystem),
        ports: questServer.ports,
        serverType: questServer.type,
        linked: questServer.linked ? questServer.linked : [],
        credentials: {
            user: questServer.user ? questServer.user : "root",
            pass: randomString.generate({
                length: 7,
                charset: "alphanumeric"
            })
        }
    }
}

module.exports = {
    startQuest,
    endQuest,
    checkQuestGoal,
    createQuestServer
}