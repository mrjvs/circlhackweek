// virtual executable files
const stateMachine = require('./statemachine.js');
const constants = require('./constants.js');
const embedUtils = require('./utils/embedutils.js');
const utils = require('./utils/utils.js');

module.exports = [
    {
        code: constants.exe_codes.porthack, // porthack
        execute: (user, server, message, args) => {
            const openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            if ((openedPorts && openedPorts.length < server.ports.requiredAmount) || (!openedPorts && server.ports.requiredAmount !== 0)) return message.channel.send(utils.sendError("Not enough ports are open to run porthack"));
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
                    return message.channel.send(embedUtils.sendError("Could not save your user data! :("));
                }
            });
            // TODO Timeout maybe?
            return message.channel.send({
                embed: {
                    title: "Admin username and password acquired! They've been added to your keychain.",
                    description: `Username: \`${server.credentials.user}\`
                    Password: \`${"*".repeat(server.credentials.user.length)}\``,
                    color: constants.embed_colors.success
                }
            })
        }
    },
    {
        code: constants.exe_codes.sql, // sql crack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "sql", "SQL database");
        }
    },
    {
        code: constants.exe_codes.clock, // clock
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo(`\`${new Date().toUTCString()}\``));
        }
    },
    {
        code: constants.exe_codes.java, // java
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Added Java to env variables"));
        }
    },
    {
        code: constants.exe_codes.runescape, // runescape
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Missing GPU, Missing CPU, Missing PSU"));
        }
    },
    {
        code: constants.exe_codes.sticky, // sticky notes
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Program was too sticky to open. Please install `superglueremover.exe`"));
        }
    },
    {
        code: constants.exe_codes.ssh, // ssh crack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "ssh", "SSH");
        }
    },
    {
        code: constants.exe_codes.web, // web scraper hack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "web", "Web Server"); 
        }
    }
];