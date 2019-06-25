const db = require("../db.js");
const utils = require("../utils.js");
const constants = require("../constants.js");
const randomString = require("randomstring");


module.exports = {
    name: "signup",
    aliases: [],
    dmOnly: false,
    execute: async function (message, args) {
        let userId = message.author.username.replace("[^\w]", "") + message.author.discriminator.replace("0", "");
        let channel = await message.author.createDM();
    
        let exists = await db.userModel.find({userId: userId});
        if (exists.length !== 0) {
            message.channel.send(utils.sendError("You already have an account, you cannot create another one."));
            return;
        }
    
        let password = randomString.generate({
            length: 7,
            charset: "alphanumeric"
        });
    
        let uniqueIp = await db.ServerSchema.statics.generateUniqueIp();
    
        let newServer = new db.serverModel({
            ip: uniqueIp
        });
        newServer = await newServer.save();
        const serverIp = newServer.ip;
        const newUser = new db.userModel({
            userId,
            password,
            serverIp
        });
    
        newUser.save(function (err, user) {
            if (err) {
                channel.send(utils.sendError("We failed to save your user data! ;("));
            }
        });
    
        // Display information about the user: username + password
        // Display information about what to do next
        if (message.channel.type !== "dm") {
            message.channel.send({
                embed: {
                    color: constants.embed_colors.info,
                    title: "Thanks for signing up!",
                    description: "We've sent you a DM with more information."
                }
            });
        }
        
        channel.send({
            embed: {
                title: "Welcome to Circl!",
                description: "Put a description of Circl here.",
                color: constants.embed_colors.info, //change this colour please @jvs
                footer: {
                    icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
                    text: "Circl"
                },
                thumbnail: {
                    url: "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                author: {
                    name: "Circl",
                    icon_url: "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                fields: [{
                    name: "What is Circl?",
                    value: "I honestly don't know."
                },
                {
                    name: "Your User Information",
                    value: `Username: \`${newUser.userId}\`\n Password: \`${newUser.password}\`\n Your IP: \`${newUser.serverIp}\``
                }
                ]
            }
        });
    }
}
