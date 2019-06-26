const stateMachine = require('../statemachine.js');
const db = require("../db.js");

module.exports = {
    name: "probe",
    aliases: ["nmap"],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        let openedPorts = stateMachine.getState(message.author.id, "openedPorts");
        if (!openedPorts) openedPorts = [];

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];
        const ports = server.ports.portList;

        let out = `**PORTS**\nOpen ports required to hack: ${server.ports.requiredAmount}\n\n`;
        for (let i = 0; i < ports.length; i++) {
            const filteredOpenedPorts = openedPorts.filter(port => port.portNumber === ports[i].portNumber);
            if (filteredOpenedPorts.length !== 0) {
                // port is open
                out += `**${ports[i].portNumber}** - ${ports[i].portType} - **OPEN**\n`;
            } else {
                out += `**${ports[i].portNumber}** - ${ports[i].portType}\n`;
            }
        }
        return message.channel.send(out);
    }
}