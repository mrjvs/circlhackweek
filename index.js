// libs
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const express = require("express");
const webview = express();
const path = require('path');

// config
const config = require('./config.json');

// local imports
const db = require('./db.js');
db.init(config.connectionString);
const fileUtils = require('./utils/fileutils.js');
const embedUtils = require('./utils/embedutils.js');
const utils = require('./utils/utils.js');
const runBin = require('./runbin.js');
const stateMachine = require('./statemachine.js');
const constants = require('./constants.js');

// dynamic command loading
const commands = [];
const dir = fs.readdirSync('./commands');
for (let i in dir) {
    const com = require('./commands/' + dir[i]);
    console.log(`Loaded command: $${com.name}`);
    commands.push(com);
}

client.on('ready', () => {
    console.log('Welcome to Circl!');
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on('message', async (message) => {
    if (message.author.bot) return; // disallow bots from using commands
    if (!message.content.startsWith(config.prefix)) return; // doesnt start with prefix so its not a command

    const args = message.content.split(/\s+/);
    const messageCommand = args.shift().substring(config.prefix.length); // remove prefix from text

    // check if text is a command
    let command;
    for (let i in commands) {
        if (messageCommand === commands[i].name) {
            command = commands[i];
        } else {
            // check aliases
            for (let aliasIndex in commands[i].aliases) {
                if (messageCommand === commands[i].aliases[aliasIndex]) {
                    command = commands[i];
                }
            }
        }
    }

    if (command) {

        let user = (await db.userModel.find({ userId: message.author.id }))[0];

        if (user && user.blocked && command.name !== "unsignup") return message.channel.send(embedUtils.sendError("Looks like you're blocked! To start over, type `$unsignup`!"));
        if (user && user.deleted && command.name !== "unsignup") return;

        const isSignedUp = await utils.isSignedUp(message.author.id);
        if (!isSignedUp && command.signedUpOnly) {
            return message.channel.send({
                embed: {
                    title: "You need to be signed up to run this command",
                    description: "Sign up using `$signup`",
                    color: constants.embed_colors.error
                }
            });
        }

        const isConnected = stateMachine.getState(message.author.id, "connectedServer");
        if (!isConnected && command.needsConnection) {
            return message.channel.send({
                embed: {
                    title: "You need to connected to a server to run this command",
                    description: "Connect to a server using `$connect <ip>`",
                    color: constants.embed_colors.error
                }
            });
        }

        const hasAdminAccess = utils.hasAdminAccess(message.author.id);
        if (!hasAdminAccess && command.needsAdmin) {
            return message.channel.send({
                embed: {
                    title: "You need to have admin permissions to run this command",
                    description: "Log in using `$login`",
                    color: constants.embed_colors.error
                }
            });
        }

        if (message.channel.type !== 'dm' && command.dmOnly) {
            return message.channel.send({
                embed: {
                    title: "This command can only be run in a DM channel",
                    description: "This is to ensure our users safety, security and privacy ❤",
                    color: constants.embed_colors.error
                }
            });
        }
        console.log(`User ${message.author.username}#${message.author.discriminator} executed command $${messageCommand} with args ${args.toString()}`);

        // hardcoded help command so it has the command list
        if (command.name === "help") command.execute(message, args, commands);
        else command.execute(message, args);
    } else {

        let user = (await db.userModel.find({ userId: message.author.id }))[0];

        if (user && user.blocked && command.name !== "unsignup") return message.channel.send(embedUtils.sendError("Looks like you're blocked! To start over, type `$unsignup`!"));
        if (user && user.deleted && command.name !== "unsignup") return;

        await runBin(messageCommand, message, args);
    }

});

webview.get(['/:servertoken', '/:servertoken*'] , async (req, res) => {

    const server = await db.serverModel.find({ token: req.params.servertoken, serverType: "web" });
    if (server.length === 0) {
        // server token doesnt exist or is not a web server
        return res.status(404).send("<h1>404</h1><br>Cannot locate server");
    }

    let webPath = req.params[0];
    if (!webPath) webPath = "/";

    let pathParts = fileUtils.filterPath(webPath.split("/"));
    pathParts.unshift("public");

    // get file
    const file = fileUtils.explorePath(server[0].files, pathParts, "files");

    // 404
    if (file === false) return res.status(404).send(`<h1>404</h1><br>Cannot locate file ${webPath}.`);
    // list dirs
    if (file.type === "dir") {
        // send index.html of dir
        let indexFiles = file.contents.filter(loopFile => loopFile.name === "index.html");
        if (indexFiles.length > 0) return res.send(indexFiles[0].contents);

        // list files in dir
        let html = `<h1>${file.name}</h1><br>`;
        if (file.contents.length === 0) html += "Directory is empty";
        else {
            for (let i = 0; i < file.contents.length; i++) {
                let loopFile = file.contents[i];
                if (loopFile.type === "dir") {
                    html += "- DIR " + loopFile.name + "<br>";
                } else {
                    html += "- " + loopFile.name + "<br>";
                }
            }
        }
        return res.send(html);
    }

    // send file contents
    return res.send(file.contents);
});

webview.use(express.static("public"));

webview.listen(config.port || 8080, () => console.log(`Circl web-view running on port ${config.port || 8080}`))
client.login(config.token);
