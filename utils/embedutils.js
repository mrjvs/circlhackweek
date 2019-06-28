const constants = require("../constants.js");

function sendError(errorText) {
    return {
        embed: {
            color: constants.embed_colors.error,
            description: errorText
        }
    }
}

function sendInfo(infoText) {
    return {
        embed: {
            color: constants.embed_colors.info,
            description: infoText
        }
    }
}

function sendSuccess(successText) {
    return {
        embed: {
            color: constants.embed_colors.success,
            description: successText
        }
    }
}

function sendTutorialBasics() {
    return {
        embed: {
            color: constants.embed_colors.pink,
            title: "Basic Training",
            description: "Welcome! To help get you started, we've put together this small guide to help you through the basics!",
            fields: [
                {
                    name: "File system",
                    value: "Our system emulates a file system on a normal computer. This means that in order to complete tasks, you may have " + 
                    "to move around and modify the file system. Just like a Linux computer, you can use `$ls` and `$cd` to list the files" +
                    "and change the directory you are currently in. You can also use `$rm` to remove files and `$cat` to view the contents of files."
                },
                {
                    name: "Server",
                    value: "To complete quests, you will have to move around different servers. You will be given an IP address if you need to connect to a server. " +
                    "To connect to a server, you will need to use the `$connect` command along with the IP to connect to. When you are connected to a server," +
                    "you will need to use `$login` to gain access to the server itself. `$login` will automatically use your keychain to login if you have " +
                    "logged on before. Some servers will need hacking to get into. You can use the `$probe` command to see if the server if suitable to hack." +
                    "If it is suitable, you can use `$porthack` to get in! You can also use the `$serverlist` command to list all previous servers you have connected to."
                },
                {
                    name: "Meta",
                    value: "If you get stuck at any point, you can use `$help` to list the different commands. You can also use `$help <command>` to get more detailed information " +
                    "about a command. To view your current quest, use `$quest` and to submit a quest use `$quest submit`. \n**Good luck!**"
                }
            ]            
        }
    }
}

function sendTutorialBasics2() {
    // local server, bin folder exec, exec, scan, nano, scp
    return {
        embed: {
            color: constants.embed_colors.pink,
            title: "Learning your craft",
            description: "Back for more? Let's teach you the good stuff this time!",
            fields: [
                {
                    name: "Localhost",
                    value: "So you may or may not have noticed but you have a local server! Go ahead and try to connect to it using `$connect localhost`. " +
                    "You will be able to login automatically to your server using `$login`. The most important folder on your local server is the `/bin` folder " + 
                    "which contains all the executables for you to use! Any executable (Ending with .exe) inside `/bin` will be able to be ran as a normal command. " +
                    "For example, the file `/bin/porthack.exe` can be run on any server by using `$porthack`. Notice how the extension isn't used? If you want to execute " + 
                    "a file that is not inside your `/bin` folder, you can use the `$exec` command."
                }, 
                {
                    name: "Servers v2",
                    value: "Sometimes, the IP you are given isn't the target! If this is the case, you are able to use `$scan` to aquire any servers attached to the " +
                    "connected server. Make sure to poke around any server you connect to; especially the `/bin` folder! You can use the `$scp` command to download anything " +
                    "of interest. For your convenience, `.exe` files will download direct to your person `/bin` folder allowing you to use the program! You can also use the " +
                    "`$nano` command to edit any files. Due to a budget cut, the design time wasn't about to make a full editor so you'll have to cope with command line editing! " +
                    "Make sure not to edit any executable files you want to keep, they won't work if you change the code!"  
                }
            ]
        }
    }
}

function sendTutorialTeam() {
    // team choose, team quest, team listquests
    return {
        embed: {
            color: constants.embed_colors.pink,
            title: "Teams",
            description: "Teams work a little differently to normal quests. Instead of progressing through quests one by one, you can pick " +
            "and choose which ones you want to do. Some quests are just standalone but others require you to complete past quests to unlock them.\n",
            fields: [
                {
                    name: "Joining a team",
                    value: "To pick a team, check which teams you have been invited to by using `$team invites` and join the one you would like with `$team choose <team>`. Once you choose, " +
                    "there is no going back!"
                },
                {
                    name: "Choosing a quest",
                    value: "You can lists what quests are available to you using `$team listquests`. The locked quests will have `???` as their name, you can't pick these until you have done other " + 
                    "quests. Choose a quest by using `$team quest <id>`!"
                }
            ]
            
        }
    }
}


module.exports = {
    sendError,
    sendInfo,
    sendSuccess,
    sendTutorialBasics,
    sendTutorialBasics2,
    sendTutorialTeam
}