const db = require("../db.js");
const utils = require("../utils.js");
const constants = require("../constants.js");
const quests = require('../quests.js');
const randomString = require("randomstring");

module.exports = {
    name: "rm",
    aliases: [],
    dmOnly: true,
    signUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const userId = message.author.id;

        let foundUsers = await db.userModel.find({ userId: userId });
        if (foundUsers.length === 0) {
            message.channel.send(utils.sendError("You don't have an account to delete!"));
            return;
        }

        try {
            let count = await db.userModel.deleteOne({ userId });
            if (count > 0) {
                return message.channel.send(utils.sendSuccess("Your account has been deleted!"));
            }
        } catch (err) {
            message.channel.send(utils.sendError("Could not delete your user :("));
            console.error(err);
        }
    }
}
