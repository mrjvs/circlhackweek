const db = require("../db.js");
const utils = require("../utils.js");
const stateMachine = require('../statemachine.js');
const path = require('path');

module.exports = {
    name: "exec",
    aliases: ["sh"],
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
        const pathParts = utils.splitPath(finalPath);

        // get file
        const file = utils.explorePath(server.files, pathParts);
        if (file === false) {
            return message.channel.send(utils.sendError("Invalid path!"));
        }
        if (file.type === "dir") {
            return message.channel.send(utils.sendError("You cannot execute directories!"));
        }

        const exe = utils.getFileExecutable(file);
        if (!exe) {
            return message.channel.send(utils.sendError("File is not an executable!"));
        }
        
        // run code from file
        exe.execute(utils, message, args);
    }
}
