// virtual executable files
const stateMachine = require('./statemachine.js');
const constants = require('./constants.js');
const quests = require('./quests.js');
const achievements = require('./achievements.js');
const embedUtils = require('./utils/embedutils.js');
const questUtils = require('./utils/questutils.js');
const utils = require('./utils/utils.js');
const db = require('./db.js');

module.exports = [
    {
        code: constants.exe_codes.porthack, // porthack
        execute: (user, server, message, args) => {
            const openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            if ((openedPorts && openedPorts.length < server.ports.requiredAmount) || (!openedPorts && server.ports.requiredAmount !== 0)) return message.channel.send(embedUtils.sendError("Not enough ports are open to run porthack"));
            stateMachine.setState(message.author.id, "loginState", {
                serverIp: server.ip,
                user: server.credentials.user,
                pass: server.credentials.pass
            });

            user.keychain.push({
                ip: server.ip,
                user: server.credentials.user,
                pass: server.credentials.pass
            });
            user.save((err, user) => {
                if (err) {
                    console.error(err);
                    return message.channel.send(embedUtils.sendError("Could not save your user data! :("));
                }
            });
            return message.channel.send({
                embed: {
                    title: "Admin username and password acquired! They've been added to your keychain.",
                    description: `You've been automatically logged in.\n\nUsername: \`${server.credentials.user}\`
                    Password: \`${"*".repeat(server.credentials.user.length)}\``,
                    color: constants.embed_colors.success
                }
            })
        }
    },
    {
        code: constants.exe_codes.sql, // sql crack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "sql", "SQL database");
        }
    },
    {
        code: constants.exe_codes.ftp, // ftp crack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "ftp", "FTP server");
        }
    },
    {
        code: constants.exe_codes.clock, // clock
        execute: (user, server, message, args) => {
            achievements.unlockAchievement(message.channel, message.author.id, "clock");
            return message.channel.send(embedUtils.sendInfo(`\`${new Date().toUTCString()}\``));
        }
    },
    {
        code: constants.exe_codes.java, // java
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Added Java to env variables"));
        }
    },
    {
        code: constants.exe_codes.mc, // mc
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("Failed to load: Old combat system - mandatory"));
        }
    },
    {
        code: constants.exe_codes.electron, // electron
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Not enough RAM (64gb required)"));
        }
    },
    {
        code: constants.exe_codes.media, // windows media player
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Deprecated: Use VLC player"));
        }
    },
    {
        code: constants.exe_codes.bukkit, // bukkit
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Spigot-yaml not found."));
        }
    },
    {
        code: constants.exe_codes.scan, // scan
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Scan complete: extraterrestrial life forms detected."));
        }
    },
    {
        code: constants.exe_codes.deluge, // torrent client
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Not allowed: Needs VPN to function"));
        }
    },
    {
        code: constants.exe_codes.drugs, // dont do drugs
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Don't do drugs, kids!"));
        }
    },
    {
        code: constants.exe_codes.worm, // worm exploit
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Already Running..."));
        }
    },
    {
        code: constants.exe_codes.run, // run???
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("I prefer jogging tbh"));
        }
    },
    {
        code: constants.exe_codes.fbistart, // fbi start
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("Failed to start"));
        }
    },
    {
        code: constants.exe_codes.fbireboot, // fbi reboot
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendSuccess("Reboot successfull"));
        }
    },
    {
        code: constants.exe_codes.runescape, // runescape
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Missing GPU, Missing CPU, Missing PSU"));
        }
    },
    {
        code: constants.exe_codes.sticky, // sticky notes
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Program was too sticky to open. Please install `superglueremover.exe`"));
        }
    },
    {
        code: constants.exe_codes.chess, // chess
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Failed to make move"));
        }
    },
    {
        code: constants.exe_codes.facebook, // facebook
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendError("ERROR: Needs valid passport to be linked to your account to continue"));
        }
    },
    {
        code: constants.exe_codes.money, // make money
        execute: (user, server, message, args) => {
            let money = stateMachine.getState(user.userId, "money");
            money = money ? money : 0;
            stateMachine.getState(user.userId, "money", money+1);
            return message.channel.send(embedUtils.sendInfo("Added money. total: " + (money+1)));
        }
    },
    {
        code: constants.exe_codes.ssh, // ssh crack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "ssh", "SSH");
        }
    },
    {
        code: constants.exe_codes.mongo, // mongo crack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "mongodb", "MongoDB Database");
        }
    },
    {
        code: constants.exe_codes.tracker, // tracker
        execute: (user, server, message, args) => {
            return message.channel.send(embedUtils.sendInfo("Tracker planted!"));
        }
    },
    {
        code: constants.exe_codes.web, // web scraper hack
        execute: (user, server, message, args) => {
            return utils.openPort(args, server, message.channel, message.author.id, "web", "Web Server"); 
        }
    },
    {
        code: constants.exe_codes.eliteporthack, // elite port hack, hacks everything regardless of open ports
        execute: (user, server, message, args) => {
            const openedPorts = stateMachine.getState(message.author.id, 'openedPorts');
            stateMachine.setState(message.author.id, "loginState", {
                serverIp: server.ip,
                user: server.credentials.user,
                pass: server.credentials.pass
            });

            user.keychain.push({
                ip: server.ip,
                user: server.credentials.user,
                pass: server.credentials.pass
            });
            user.save((err, user) => {
                if (err) {
                    console.error(err);
                    return message.channel.send(embedUtils.sendError("Could not save your user data! :("));
                }
            });
            return message.channel.send({
                embed: {
                    title: "Admin username and password acquired! They've been added to your keychain.",
                    description: `You've been automatically logged in.\n\nUsername: \`${server.credentials.user}\`
                    Password: \`${"*".repeat(server.credentials.user.length)}\``,
                    color: constants.embed_colors.success
                }
            });
        }
    },
    {
        code: constants.exe_codes.fbikill, // deletes fbi server, disconnects user and completes quest
        execute: async (user, server, message, args) => {
            
            // delete fbi server
            let result = await db.serverModel.deleteMany({ip: user.questServerList.fbimain});

            if (result.deletedCount === 0) {
                return message.channel.send(embedUtils.sendError("Server has not been killed"));
            }

            // disconnect server
            const connectedServer = stateMachine.getState(message.author.id, "connectedServer");
            stateMachine.clearState(message.author.id, "connectedServer");
            message.channel.send(embedUtils.sendInfo(`Disconnected: ${connectedServer}`));

            await questUtils.endQuest(user, quests.questList[user.activeQuest], message.channel);
            return message.channel.send(embedUtils.sendSuccess("Server killed"));
        }
    },
    {
        code: constants.exe_codes.endowner, // triggers circl ending: owner
        execute: async (user, server, message, args) => {
            let sentMessage = await message.channel.send("```\nAttempting to change ownership...\n```");

            let messages = [
                "Attempting to change ownership... Denied\nERROR 403: Unauthorised",
                "Attempting to change ownership... Denied\nERROR 403: Unauthorised\nBlocking ownership change attempt...",
                "Attempting to change ownership... Denied\nERROR 403: Unauthorised\nBlocking ownership change attempt... Blocked"
            ]

            for (let i = 0; i < messages.length; i++) {
                setTimeout(() => {
                    sentMessage.edit(`\`\`\`\n${messages[i]}\n\`\`\``);
                }, 2000 * (i + 1));
            }

            user.blocked = true;
            await user.save();
            achievements.unlockAchievement(message.channel, message.author.id, "the-end");
        }
    },
    {
        code: constants.exe_codes.enddelete, // triggers circl ending: delete
        execute: async (user, server, message, args) => {
            let sentMessage = await message.channel.send("```\nAttempting to delete circl...\n```");

            let messages = [
                "Attempting to delete circl...\n  -  Deleting users...\n  -  Deleting servers...\n  -  Deleting infrastructure...",
                "Attempting to delete circl...\n  -  Deleting users: Succeeded!\n  -  Deleting servers...\n  -  Deleting infrastructure...",
                "Attempting to delete circl...\n  -  Deleting users: Succeeded!\n  -  Deleting servers: Succeeded!\n  -  Deleting infrastructure...",
                "Attempting to delete circl...\n  -  Deleting users: Succeeded!\n  -  Deleting servers: Succeeded!\n  -  Deleting infrastructure: Succeeded!",
                "Attempting to delete circl: Succeeded!!",
            ]

            for (let i = 0; i < messages.length; i++) {
                setTimeout(() => {
                    sentMessage.edit(`\`\`\`\n${messages[i]}\n\`\`\``);
                }, 2000 * (i + 1));
            }

            user.deleted = true;
            await user.save();
            achievements.unlockAchievement(message.channel, message.author.id, "the-end");
        }
    }
];