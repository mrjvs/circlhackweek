const constants = require('./constants.js');
const embedUtils = require('./utils/embedutils.js');

const teams = {
    nice: {
        name: "Nice people",
        description: "this is a description of a team nice",
        quests: [
            6,
            7,
            8,
            9,
            10
        ]
    },
    bad: {
        name: "Bad hackers",
        description: "this is a description of a team bad",
        quests: [
            8,
            9
        ]
    },
    prank: {
        name: "Pranksters",
        description: "this is a description of a team prank",
        quests: []
    },
    circl: {
        name: "Circl Main Team",
        description: "haha yes",
        quests: []
    }
}

const newUserFS = [
    {
        type: "dir",
        name: "logs",
        contents: [

        ]
    },
    {
        type: "dir",
        name: "bin",
        contents: [
            {
                type: "file",
                name: "porthack.exe",
                contents: constants.exe_codes.porthack
            }
        ]
    },
    {
        type: "dir",
        name: "home",
        contents: [
            {
                type: "file",
                name: "welcome.txt",
                contents: "I hope you enjoy your time here!"
            },
            {
                type: "file",
                name: "newtools.txt",
                contents: "get it here: ^tutorial2^"
            }
        ]
    },
    {
        type: "dir",
        name: "sys",
        contents: []
    }
];

/*
* file system notation:
* {
*   `/bin/porthack.exe`: "RUN1", // dir is automatically built
*   `/sys`: false, // false means its an empty dir
*   `/home/welcome_to_circl.txt`: "Hi :)"
* }
*/

