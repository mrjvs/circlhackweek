const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "nano",
    aliases: [],
    description: "Edits the contents of a file",
    sendInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        if (args.length < 2) {
            return message.channel.send(utils.sendError("description: `$nano <filename> <contents>`!"))
        }

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];

        const pathInput = args[0];
        const newPath = path.join(pathState, pathInput);

        const file = utils.explorePath(server.files, utils.splitPath(newPath), "files");

        if (file === false) {
            return message.channel.send(utils.sendError("Cannot find that file!"));
        } else if (file.type !== "file") {
            return message.channel.send(utils.sendError("Can only be run on files!"));
        }

        let newContents = args;
        newContents.shift();
        server.set(file.path + ".contents", newContents.join(" "))
        server.save((err, server) => {
            if (err) {
                console.log(error);
                return message.channel.send(utils.sendError("Could not save the server ☹"));
            }
        });

        message.channel.send(utils.sendSuccess(`Changed the contents of file \`${newPath}\``));

    }
}

