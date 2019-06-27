const db = require("../db.js");
const constants = require("../constants.js");

module.exports = {
    name: "serverlist",
    aliases: ["servers"],
    description: "Lists all server you've connected to",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args) => {
        const user = (await db.userModel.find({ userId: message.author.id }))[0];
        const serverList = user.serverList;

        // reply with servers
        let out = "";
        for (let i = 0; i < serverList.length; i++) {
            out += `\`${serverList[i].ip}\` - ${serverList[i].name}\n`;
        }

        message.channel.send({
            embed: {
                title: "Server list",
                description: out,
                color: constants.embed_colors.info
            }
        });
    }
}