const db = require("../db.js");
const embedUtils = require("../utils/embedutils.js");
const fileUtils = require("../utils/fileutils.js");
const stateMachine = require('../statemachine.js');
const path = require('path');
const constants = require('../constants.js');

module.exports = {
    name: "exec",
    aliases: ["sh"],
    description: "Executes a program",
    usage: "<file>",
    showInHelp: true,
    dmOnly: true,
    signUpOnly: true,
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
        const file = fileUtils.explorePath(server.files, pathParts);
        if (file === false) {
            return message.channel.send(embedUtils.sendError(constants.response_text.invalid_path));
        }
        if (file.type === "dir") {
            return message.channel.send(embedUtils.sendError(finalPath + constants.response_text.not_file));
        }

        const exe = fileUtils.getFileExecutable(file);
        if (!exe) {
            return message.channel.send(embedUtils.sendError(`${finalPath}: cannot execute binary file`));
        }
        
        const user = (await db.userModel.find({userId: message.author.id}))[0];

        // run code from file
        args.shift();
        exe.execute(user, server, message, args);
    }
}
