// virtual executable files
const stateMachine = require('./statemachine.js');

module.exports = [
    {
        code: "RUN1", // TODO change to binary text
        name: "porthack",
        execute: (utils, server, message, args) => {
            const openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            if (openedPorts && openedPorts.length < server.ports.requiredAmount || !openedPorts) return message.channel.send(utils.sendError("Not enough ports are open to run porthack!"));
            // TODO make admin
            // TODO add to keychain
            return message.channel.send(utils.sendSuccess("Found admin username and password. They've been added to your keychain."));
        }
    },
    {
        code: "RUN2",
        name: "clock",
        execute: (utils, server, message, args) => {
            return message.channel.send(utils.sendInfo("Running the almighty `clock.exe`"));
        }
    }
];