const stateMachine = require('../statemachine.js');
const db = require("../db.js");
const utils = require("../utils.js");
const constants = require("../constants.js");

module.exports = {
    name: "probe",
    aliases: ["nmap"],
    description: "Scans for open ports on the current server",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        let openedPorts = stateMachine.getState(message.author.id, "openedPorts");
        if (!openedPorts) openedPorts = [];

        let serverToConnect = args[0] ? args[0] : connectedServer;

        const server = (await db.serverModel.find({ ip: serverToConnect }))[0];
        if (!server) {
            return message.channel.send(utils.sendError(`Could not resolve hostname ${serverToConnect}: Name or service not known`))
        }
        
        const ports = server.ports.portList;

        let out = [];
        for (let i = 0; i < ports.length; i++) {
            const filteredOpenedPorts = openedPorts.filter(port => port.portNumber === ports[i].portNumber);

            let portName;
            if (ports[i].portType === "ssh") portName = "SSH protocol";
            else if (ports[i].portType === "sql") portName = "SQL database";
            else portName = "???";

            if (filteredOpenedPorts.length !== 0) {
                // port is open
                out.push({
                    name: ports[i].portNumber + " - " + portName,
                    value: "Status: Open"
                });
            } else {
                out.push({
                    name: ports[i].portNumber + " - " + portName,
                    value: "Status: Closed"
                });
            }
        }
        return message.channel.send({
            embed: {
                color: openedPorts.length >= server.ports.requiredAmount ? constants.embed_colors.success : undefined,
                title: "Port list",
                description: openedPorts.length >= server.ports.requiredAmount ? "Enough ports are open to run porthack" : `Open ports required to run porthack: ${server.ports.requiredAmount}`,
                fields: out
            }
        });
    }
}