const questServers = {
    "p0server": {
        name: "Node-006",
        fileSystem: {},
        ports: {
            requiredAmount: 7,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 27017, portType: "mongodb" }
            ]
        }
    },
    "tutorial1": {
        name: "SoftwareBytes inc.",
        fileSystem: {
            "/bin/sticky_notes.exe": constants.exe_codes.sticky,
            "/bin/javaw.exe": constants.exe_codes.java,
            "/home/new_file.txt": "",
            "/home/new_file(2).txt": "cool games: \n - Celeste\n - Hollow knight (Can't wait for the sequel)",
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false",
            "/logs/removed_file.txt": "IP has deleted file"
        },
        ports: {
            requiredAmount: 0,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        }
    },
    "tutorial2": {
        name: "ConsumeByte's pc",
        fileSystem: {
            "/bin": false,
            "/home/readme.txt": "In case you're reading this, you've hacked my pc. Could you please not? kthxbye.",
            "/home/secret/secret.txt": "SWYgeW91IHRyaWVkIGZpbmRpbmcgYSBzZWNyZXQuIHlvdSd2ZSBmYWlsZWQu",
            "/sys/node_modules/index.js": "const sys = require('linux');\nsys.boot();",
            "/logs": false,
        },
        ports: {
            requiredAmount: 0,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        },
        linked: [
            "tutorial3"
        ]
    },
    "tutorial3": {
        name: "ConsumeByte's build server",
        fileSystem: {
            "/bin/sshcrack.exe": constants.exe_codes.ssh,
            "/home/build-b0.1.5.bin": "0100000101110010011100100110000101111001011100110010000001110011011101000110000101110010011101000010000001100001011101000010000000110001",
            "/sys/makefile": "/*how do makefiles work?*/",
            "/logs": false,
        },
        ports: {
            requiredAmount: 0,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" }
            ]
        }
    },
    "p1pc": {
        name: "DESKTOP-77",
        fileSystem: {
            "/bin": false,
            "/home/hey.txt": "Download this file if you want me to contact you. Cya soon.",
            "/sys": false,
            "/logs": false,
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" }
            ]
        }
    },
    "datasell": {
        name: "DoxAnalytics Inc. Webserver",
        type: "web",
        fileSystem: {
            "/bin": false,
            "/home/hey.txt": "Download this file if you want me to contact you. Cya soon.",
            "/sys": false,
            "/logs": false,
            "/public/index.html": `<h1>Do you need someone doxxed?</h1>
            <p>You've come to the right place! We will dox anyone for the right price!<br>Don't wait and get your dox now, Starting at $99.99</p>`,
            "/public/leaks.html": `<p><b>$2010</b> - billGates42@geezmail.com - HitchhikersGuide101</p>
            <p><b>$205</b> - rapheal@geezmail.com - ShoesShoesShoesShoppingShoppingShopping</p>
            <p><b>$4299</b> - root@geezmail.com - admin</p>
            <p><b>$310</b> - JackJohnson@geezmail.com - aFdj52b</p>
            <p><b>$???</b> - retronixcontact@gmail.com - <b>Password not found yet</b></p>`,
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" },
                { portNumber: 80, portType: "web" }
            ]
        }
    },
    "datasold": {
        name: "Jason's PC",
        fileSystem: {
            "/bin/runescape.exe": constants.exe_codes.runescape,
            "/home/leaked.txt": "JackJohnson@geezmail.com - aFdj52b",
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false",
            "/logs": false
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" },
                { portNumber: 80, portType: "web" }
            ]
        }
    },
    "teamtest": {
        name: "Team join application",
        fileSystem: {
            "/bin/javaw.exe": constants.exe_codes.java,
            "/home/scrubs.txt": "I'm better than all of you, I've hacked the matrix!!1!1!!1",
            "/home/RE-scrubs.txt": "Can admins clean this up please?",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/sys/boot.sh": "rm -rf *",
            "/logs": false
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        },
        linked: [
            "teamtest2"
        ]
    },
    "teamtest2": {
        name: "Node-007",
        fileSystem: {
            "/bin/sshcrack.exe": constants.exe_codes.ssh,
            "/bin/webscraper.exe": constants.exe_codes.web,
            "/bin/javaw.exe": constants.exe_codes.java,
            "/home/comehere/yeshere/no.txt": "Wrong way",
            "/home/comehere/nothere/hahaitshere/empty.txt": "This server was empty so I thought I'd add something.",
            "/home/RE-scrubs.txt": "Can admins clean this up please?",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/logs": false
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        },
        linked: [
            "teamtest",
            "teamtestfinal"
        ]
    },
    "teamtestfinal": {
        name: "Node-009",
        fileSystem: {
            "/bin/clock.exe": constants.exe_codes.clock,
            "/home/downloadthis.txt": "download this file to continue",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/logs": false
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 80, portType: "web" }
            ]
        },
        linked: [
            "teamtest2"
        ]
    },
    "discordmain": {
        name: "Discord website",
        fileSystem: {
            "/bin/clock.exe": constants.exe_codes.clock,
            "/bin/javaw.exe": constants.exe_codes.java,
            "/bin/electron.exe": constants.exe_codes.electron,
            "/home/bots/dyno.txt": "Can we ban dyno at some point? I really don't like the bot.",
            "/home/bots/mee6.txt": "That god damn mee6 face is haunting me. I see it in my nightmares. PLEASE HELP ME!!!1!",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/logs": false
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 80, portType: "web" },
                { portNumber: 27017, portType: "mongodb" },
                { portNumber: 22, portType: "ftp" }
            ]
        },
        linked: [
            "discordmedia"
        ]
    },
    "discordmedia": {
        name: "Discord Media Server",
        type: "web",
        fileSystem: {
            "/bin/minecraft_server.exe": constants.exe_codes.mc,
            "/bin/bukkit.jar": constants.exe_codes.bukkit,
            "/home/mc.txt": "I made this an mc server. Join it!",
            "/home/RE-mc.txt": "Sysadmins didn't like it. sorry but its down :/",
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
            "/logs/disabled_logs.txt": "Since discord got so popular the logs started piling. I know its bad practice but I've removed the logs and disabled the creation of them. sorry XX",
            "/public/img/personal_info.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABeUlEQVR4nO3WS26DMABAQY7Wq/Xk6bZSCV8HHtUsnhQBsR2PgEyvr++XOk13L0BA0gGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSTWEJBpmv707pq17249tzb/7+uXjs+NdWbMDMjSsS2f5zZkyzxLx8/McXTMfwdy5AceHWfvHfJujEfdIVuwRjyy1ta395E1Ev5RICPO7d2MK9d2G8jRF+eIzVr7M7E0xxV3zy0ge7A+AbJnbWfnf+RLfcuGzIEtYR6Zf2mcK9Z2C4jGBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFhAYgGJBSQWkFg/iXYcZ3DfGs4AAAAASUVORK5CYII="
        },
        ports: {
            requiredAmount: 0,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 80, portType: "web" },
                { portNumber: 22, portType: "ftp" },
                { portNumber: 25565, portType: "mc"}
            ]
        }
    },
    "localcity": {
        name: "Network - Netherlands - Nijmegen",
        fileSystem: {
            "/bin/sshcrack.exe": constants.exe_codes.ssh,
            "/bin/clock.exe": constants.exe_codes.clock,
            "/home/events.txt": "upcoming events:\n - food festival\n - loud music concert (in progress)\n - Ask for money against illegal studenthousing (Can we not just kill them?)",
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false",
            "/logs": false
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 80, portType: "web" }
            ]
        },
        linked: [
            "localcitymusic"
        ]
    },
    "localcitymusic": {
        name: "music concert network",
        fileSystem: {
            "/bin/clock.exe": constants.exe_codes.clock,
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: true",
            "/recycle_bin/file.txt": "locations:\n - main place: music podium\n - north of main: drug exchange",
            "/logs": false
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        },
        linked: [
            "localcityspeakers"
        ]
    },
    "localcityspeakers": {
        name: "music concert - speakers",
        fileSystem: {
            "/bin/windows_media_player.exe": constants.exe_codes.media,
            "/home/speakers.config": "volume: 99",
            "/home/speakers.bin": "0110101001100101011100110111010101110011001000000110001101101000011100100110100101110011011101000010000001110100011010000110100101110011001000000110110101110101011100110110100101100011001000000110100101110011001000000111010001101111011011110010000001101100011011110111010101100100",
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false",
            "/logs": false
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 80, portType: "web" }
            ]
        }
    },
    "networkrouter": {
        name: "Home network - 63C",
        fileSystem: {
            "/bin/clock.exe": constants.exe_codes.clock,
            "/bin/runescape.exe": constants.exe_codes.runescape,
            "/bin/ftpoverload.exe": constants.exe_codes.ftp,
            "/home": false,
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false",
            "/logs/connection_logs.txt": "> connection 35 registered\n> connection 35 disconnected\n> connection 23 registered\n> connection 74 registered\n> NETWORK ABUSE DETECTED: ^networkabuser^\n> NETWORK ABUSE DETECTED: ^networkabuser^\n> NETWORK ABUSE DETECTED: ^networkabuser^" 
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 80, portType: "web" }
            ]
        }
    },
    "networkabuser": {
        name: "Jason's desktop pc",
        fileSystem: {
            "/bin/deluge.exe": constants.exe_codes.deluge,
            "/home/homework/encrypted.mp4": "0101010001101000011010010111001100100000011010010111001100100000011000010010000001100011011010000111001001101001011100110111010001101001011000010110111000100000011000100110111101110100",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/sys/speed.config": "speed=99999",
            "/logs": false
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" }
            ]
        }
    },
    "drugwebsite": {
        name: "Big Ken Drugs",
        type: "web",
        fileSystem: {
            "/bin/dontdodrugs.exe": constants.exe_codes.drugs,
            "/bin/sqlinject.exe": constants.exe_codes.sql,
            "/home/email-list.txt": "drug partners (don't delete, its essential):\n - mark5524@geezmail.com\n - jason2436@geezmail.com\n - bigken@geezmail.com",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/logs": false,
            "/public/index.html": `<h1 color="red">Big Ken Drugs</h1><p>Contact bigken@geezmail.com and we'll come find you</p>`,
            "/public/busted.html": `<h1 color="red">If you bust us to the police I will make sure you won't be alive to tell the tale</h1>`
        },
        ports: {
            requiredAmount: 3,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" },
                { portNumber: 80, portType: "web"},
                { portNumber: 27017, portType: "mongodb"}
            ]
        }
    },
    "hospital": {
        name: "Hospital Florida",
        fileSystem: {
            "/bin/dontdodrugs.exe": constants.exe_codes.drugs,
            "/bin/sqlinject.exe": constants.exe_codes.sql,
            "/bin/clock.exe": constants.exe_codes.clock,
            "/home/exploit.txt": "to all sysadmins: Someone has reported an exploit that makes remote access to machinery possible. FIND THIS ASAP!\n - June 21 2019",
            "/home/blog/ducks.txt": "I saw a whole bunch of red ducks today. They were moving around like they were drunk and we're quacking about making minecraft videos",
            "/sys/ubuntu.bin": "01101000011011110111011100100000011101000110111100100000011001010111100001101001011101000010000001110110011010010110110100111111",
            "/logs": false,
        },
        ports: {
            requiredAmount: 4,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 22, portType: "ftp" },
                { portNumber: 80, portType: "web"},
                { portNumber: 1433, portType: "sql"}
            ]
        },
        linked: [
            "hospitalfiles",
            "hospitalsecurity",
            "hospitalbrainscan"
        ]
    },
    "hospitalfiles": {
        name: "Hospital Florida - Files",
        fileSystem: {
            "/home/moved.txt": "Server unused, It's been moved to a 3rd party",
            "/logs": false,
            "/sys": false,
            "/bin": false,
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 1433, portType: "sql"}
            ]
        }
    },
    "hospitalsecurity": {
        name: "Hospital Florida - Files",
        fileSystem: {
            "/home/moved.txt": "Server unused, It's been moved to a 3rd party",
            "/logs/recordings.bin": "0101010001101000011010010111001100100000011100110110010101100011011101010111001001101001011101000111100100100000011100110110010101110010011101100110010101110010001000000110100101110011011011100010011101110100001000000111011001100101011100100111100100100000011100110110010101100011011101010111001001100101001000000011101000101111",
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
            "/bin": false,
        },
        ports: {
            requiredAmount: 0,
            portList: [
                { portNumber: 21, portType: "ssh"}
            ]
        }
    },
    "hospitalbrainscan": {
        name: "Hospital Florida - Brain scan",
        fileSystem: {
            "/bin/scan.exe": constants.exe_codes.scan,
            "/bin/worm.exe": constants.exe_codes.worm,
            "/home/scans": false,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
            "/logs": false,
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 1433, portType: "sql"},
                { portNumber: 22, portType: "ftp"}
            ]
        }
    }
}

