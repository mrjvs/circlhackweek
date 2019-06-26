const db = require("../db.js");
const utils = require("../utils.js");

module.exports = {
    name: "unsignup",
    aliases: [],
    dmOnly: false,
    needsAdmin: false,
    signedUpOnly: true,
    needsConnection: false,
    execute: async (message, args) => {
        const userId = message.author.id;

        let foundUsers = await db.userModel.find({ userId: userId });
        if (foundUsers.length === 0) {
            message.channel.send(utils.sendError("You don't have an account to delete!"));
            return;
        }

        try {
            let result = await db.userModel.deleteOne({ userId: userId });
            if (result.deletedCount > 0) {
                return message.channel.send(utils.sendSuccess("Your account has been deleted!"));
            }
        } catch (err) {
            message.channel.send(utils.sendError("Could not delete your user :("));
            console.error(err);
        }
    }
}
