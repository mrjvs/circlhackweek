const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");
const achievements = require("../achievements.js");

module.exports = {
    name: "achievements",
    aliases: [],
    description: "Lists the users achievements",
    showInHelp: true,
    signedUpOnly: true,
    execute: async (message, args) => {
        const user = (await db.userModel.find({ userId: message.author.id }))[0];
        let fields = [];
        for (let i = 0; i < user.achievements.length; i++) {
            achievement = achievements.achievements.filter(a => a.id === user.achievements[i])[0];
            fields.push({
                name: achievement.name,
                value: achievement.description,
                inline: true
            });
        }
        return message.channel.send({
            embed: {
                color: constants.embed_colors.info,
                title: message.author.username + "'s achievements",
                fields
            }
        });
    }
}