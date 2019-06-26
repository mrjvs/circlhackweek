const quests = require('./quests.js');
const db = require('./db.js');

async function startQuest(userId, questId, channel) {
    const user = (await db.userModel.find({userId}))[0];

    // get info
    const startText = quests.questList[questId].start.text;
    const attachedServer = user.questServerList[quests.questList[questId].start.linkedServerKey];

    // update active quest
    user.activeQuest = questId;
    await user.save();

    // send info
    channel.send(`**QUEST ${questId}:**\n\n${startText}\n\n**attached server:**\n${attachedServer}`);
}

module.exports = {
    startQuest
}