const db = require("../db.js");
const embedUtils = require("../utils/embedutils.js");
const constants = require("../constants.js");
const quests = require('../quests.js');
const randomString = require("randomstring");
const questUtils = require('../utils/questutils.js');
const config = require("../config.json");

module.exports = {
    name: "signup",
    aliases: [],
    description: "Signs you up for circl",
    showInHelp: false,
    dmOnly: false,
    needsAdmin: false,
    signedUpOnly: false,
    needsConnection: false,
    execute: async (message, args) => {
        // make server admin username
        const username = message.author.username.replace("[^\w]", "") + message.author.discriminator.replace("0", "");
        const userId = message.author.id;
        let channel = await message.author.createDM();

        // account check
        let foundUsers = await db.userModel.find({ userId: userId });
        if (foundUsers.length !== 0) {
            message.channel.send(embedUtils.sendError("You already have an account, you cannot create another one."));
            return;
        }

        // make server admin password
        let password = randomString.generate({
            length: 7,
            charset: "alphanumeric"
        });

        // user local server
        let uniqueIp = await db.serverSchema.statics.generateUniqueIp();
        let newServer = new db.serverModel({
            ip: uniqueIp,
            name: username + "'s server",
            files: quests.newUserFS,
            credentials: {
                user: username,
                pass: password
            },
            ports: {
                requiredAmount: 5,
                portList: [{
                    portNumber: 21,
                    portType: "ssh"
                },
                {
                    portNumber: 80,
                    portType: "web"
                },
                {
                    portNumber: 69,
                    portType: "sql"
                }]
            },
            linked: []
        });

        newServer = await newServer.save();
        
        // generate user specific quest servers
        const questServers = quests.questServers;
        let questIps = {};
        for (let key in questServers) {
            const questServerStructure = await questUtils.createQuestServer(questServers[key]);
            const questServer = new db.serverModel(questServerStructure);
            await questServer.save();
            questIps[key] = questServer.ip;
        }

        // save user to db
        const serverIp = newServer.ip;
        let serverList = [];
        serverList.push({
            ip: serverIp,
            name: newServer.name
        });
        const newUser = new db.userModel({
            userId,
            serverIp,
            keychain: [{
                ip: serverIp,
                user: username,
                pass: password
            }],
            serverList,
            questServerList: questIps,
            completedQuests: []
        });

        try {
            await newUser.save();
        } catch (err) {
            channel.send(embedUtils.sendError("We failed to save your user data! ☹"));
        }

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

        // send DM
        channel.send({
            embed: {
                title: "Welcome to Circl!",
                description: "Circl is a hacking simulator with tons of stuff to do.",
                thumbnail: {
                    url: config.avatar
                },
                fields: [
                    {
                        name: "User information",
                        value: `Username: \`${username}\`\n Password: \`${password}\`\n Your IP: \`${newUser.serverIp}\``
                    }
                ]
            }
        });

        channel.send({
            embed: {
                title: "Disclaimer",
                description: "Using the bot `Circl` is **not actually hacking**. You are playing on virtual systems and programs. Passwords and usernames are randomly generated and *not* based on real passwords or usernames.",
                color: constants.embed_colors.pink
            }
        });

        // start quest 0
        await questUtils.startQuest(userId, 0, channel);
    }
}
