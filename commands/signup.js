const db = require("../db.js");
const constants = require("../constants.js");
const randomString = require("randomstring");

module.exports = async function (message, args) {
    let userId = message.author.username.replace("[^\w]", "") + message.author.discriminator.replace("0", "");
    let channel = await message.author.createDM();

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
            channel.send({
                embed: {
                    description: "We failed to save your user data! ;(",
                    color: constants.embed_colors.error
                }
            })
        }
    });

    // Display information about the user: username + password
    // Display information about what to do next
    message.channel.send({
        embed: {
            color: constants.embed_colors.info,
            title: "Thanks for signing up!",
            description: "We've sent you a DM with more information."
        }
    });
    
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