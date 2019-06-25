const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const constants = require("../constants.js");
const quests = require("../quests.js")

module.exports = {
    name: "cat",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        if (args.length !== 1) {
            return message.channel.send(utils.sendError("You need to enter the file name!"));
        }

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];

        const pathInput = args[0];
        const newPath = path.join(pathState, pathInput);

        const file = utils.explorePath(server.files, utils.splitPath(newPath), "files");
        if (!file) {
            return message.channel.send(utils.sendError("Invalid path!"));
        } else if (file.type !== "file") {
            return message.channel.send(utils.sendError("Can only be run on files!"));
        }
        return message.channel.send(utils.sendInfo("- " + file.name + " -\n" + "```" + file.contents + "```"));
    }
}