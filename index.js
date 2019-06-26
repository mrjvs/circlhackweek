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
const utils = require('./utils.js');
const runBin = require('./runbin.js');
const stateMachine = require('./statemachine.js');

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
        const isSignedUp = await utils.isSignedUp(message.author.id);
        if (!isSignedUp && command.signedUpOnly) {
            return message.channel.send(utils.sendError("You need to be signed up to run this command!"));
        }

        const isConnected = stateMachine.getState(message.author.id, "connectedServer");
        if (!isConnected && command.needsConnection) {
            return message.channel.send(utils.sendError("You need to be connected to a server to run this command! \n To connect to a server, type `$connect (address)`"));
        }
        
        const hasAdminAccess = utils.hasAdminAccess(message.author.id);
        if (!hasAdminAccess && command.needsAdmin) {
            return message.channel.send(utils.sendError("You need to have admin permissions on the server to run this command!"));
        }
        
        // check if command is only for dm's
        /*if (message.channel.type !== 'dm' && command.dmOnly) {
            return message.channel.send(utils.sendError("This command can only be ran in DMs!"));
        }*/ // dev purposes
        console.log(`User ${message.author.username}#${message.author.discriminator} executed command ${messageCommand} with args ${args}`);
        
        // hardcoded help command so it has the command list
        if (command.name === "help") command.execute(message, args, commands);
        else command.execute(message, args);
    } else {
        await runBin(messageCommand, message, args);
    }

});

webview.get(['/:servertoken', '/:servertoken*'] , async (req, res) => {
    console.log("url: " + req.path);
    console.log("servertoken: " + req.params.servertoken);
    console.log(req.params);

    const server = await db.serverModel.find({ token: req.params.servertoken, serverType: "web" });
    if (server.length === 0) {
        // server token doesnt exist or is not a web server
        return res.status(404).send("<h1>404</h1><br>Cannot locate server.");
    }

    let webPath = req.params[0];
    if (!webPath) webPath = "/";

    let pathParts = utils.filterPath(webPath.split("/"));
    pathParts.unshift("public");
    
    // get file
    const file = utils.explorePath(server[0].files, pathParts, "files");

    // 404
    if (file === false) return res.status(404).send(`<h1>404</h1><br>Cannot locate file ${webPath}.`);
    // list dirs
    if (file.type === "dir") {
        // send index.html of dir
        let indexFiles = file.contents.filter(loopFile => loopFile.name === "index.html");
        if (indexFiles.length > 0) return res.send(indexFiles[0].contents);

        // list files in dir
        let html = `<h1>${file.name}</h1><br>`;
        for (let i = 0; i < file.contents.length; i++) {
            let loopFile = file.contents[i];
            if (loopFile.type === "dir") {
                html += "- DIR " + loopFile.name + "<br>";
            } else {
                html += "- " + loopFile.name + "<br>";
            }
        }
        return res.send(html);
    }

    // send file contents
    return res.send(file.contents);
});

webview.listen(config.port || 8080, () => console.log(`Circl web-view running on port ${config.port || 8080}`))
client.login(config.token);