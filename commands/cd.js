const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");

module.exports = {
    name: "cd",
    aliases: [],
    description: "Changes to a different directory",
    usage: "<new_directory>",
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
        const newPath = path.join(pathState, pathInput);

        // check if valid path
        const file = utils.explorePath(server.files, utils.splitPath(newPath), "files");
        if (file === false) {
            return message.channel.send(utils.sendError("No such file or directory"));
        } else if (file.type !== "dir") {
            return message.channel.send(utils.sendError(file.name + ": Not a directory"))
        }

        // set new path
        stateMachine.setState(message.author.id, "path", newPath);
        message.channel.send({
            embed: {
                color: constants.embed_colors.info,
                description: `Changed directory to: \`${newPath}\``
            }
        });
    }
}

