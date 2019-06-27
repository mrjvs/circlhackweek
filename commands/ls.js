const fileUtils = require("../utils/fileutils.js");
const embedUtils = require("../utils/embedutils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");

module.exports = {
    name: "ls",
    aliases: [],
    description: "Lists the files inside any directory",
    usage: ["", "<target_directory>"],
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        const server = (await db.serverModel.find({ip: connectedServer}))[0];

        // parse inputted path
        const pathInput = args[0] ? args[0] : ".";
        const finalPath = path.join(pathState, pathInput);
        const pathParts = fileUtils.splitPath(finalPath);

        // get file
        const file = fileUtils.explorePath(server.files, pathParts, "files");
        if (file === false) {
            return message.channel.send(embedUtils.sendError(constants.response_text.invalid_path));
        }
        if (file.type === "file") {
            return message.channel.send(embedUtils.sendError(file.name + constants.response_text.not_dir));
        }

        // reply with dir contents
        let out = "```\n";
        out += "* .\n"
        out += "* ..\n";
        for (let i = 0; i < file.contents.length; i++) {
            out += "* " + file.contents[i].name + "\n";
        }
        out += "```";
        message.channel.send({
            embed: {
                color: constants.embed_colors.info,
                title: finalPath === path.sep ? "root" : finalPath,
                description: out
            }
        });

    }
}
