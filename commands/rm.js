const db = require("../db.js");
const utils = require("../utils.js");
const achievements = require("../achievements.js");
const stateMachine = require('../statemachine.js');
const path = require('path');
const constants = require('../constants.js');

module.exports = {
    name: "rm",
    aliases: ["remove"],
    description: "Removes a file",
    usage: "<target_file|*>",
    showInHelp: true,
    dmOnly: true,
    signUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        if (args.length !== 1) {
            return message.channel.send(utils.sendError("You need to enter the file name"));
        }

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];

        let pathInput = args[0];
        let hasWildcard = false;
        // wildcard support
        if (pathInput.endsWith("*")) {
            pathInput = pathInput.slice(0, -1);
            hasWildcard = true;
        }
        const newPath = path.join(pathState, pathInput);
        const pathParts = utils.splitPath(newPath);

        const file = utils.explorePath(server.files, pathParts, "files");
        if (!file) {
            return message.channel.send(utils.sendError(constants.response_text.invalid_path));
        } else {
            if (hasWildcard) {
                if (file.type == "file") {
                    // if wildcard and is file, path is invalid.
                    return message.channel.send(utils.sendError(constants.response_text.invalid_path));
                }

                let pathToContents = (pathParts.length == 0) ? file.path : (file.path + ".contents");
                let obj = server.get(pathToContents);
                // remove everything in dir
                for (let i = file.contents.length - 1; i >= 0; i--) {
                    if (file.contents[i].type === "file") {
                        // remove if file.
                        obj.splice(i, 1);
                    }
                }

                const newServer = (await db.serverModel.find({ ip: connectedServer }))[0];
                newServer.set(pathToContents, obj);
                delete file.path;
                newServer.save((err, server) => {
                    if (err) {
                        console.log(error);
                        return message.channel.send(utils.sendError("Could not save the server! ☹"));
                    }
                    achievements.unlockAchievement(message, "rm-all");  
                    return message.channel.send(utils.sendSuccess(newPath + " : Files in directory removed"));
                });
            } else {
                if (file.type !== "file") {
                    // only delete a single file, dir's cant be removed.
                    return message.channel.send(utils.sendError(constants.response_text.not_file));
                }

                /*
                    This removes an element from a mongoDB array
                    in a very hacky and unmaintainable way,
                    Don't mess with it, it works ❤
                    "If it ain't broke, don't fix it!"
                */

                let pathToContents = file.path.substring(0, file.path.lastIndexOf("."));
                const fileIndex = file.path.slice(-1);

                let obj = server.get(pathToContents);
                obj.splice(fileIndex, 1);
                const newServer = (await db.serverModel.find({ ip: connectedServer }))[0];
                newServer.set(pathToContents, obj);
                delete file.path;
                newServer.save().then((updatedstuff) => {
                    return message.channel.send(utils.sendInfo(newPath + ": File removed"));
                });
            }
        }
    }
}
