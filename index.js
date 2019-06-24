// libs
const Discord = require('discord.js');
const client = new Discord.Client();

// config
const config = require('./config.json');

// local imports
const db = require('./db.js');
db.init(config.connectionString);
const signupCommand = require('./commands/signup.js')
const stateMachine = require('./statemachine.js');

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