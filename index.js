// libs
const Discord = require('discord.js');
const client = new Discord.Client();
const randomString = require("randomstring");

// local imports
const signupCommand = require('./commands/signup.js')
const stateMachine = require('../statemachine.js');

// config
const config = require('./config.json');

client.on('ready', () => {
    console.log('Welcome to Circl!');
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on('message', (message) => {
    if (message.author.bot) return; // disallow bots from using commands

    // signup command is the only command allowed outside of DM's
    if (message.content.startsWith(config.prefix + 'signup')) {
        let args = message.content.split(" ");
        args.shift();
        return signupCommand(message, args);
    }

    if (message.content.startsWith(config.prefix) && message.channel.type == 'dm') {
        
    }

});

client.login(config.token);