// virtual executable files
const stateMachine = require('./statemachine.js');
const constants = require('./constants.js');

module.exports = [
    {
        code: constants.exe_codes.porthack, // porthack
        execute: (utils, user, server, message, args) => {
            const openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            if (openedPorts && openedPorts.length < server.ports.requiredAmount || !openedPorts) return message.channel.send(utils.sendError("Not enough ports are open to run porthack!"));
            stateMachine.setState(message.author.id, "loginState", {
                serverIp: server.ip,
                user: server.credentials.user,
                pass: server.credentials.pass
            });

            user.keychain.push({
                ip: server.ip,
                user: server.credentials.user,
                pass: server.credentials.pass
            });
            user.save((err, user) => {
                if (err) {
                    console.error(err);
                    return message.channel.send(utils.sendError("Could not save your user data! :("));
                }
            });
            // TODO Timeout maybe?
            return message.channel.send(utils.sendSuccess(
                `Found admin username and password! They've been added to your keychain.
                Username: \`${server.credentials.user}\`
                Password: \`${"*".repeat(server.credentials.user.length)}\``));
        }
    },
    {
        code: constants.exe_codes.sql, // sql crack
        execute: (utils, user, server, message, args) => {
            if (!args[0]) return message.channel.send(utils.sendError("Needs port number to run!"));
            const ports = server.ports.portList.filter(port => port.portNumber == args[0]);
            if (ports.length === 0) return message.channel.send(utils.sendError("Port not available!"));
            if (ports[0].portType !== "sql") return message.channel.send(utils.sendError("Port doesnt have sql attached!"));
            
            // open port
            let openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            if (!openedPorts) openedPorts = [];
            openedPorts.push(ports[0]);
            stateMachine.setState(message.author.id, 'openedPorts', openedPorts);
            // TODO add timeout until its opened.
            return message.channel.send(utils.sendSuccess("Port has been opened!"));
        }
    },
    {
        code: constants.exe_codes.clock, // clock
        execute: (utils, user, server, message, args) => {
            return message.channel.send(utils.sendInfo("Running the almighty `clock.exe`"));
        }
    },
    {
        code: constants.exe_codes.randomhack, // illegal hack
        execute: (utils, user, server, message, args) => {
            return message.channel.send(utils.sendInfo("Permission denied: `ip not in whitelist`"));
        }
    },
    {
        code: constants.exe_codes.ssh, // ssh crack
        execute: (utils, user, server, message, args) => {
            if (!args[0]) return message.channel.send(utils.sendError("Needs port number to run!"));
            const ports = server.ports.portList.filter(port => port.portNumber == args[0]);
            if (ports.length === 0) return message.channel.send(utils.sendError("Port not available!"));
            if (ports[0].portType !== "ssh") return message.channel.send(utils.sendError("Port doesnt have ssh attached!"));
            
            // open port
            let openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            if (!openedPorts) openedPorts = [];
            openedPorts.push(ports[0]);
            stateMachine.setState(message.author.id, 'openedPorts', openedPorts);
            // TODO add timeout until its opened.
            return message.channel.send(utils.sendSuccess("Port has been opened!"));
        }
    }
];