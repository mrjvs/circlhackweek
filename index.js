// libs
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');

// config
const config = require('./config.json');

// local imports
const db = require('./db.js');
db.init(config.connectionString);
const signupCommand = require('./commands/signup.js')
const stateMachine = require('./statemachine.js');

// dynamic command loading
const commands = [];
const dir = fs.readdirSync('./commands');
for (let i in dir) {
    const com = require('./commands/' + dir[i]);
    console.log(`Loaded command: ${com.name}.`);
    commands.push(com);
}

client.on('ready', () => {
    console.log('Welcome to Circl!');
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on('message', (message) => {
    if (message.author.bot) return; // disallow bots from using commands
    if (!message.content.startsWith(config.prefix)) return; // doesnt start with prefix so its not a command

    const args = message.content.split(" ");
    const messageCommand = args.shift().substring(config.prefix.length); // remove prefix from text

    // check if text is a command
    for (let i in commands) {
        // check if command is only for dm's
        if (message.channel.type === 'dm' && commands[i].dmOnly || !commands[i].dmOnly) {
            if (messageCommand === commands[i].name) {
                commands[i].execute(message, args);
            } else {
                // check aliases
                for (let aliasIndex in commands[i].aliases) {
                    if (messageCommand === commands[i].aliases[aliasIndex]) {
                        commands[i].execute(message, args);
                    }
                }
            }
        }
    }
});

client.login(config.token);