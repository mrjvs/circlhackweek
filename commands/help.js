const questUtils = require('../questUtils.js');
const utils = require('../utils.js');
const db = require('../db.js')

module.exports = {
    name: "help",
    aliases: [],
    description: "Displays all commands with their usage.",
    showInHelp: false,
    dmOnly: true,
    signedUpOnly: false,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args, commands) => {
        let out = "";
        out += "**HELP DISPLAY** \n";
        for (let i = 0; i < 17; i++) {
            out += " - `" + commands[i].name + "` - " + commands[i].usage + "\n";
        }
        message.channel.send(utils.sendInfo(out));
    }
}