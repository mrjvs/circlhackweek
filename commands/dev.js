const db = require("../db.js");
const embedUtils = require("../utils/embedutils.js");

module.exports = {
    name: "test",
    aliases: [],
    description: "no",
    usage: "",
    showInHelp: false,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        const user = (await db.userModel.find({ userId: message.author.id }))[0];
        user.activeQuest = args[0];
        user.save();
        return message.channel.send("success");
    }
}