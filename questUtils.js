const quests = require('./quests.js');
const db = require('./db.js');
const utils = require('./utils.js');

async function startQuest(userId, questId, channel) {
    const user = (await db.userModel.find({userId}))[0];

    // get info
    const startText = quests.questList[questId].start.text;
    const attachedServer = user.questServerList[quests.questList[questId].start.linkedServerKey];

    // update active quest
    user.activeQuest = questId;
    await user.save();

    // send info
    return channel.send(`**QUEST ${questId}:**\n\n${startText}\n\n**attached server:**\n${attachedServer}`);
}

async function checkQuestGoal(userId, channel) {
    const user = (await db.userModel.find({userId}))[0];

    // see if a quest is active
    if (typeof user.activeQuest !== "number") return channel.send("No quest active.");
    const endCondition = quests.questList[user.activeQuest].end.condition;

    if (endCondition.type === "progress") {
        return await endQuest(user.userId, quests.questList[user.activeQuest], channel);
    } else if (endCondition.type === "delete") {
        const server = (await db.serverModel.find({ip: user.questServerList[endCondition.server]}))[0];
        if (!utils.hasFileContent(endCondition.value, server.files)) {
            return await endQuest(user.userId, quests.questList[user.activeQuest], channel);
        }
    }

    // quest not yet completed
    return channel.send("Quest not completed.");
}

async function endQuest(userId, quest, channel) {
    // send text
    const endText = quest.end.text;
    channel.send(`**COMPLETED QUEST:**\n\n${endText}`);

    // give reward
    if (quest.end.next) {
        if (quest.end.next.type === "quest") {
            // start new quest
            return await startQuest(userId, quest.end.next.value, channel);
        }
    }
}

module.exports = {
    startQuest,
    endQuest,
    checkQuestGoal
}