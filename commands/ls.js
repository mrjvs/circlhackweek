const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "ls",
    aliases: [],
    description: "Lists the files inside any directory",
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
        const pathParts = utils.splitPath(finalPath);

        // get file
        const file = utils.explorePath(server.files, pathParts, "files");
        if (file === false) {
            return message.channel.send(utils.sendError("Invalid path!"));
        }
        if (file.type === "file") {
            return message.channel.send(utils.sendError("Can only be run on directories!"));
        }

        // reply with dir contents
        let out = "";
        out += "* .\n"
        out += "* ..\n";
        for (let i = 0; i < file.contents.length; i++) {
            out += "* " + file.contents[i].name + "\n";
        }
        message.channel.send(out);
        
    }
}

