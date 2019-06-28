const embedUtils = require("../utils/embedutils.js");
const utils = require("../utils/utils.js");
const db = require("../db.js");
const stateMachine = require('../statemachine.js');
const constants = require('../constants.js');

module.exports = {
    name: "connect",
    aliases: [],
    description: "Connects you to a server",
    usage: "<server_ip>",
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsConnection: false,
    execute: async (message, args) => {
        if (args.length != 1) {
            return message.channel.send(embedUtils.sendError("You need to enter ip adress"));
        }

        let ipToFind = args[0];

        // local addresses
        const user = (await db.userModel.find({userId: message.author.id}))[0];
        if (args[0] === "127.0.0.1" || args[0] === "localhost") {
            ipToFind = user.serverIp;
        }
        
        if (!ipToFind.match("[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}")) {
            return message.channel.send(embedUtils.sendError(`Could not resolve hostname ${ipToFind}: Name or service not known`));
        }

        const foundServers = await db.serverModel.find({ip: ipToFind}); 
        if (foundServers.length === 0) {
            return message.channel.send(embedUtils.sendError(`Could not resolve hostname ${ipToFind}: Name or service not known`))
        }
        const server = foundServers[0];

        // set connected state
        stateMachine.setState(message.author.id, "connectedServer", server.ip);
        stateMachine.setState(message.author.id, "path", "/");

        // reset opened ports on new connect
        stateMachine.clearState(message.author.id, "openedPorts");

        // add server to serverlist if new
        const filteredServerList = user.serverList.filter(val => val.ip === server.ip);
        if (filteredServerList.length === 0) {
            user.serverList.push({
                ip: server.ip,
                name: server.name
            });
            await user.save();
        }

        let fields = [{
            name: "IP",
            value: server.ip
        }];

        if (server.serverType === "web") {
            fields.push({
                name: "WebServer",
                value: utils.convertTokenToUrl(server.token)
            });
        }

        message.channel.send({
            embed: {
                title: "Success: " + server.name,
                description: "Please login using `$login`",
                fields,
                color: constants.embed_colors.success
            }
        });
    }
}