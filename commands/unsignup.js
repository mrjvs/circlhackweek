const db = require("../db.js");
const embedUtils = require("../utils/embedutils.js");

module.exports = {
    name: "unsignup",
    aliases: [],
    description: "Wipes your user from the database",
    showInHelp: false,
    dmOnly: false,
    needsAdmin: false,
    signedUpOnly: true,
    needsConnection: false,
    execute: async (message, args) => {
        const userId = message.author.id;

        let foundUsers = await db.userModel.find({ userId: userId });
        if (foundUsers.length === 0) {
            message.channel.send(embedUtils.sendError("You don't have an account to delete"));
            return;
        }

        try {
            let questServers = foundUsers[0].questServerList;
            let questServerIps = Object.values(questServers);

            let connectedServerIps = foundUsers[0].serverList.map(server => server.ip);
            let allServerIps = questServerIps.concat(connectedServerIps);

            let userResult = await db.userModel.deleteOne({ userId: userId });
            let serverResult = await db.serverModel.deleteMany({ip: {$in: allServerIps}});

            if (userResult.deletedCount > 0 && serverResult.deletedCount > 0) {
                return message.channel.send(embedUtils.sendSuccess("Your account has been deleted"));
            }
        } catch (err) {
            message.channel.send(embedUtils.sendError("Could not delete your user! :("));
            console.error(err);
        }
    }
}
