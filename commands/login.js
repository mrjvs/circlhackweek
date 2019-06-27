const utils = require("../utils.js");
const db = require("../db.js");
const stateMachine = require('../statemachine.js');
const constants = require('../constants.js');

module.exports = {
    name: "login",
    aliases: [],
    description: "Logs you into a server",
    usage: ["", "<username> <password>"],
    showInHelp: true,
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const loginState = stateMachine.getState(message.author.id, "loginState");

        if (loginState && loginState.server === connectedServer) {
            return message.channel.send(utils.sendInfo("You are already logged into this server"));
        }

        const server = (await db.serverModel.find({ ip: connectedServer }))[0];
        const user = (await db.userModel.find({userId: message.author.id}))[0];
        
        if (args.length === 0) {
            for (let i = 0; i < user.keychain.length; i++) {
                let cred = user.keychain[i];
                if (cred.ip === server.ip && cred.user === server.credentials.user && cred.pass === server.credentials.pass) {
                    stateMachine.setState(message.author.id, "loginState", {
                        serverIp: server.ip,
                        user: cred.user,
                        pass: cred.pass
                    });
                    return message.channel.send({
                        embed: {
                            title: "Signed in using keychain",
                            color: constants.embed_colors.success,
                            description: `Username: \`${cred.user}\`
                            Password: \`${"*".repeat(cred.user.length)}\``
                        }
                    });
                }
            }
            message.channel.send({
                embed: {
                    title: "Could not login using keychain",
                    description: "Use `$login <user> <pass>` instead!",
                    color: constants.embed_colors.error
                }
            });
        } else if (args.length == 2) {
            const username = args[0]; 
            const password = args[1];
            if (username === server.credentials.user && password === server.credentials.pass) {
                if (user.keychain.filter(cred => cred.ip === server.ip && cred.pass === password && cred.user === username).length > 0) {
                    stateMachine.setState(message.author.id, "loginState", {
                        serverIp: server.ip,
                        user: username,
                        pass: password
                    });
                    return message.channel.send({
                        embed: {
                            title: "Signed in using keychain",
                            color: constants.embed_colors.success,
                            description: `Username: \`${username}\`
                            Password: \`${"*".repeat(username.length)}\``
                        }
                    });
                }
                user.keychain.push({
                    ip: server.ip,
                    user: username,
                    pass: password
                });
                user.save((err, user) => {
                    if (err) {
                        console.error(err);
                        return message.channel.send(utils.sendError("Could not save your user data! ☹"));
                    }
                });
                stateMachine.setState(message.author.id, "loginState", {
                    serverIp: server.ip,
                    user: username,
                    pass: password
                });
                message.channel.send({
                    embed: {
                        title: "Logged in using username and password",
                        description: "The password has been saved to your keychain for future access",
                        color: constants.embed_colors.success
                    }
                });
            } else {
                message.channel.send(utils.sendError("Incorrect username and password"));
            }
        }
    }
}