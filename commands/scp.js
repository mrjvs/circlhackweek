const utils = require("../utils.js");
const path = require('path');
const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "scp",
    aliases: [],
    description: "Download files to local server",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: true,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const pathState = stateMachine.getState(message.author.id, "path");

        const user = (await db.userModel.find({userId: message.author.id}))[0];
        const server = (await db.serverModel.find({ip: connectedServer}))[0];
        const userServer = (await db.serverModel.find({ip: user.serverIp}))[0];

        // parse source path
        // TODO check if no args[0]
        if (!args[0]) {
            return message.channel.send(utils.sendError("Please specify the file to download."));
        }
        const sourcePathInput = args[0];
        const sourcePath = path.join(pathState, sourcePathInput);
        const sourcePathParts = utils.splitPath(sourcePath);

        // get file
        const sourceFile = utils.explorePath(server.files, sourcePathParts, "files");
        if (sourceFile === false) {
            return message.channel.send(utils.sendError("Invalid source path!"));
        }
        if (sourceFile.type === "dir") {
            return message.channel.send(utils.sendError("Can only be run on files!"));
        }

        // parse destination path
        let destinationPathInput;
        if (!args[1]) {
            if (sourceFile.type.endsWith(".exe")) {
                destinationPathInput = 'bin';
            } else if (sourceFile.type.endsWith(".sys")) {
                destinationPathInput = 'sys';
            } else {
                destinationPathInput = 'home';
            }
        } else {
            destinationPathInput = args[1];
        }
        const destinationPath = path.join(destinationPathInput);
        const destinationPathParts = utils.splitPath(destinationPath);

        // get destination dir
        const destinationFile = utils.explorePath(userServer.files, destinationPathParts, "files");
        if (destinationFile === false) {
            return message.channel.send(utils.sendError("Invalid destination path!"));
        }
        if (destinationFile.type === "file") {
            return message.channel.send(utils.sendError("Destination needs to be a folder!"));
        }

        // check duplicate name
        const filteredDestinationFile = destinationFile.contents.filter(file => file.name === sourceFile.name);
        if (filteredDestinationFile.length !== 0) {
            return message.channel.send(utils.sendError("File already exists in destination."));
        }

        // copy source into destination
        const newUserServer = (await db.serverModel.find({ip: user.serverIp}))[0];
        delete sourceFile.path;
        destinationFile.contents.push(sourceFile);
        newUserServer.set(destinationFile.path + ".contents", destinationFile.contents);
        delete destinationFile.path;
        await newUserServer.save();

        // success
        return message.channel.send(utils.sendSuccess(`File copied to ${destinationPath}`));
    }
}

