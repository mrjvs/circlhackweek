const fileUtils = require("../utils/fileutils.js");
const embedUtils = require("../utils/embedutils.js");
const constants = require("../constants.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "touch",
    aliases: [],
    description: "Creates a file",
    usage: "<file_name>",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");
        const server = (await db.serverModel.find({ip: connectedServer}))[0];

        // parse path
        if (!args[0]) {
            return message.channel.send(embedUtils.sendError("You need to enter the file name"));
        }
        const pathInput = args[0];
        const finalPath = path.join(pathState, pathInput);
        const pathParts = fileUtils.splitPath(finalPath);
        const fileName = pathParts.pop();
        console.log(pathParts);

        // get file
        const fileDirectory = fileUtils.explorePath(server.files, pathParts, "files");
        if (fileDirectory === false || fileDirectory.type === "file") {
            return message.channel.send(embedUtils.sendError(constants.response_text.invalid_path));
        }

        // check duplicate name
        const filteredFileDirectory = fileDirectory.contents.filter(file => file.name === fileName);
        if (filteredFileDirectory.length !== 0) {
            return message.channel.send(embedUtils.sendError(finalPath + ": File already exists"));
        }

        // put new file in folder
        const newServer = (await db.serverModel.find({ip: connectedServer}))[0];
        fileDirectory.contents.push({
            name: fileName,
            type: "file",
            contents: ""
        });
        if (pathParts.length === 0) {
            newServer.set(fileDirectory.path, fileDirectory.contents);
        } else {
            newServer.set(fileDirectory.path + ".contents", fileDirectory.contents);
        }
        delete fileDirectory.path;
        await newServer.save();

        // success
        return message.channel.send(embedUtils.sendSuccess(`File saved to ${finalPath}`));
    }
}
