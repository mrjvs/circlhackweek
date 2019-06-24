// libs
const Discord = require('discord.js');
const client = new Discord.Client();

// local imports


// config
const config = require('./config.json');

client.on('ready', () => {
    console.log('Welcome to Circl!');
    console.log(`Logged in as ${client.user.tag}.`);
});

client.login(config.token);