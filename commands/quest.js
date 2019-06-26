const questUtils = require('../questUtils.js');
const utils = require('../utils.js');

module.exports = {
    name: "quest",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        if (!args[0]) {
            return message.channel.send(utils.sendError("No arguments given!"));
        }
        if (args[0] === "submit") {
            return questUtils.checkQuestGoal(message.author.id, message.channel);
        }
        return message.channel.send(utils.sendError("Invalid usage!"));
    }
}