const stateMachine = require('./statemachine.js');
const db = require('./db.js');
const utils = require('./utils.js');

async function runFromBin(command, message, args) {
    const connectedServer = stateMachine.getState(message.author.id, "connectedServer"); //TODO move to personal server
    if (!connectedServer) return; // not connected to server

    const server = (await db.serverModel.find({ip: connectedServer}))[0];
    const binFolder = utils.explorePath(server.files, ["bin"]);

    const filteredFiles = binFolder.contents.filter(val => val.name === command || val.name.substring(0, val.name.indexOf(".")) === command);

    if (filteredFiles.length === 0) return; // no file in bin folder with same name as the executed command

    const exe = utils.getFileExecutable(filteredFiles[0]);
    if (!exe) return; // not a executable
    
    // run code from file
    exe.execute(utils, message, args);
}

module.exports = runFromBin;