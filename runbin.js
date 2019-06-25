const stateMachine = require('./statemachine.js');
const db = require('./db.js');
const utils = require('./utils.js');

async function runFromBin(command, message, args) {
    const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
    if (!connectedServer) return; // not connected to server

    const user = (await db.userModel.find({userId: message.author.id}))[0];
    const server = (await db.serverModel.find({ip: user.serverIp}))[0];

    const binFolder = utils.explorePath(server.files, ["bin"]);

    const filteredFiles = binFolder.contents.filter(val => val.name === command || val.name.substring(0, val.name.indexOf(".")) === command);

    if (filteredFiles.length === 0) return; // no file in bin folder with same name as the executed command

    const exe = utils.getFileExecutable(filteredFiles[0]);
    if (!exe) return; // not a executable
    
    const externalServer = (await db.serverModel.find({ip: connectedServer}))[0];
    // run code from file
    exe.execute(utils, externalServer, message, args);
}

module.exports = runFromBin;