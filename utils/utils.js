const db = require('../db.js');
const stateMachine = require('../statemachine.js');
const embedUtils = require('./embedutils.js');
const config = require('../config.json');

async function isSignedUp(userId) {
    const foundUsers = await db.userModel.find({ userId });
    return foundUsers.length === 1;
}

function hasAdminAccess(userId) {
    const serverIp = stateMachine.getState(userId, "connectedServer");
    if (!serverIp) return false;
    const loginState = stateMachine.getState(userId, "loginState");
    return loginState && loginState.serverIp === serverIp;
}

function convertTokenToUrl(token) {
    return `http://${config.host}/${token}/`;
}

function openPort(args, server, channel, userId, portType, portFancyName) {
    if (!args[0]) return channel.send(embedUtils.sendError("Needs port number to run"));
    const ports = server.ports.portList.filter(port => port.portNumber == args[0]);
    if (ports.length === 0) return channel.send(embedUtils.sendError("Port not available"));
    if (ports[0].portType !== portType) return channel.send(embedUtils.sendError(`Port doesnt have ${portFancyName} attached`));

    // open port
    let openedPorts = stateMachine.getState(userId, 'openedPorts');
    if (!openedPorts) openedPorts = [];
    openedPorts.push(ports[0]);
    stateMachine.setState(userId, 'openedPorts', openedPorts);
    return channel.send(embedUtils.sendSuccess(`Port ${ports[0].portNumber} has been opened`));
}

module.exports = {
    isSignedUp,
    hasAdminAccess,
    convertTokenToUrl,
    openPort
}