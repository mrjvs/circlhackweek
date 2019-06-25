const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');

const quests = require("../quests.js");

module.exports = {
    name: "ls",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    execute: (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        if (!connectedServer || !pathState) {
            return message.channel.send(utils.sendError("You are not connected to a server!"));
        }

        // parse inputted path
        const pathInput = args[0] ? args[0] : ".";
        const finalPath = path.join(pathState, pathInput);
        const pathParts = utils.splitPath(finalPath);

        // get file
        const file = utils.explorePath(quests.newUserFS, pathParts);
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
        for (let i in file.contents) {
            out += "* " + file.contents[i].name + "\n";
        }
        message.channel.send(out);
        
    }
}

