const constants = require("./constants.js");
const db = require("./db.js");

const achievements = [
    {
        "id": "rm-all",
        "name": "The all mighty remover",
        "description": "Achieved when you run the command `$rm *`"
    },
    {
        "id": "scan",
        "name": "Scanning the surroundings!",
        "description": "Achieved when you use the scan command to find a nearby machine."
    },
    {
        "id": "walkthrough-quests",
        "name": "Got the hang of this!",
        "description": "Achieved when you complete the walkthrough quests."
    },
    {
        "id": "halfway-there",
        "name": "Woahhh, we're half-way there!",
        "description": "Achieved when you complete half of the story."
    },
    {
        "id": "into-mainframe",
        "name": "Into the mainframe!",
        "description": "Achieved when you locate the main Circl server."
    },
    {
        "id": "the-end",
        "name": "Goodbye, cruel world.",
        "description": "Achieved when you delete `Circl.js`"
    }
];

function getAchievementEmbed(id) {
    let achievement = achievements.filter(achievement => achievement.id === id)[0];
    return {
        embed: {
            color: constants.embed_colors.success,
            title: "Achieved unlocked: " + achievement.name,
            description: achievement.description
        }
    }
}

async function unlockAchievement(channel, userId, id) {
    const user = (await db.userModel.find({ userId }))[0];
    if (!user || achievements.filter(achievement => achievement.id === id).length === 0) return console.error("Someone screwed up 😭");
    if (user.achievements.includes(id)) return;
    user.achievements.push(achievements.filter(achievement => achievement.id === id)[0].id);
    await user.save();
    channel.send(getAchievementEmbed(id));
}

module.exports = {
    unlockAchievement,
    getAchievementEmbed,
    achievements
}