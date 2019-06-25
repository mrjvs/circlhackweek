const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');

const quests = require("../quests.js");

module.exports = {
    name: "cd",
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
        const newPath = path.join(pathState, pathInput);

        // check if valid path
        const file = utils.explorePath(quests.newUserFS, utils.splitPath(newPath));
        if (file === false) {
            return message.channel.send(utils.sendError("Invalid path!"));
        }

        // set new path
        stateMachine.setState(message.author.id, "path", newPath);
        message.channel.send("cd: " + newPath);
    }
}

