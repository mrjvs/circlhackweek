const embedUtils = require("../utils/embedutils.js");
const fileUtils = require("../utils/fileutils.js");
const constants = require("../constants.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "nano",
    aliases: [],
    description: "Edits the contents of a file",
    usage: "<file_name> <new_contents>",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        if (args.length === 0) {
            return message.channel.send(embedUtils.sendError("You need to enter the file name"));
        } else if (args.length === 1) {
            return message.channel.send(embedUtils.sendError("You need to enter new file contents"));
        }

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];

        const pathInput = args[0];
        const newPath = path.join(pathState, pathInput);

        const file = fileUtils.explorePath(server.files, fileUtils.splitPath(newPath), "files");

        if (file === false) {
            return message.channel.send(embedUtils.sendError(constants.response_text.invalid_path));
        } else if (file.type !== "file") {
            return message.channel.send(embedUtils.sendError(file.name + constants.response_text.not_file));
        }

        let newContents = args;
        newContents.shift();
        newContents = newContents.join(" ");
        server.set(file.path + ".contents", newContents)
        server.save((err, server) => {
            if (err) {
                console.log(error);
                return message.channel.send(embedUtils.sendError("Could not save the server! ☹"));
            }
        });

        message.channel.send({
            embed: {
                title: "Saved new contents of file " + file.name,
                color: constants.embed_colors.info,
                description: "```" + newContents + "```"
            }
        });
    }
}
