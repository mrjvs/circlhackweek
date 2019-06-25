const utils = require("../utils.js");
const db = require("../db.js");
const stateMachine = require('../statemachine.js');

module.exports = {
    name: "login",
    aliases: [],
    dmOnly: true,
    signedUpOnly: true,
    needsAdmin: false,
    needsConnection: true,
    execute: async (message, args) => {
        const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
        const loginState = stateMachine.getState(message.author.id, "loginState");

        if (loginState && loginState.server === connectedServer) {
            return message.channel.send(utils.sendInfo("You are already logged into this server!"));
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
                    return message.channel.send(utils.sendSuccess(
                        `Signed in using Keychain!
                    Username: ${cred.user}
                    Password: ${"\\*".repeat(cred.user.length)}`));
                }
            }
            message.channel.send(utils.sendError("Could not login using keychain! Use `$login <user> <pass>` instead!"))
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
                    return message.channel.send(utils.sendSuccess(
                        `Signed in using Keychain!
                    Username: ${username}
                    Password: ${"\\*".repeat(username.length)}`));
                }
                user.keychain.push({
                    ip: server.ip,
                    user: username,
                    pass: password
                });
                user.save((err, user) => {
                    if (err) {
                        console.error(err);
                        return message.channel.send(utils.sendError("Could not save your user data! :("));
                    }
                });
                stateMachine.setState(message.author.id, "loginState", {
                    serverIp: server.ip,
                    user: username,
                    pass: password
                });
                message.channel.send(utils.sendSuccess(
                    `Logged in using username and password!
                The password has been saved to your keychain for future access!`));
            } else {
                message.channel.send(utils.sendError("Incorrect username and password!"))
            }
        }
    }
}