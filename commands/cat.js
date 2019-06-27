const embedUtils = require("../utils/embedutils.js");
const fileUtils = require("../utils/fileutils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");

module.exports = {
    name: "cat",
    aliases: [],
    description: "Shows the contents of a file",
    usage: "<file_name>",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        if (args.length !== 1) {
            return message.channel.send(embedUtils.sendError("You need to enter the file name"));
        }

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];

        const pathInput = args[0];
        const newPath = path.join(pathState, pathInput);

        const file = fileUtils.explorePath(server.files, fileUtils.splitPath(newPath), "files");
        if (!file) {
            return message.channel.send(embedUtils.sendError(constants.response_text.invalid_path));
        } else if (file.type !== "file") {
            return message.channel.send(embedUtils.sendError(file.name + constants.response_text.not_file));
        }

        return message.channel.send({
            embed: {
                title: file.name,
                color: constants.embed_colors.info,
                description: file.contents === "" ? "File is empty" : "```" + file.contents + "```"
            }
        });
    }
}