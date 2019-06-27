const constants = require("./constants.js");
const db = require("./db.js");

const achievements = [
    {
        "id": "rm-all",
        "name": "The all mighty remover",
        "description": "Achieved when you run the command `$rm *`"
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

async function unlockAchievement(message, id) {
    const user = (await db.userModel.find({ userId: message.author.id }))[0];
    if (!user || achievements.filter(achievement => achievement.id === id).length === 0) return console.error("Someone screwed up 😭");
    if (user.achievements.includes(id)) return;
    user.achievements.push(achievements.filter(achievement => achievement.id === id)[0].id);
    await user.save();
    message.channel.send(getAchievementEmbed(id));
}

module.exports = {
    unlockAchievement,
    getAchievementEmbed
}