const questList = [
    { // quest 0
        name: "First steps",
        start: {
            text: "Hey welcome to the hacking mailing group on geezmail! My name's Kathy! I was told you would be able to " + 
            "help me? Could you please wipe the logs of the attached server, I *really* don't" + 
            "want my boss to find out I deleted records from his private server...",
            linkedServerKey: "tutorial1",
            // TODO teach hacking, file system navigation, rm files
            tutorial: embedUtils.sendTutorialBasics
        },
        end: {
            text: 'Hey thanks, I left that there by accident! I was sloppy...',
            condition: {
                type: "delete",
                value: questServers.tutorial1.fileSystem["/logs/removed_file.txt"],
                server: "tutorial1"
            },
            next: {
                type: "quest",
                value: 1
            }
        }
    },
    { // quest 1 - get sshcrack
        name: "Tool up",
        start: {
            text: "Since you're new to the system, as a thank you for deleting my logs, I've dropped an IP to a tools server " +
            "into your home directory. Connect up to it and grab whatever you need!",
            tutorial: embedUtils.sendTutorialBasics2
        },
        end: {
            text: "Thanks again!",
            condition: {
                type: "present",
                value: constants.exe_codes.ssh,
                server: "LOCAL"
            },
            next: {
                type: "quest",
                value: 2
            }
        }
    },
    { // quest 2
        name: "Networking",
        start: {
            text: "I'm sending you the IP for a guy who was looking for hackers like you. Good luck!",
            linkedServerKey: "p1pc"
        },
        end: {
            text: "Hopefully this should keep you in work.",
            condition: {
                type: "download",
                server: "p1pc"
            },
            next: {
                type: "quest",
                value: 3
            }
        }
    },
    { // quest 3
        name: "Privacy protection",
        start: {
            text: "So you managed to find my contact detail eh? Well I need a task doing... I need you to take down a website hosted " +
            "on the server I am providing. Knock yourself out and do whatever you want with it as long as the `leaks.html` file gets deleted",
            linkedServerKey: "datasell"
        }, 
        end: {
            text: "Like it or not, you've done a good deed! Those people would've handed those emails out to god knows who!",
            condition: {
                type: "delete",
                value: questServers.datasell.fileSystem["/public/leaks.html"],
                server: "datasell"
            },
            next: {
                type: "quest",
                value: 4
            }
        }
    },
    { // quest 4
        name: "Privacy protection v2",
        start: {
            text: "While you were wiping the leaks, those good-for-nothing data sellers sold my buddies data to a doxxer down in Cambridge! " +
            "I managed to grab his IP, could you connect and make sure the leak is dealt with?",
            linkedServerKey: "datasold"
        },
        end: {
            text: "Thanks for that!",
            condition: {
                type: "delete",
                value: questServers.datasold.fileSystem["/home/leaked.txt"],
                server: "datasold"
            },
            next: {
                type: "quest",
                value: 5
            }
        }
    },
    { // quest 5 - get webscraper
        name: "Team up",
        start: {
            text: "You seem quite good at hacking! Why don't you join up for a team? I've attached the IP for a initiation test " +
            "for a hacking network called Circl; it should be your cup of tea!",
            linkedServerKey: "teamtest"
        },
        end: {
            text: "Good luck! Make your choice wisely",
            condition: {
                type: "download",
                value: questServers.teamtestfinal.fileSystem["/home/downloadthis.txt"],
                server: "teamtestfinal"
            },
            next: {
                type: "team",
                value: [
                    "nice",
                    "bad",
                    "prank"
                ]
            },
            tutorial: embedUtils.sendTutorialTeam
        }
    },
    { // quest 6 - TEAM nice
        name: "discord dox",
        description: "Hack Discord’s media server (CDN) to remove an image containing personal information.",
        start: {
            text: "Hey! I was playing some games with some strangers and they found a picture of me on one of my social media accounts. They uploaded it to Discord and it’s circlating! Could you delete it for me?",
            linkedServerKey: "discordmain"
        },
        end: {
            text: "Thanks so much! I felt really unhappy with that image circulating, I really appreciate you getting rid of it for me.",
            condition: {
                type: "delete",
                value: questServers.discordmedia.fileSystem["/public/img/personal_info.png"],
                server: "discordmedia"

            }
        }
    },
    { // quest 7 - TEAM nice
        name: "too loud",
        description: "Hack the media controller for an outdoor concert. They’re playing music too loud, and disturbing local residents.",
        start: {
            text: "Hello. I’m trying to get my kids to sleep but there’s a big concert going on outside - it’s too loud! There should be a config file on the speaker server; setting the volume to `3` should do it!",
            linkedServerKey: "localcity"
        },
        end: {
            text: "Thanks! My kids will be able to sleep now...",
            condition: {
                type: "change",
                file: "/home/speakers.config",
                newvalue: "volume: 3",
                server: "localcityspeakers"

            }
        }
    },
    { // quest 8 - TEAM nice - gets ftp hack
        name: "network abuse",
        description: "Run a network scan and locate a user who’s abusing their home network. Limit their internet speed to 10mbps to stop abuse.",
        start: {
            text: "Hey there. I’m trying to watch a movie but it’s being super slow. Can you connect to my router and scan the network for anybody who is abusing the network? If you limit their speed to 10mbps, that should let me watch my movie in peace!",
            linkedServerKey: "networkrouter"
        },
        end: {
            text: "You managed to find them? Thanks so much! Now I can watch the movie in glorious 8K",
            condition: {
                type: "change",
                file: "/sys/speed.config",
                newvalue: "speed=10",
                server: "networkabuser"
            }
        }
    },
    { // quest 9 - TEAM nice - gets sql hack
        name: "dont do drugs, kids",
        description: "Find the mailing list for a drug drug distributor; use it to shut them down.",
        start: {
            text: "Hi there. A few of my friends from school have gotten addicted to drugs, and I know where they’re getting their stuff from. I’m sending you the IP for a server containing the dark web site, can you shut it down? They all get contacted via a mailing list, if you get rid of that then it should be all good!",
            linkedServerKey: "drugwebsite"
        },
        required: [
            6,
            7,
            8
        ],
        end: {
            text: "Thank you! My friends won’t have anywhere to get their stuff easily now, they’ll hang out like they used to :D",
            condition: {
                type: "delete",
                value: questServers.drugwebsite.fileSystem["/home/mail-list.txt"],
                server: "drugwebsite"
            }
        }
    },
    { // quest 10 - TEAM nice - gives circl invite
        name: "worm exploit",
        description: "There’s been an exploited vulnerability on important hospital servers! Find and remove the worm from the server to stop information from being extracted and sold.",
        start: {
            text: "Hey, I have a friend in the hospital at the moment so I was really worried when I heard there was a worm on the hospitals servers! I really don't want anything to happen to her data so could you stop this before it goes too far?",
            linkedServerKey: "hospitalwebsite"
        },
        required: [
            9
        ],
        end: {
            text: "Thanks, her information is safe now",
            condition: {
                type: "delete",
                value: questServers.drugwebsite.fileSystem["/bin/worm.exe"],
                server: "hospitalbrainscan"
            },
            next: {
                type: "team",
                value: ["circl"]
            }
        }
    }
];

module.exports = {
    newUserFS,
    questList,
    questServers,
    teams
}