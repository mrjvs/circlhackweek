const constants = require('./constants.js');
const embedUtils = require('./utils/embedutils.js');

const teams = {
    nice: {
        name: "White hat hackers",
        description: "The people who do good things for humanity",
        quests: [
            6,
            7,
            8,
            9,
            10
        ]
    },
    bad: {
        name: "Black crows",
        description: "What do think this is?",
        quests: [
            11,
            12,
            13,
            14,
            15
        ]
    },
    circl: {
        name: "Circl Main Team",
        description: "Time to take down the big guys",
        quests: [
            21,
            22,
            23,
            24,
            25
        ]
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
        fileSystem: {
            "/home/haha.txt": "So in the end you finally still decided to hack me?\nThats quite funny tbh. I knew from the start that you would be able to defeat circl and I really hoped you would. So thanks in advance :)"
        },
        ports: {
            requiredAmount: 7,
            portList: [
                { portNumber: 21, portType: "ssh" },
                { portNumber: 27017, portType: "mongodb" }
            ]
        },
        linked: [
            "circlstaff"
        ]
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
            "/logs/removed_file.txt": "^p0server^ has deleted file"
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
        name: "Hospital Florida - Security",
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
    },
    "circlmediaproxy": {
        name: "Circl - Media Proxy",
        fileSystem: {
            "/bin/runescape.exe": constants.exe_codes.runescape,
            "/bin/javaw.exe": constants.exe_codes.java,
            "/logs": false,
            "/home/collecting_data.txt": "This is the best way to collect data ever :D. Many hackers are on this network trying to become better hackers and they all basically give their data for free xD",
            "/home/passwords": false,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
            "/proxy/program.bin": "0100001101001001010100100100001101001100001000000100110101000101010001000100100101000001001000000101000001010010010011110101100001011001001000000010111000101110011001100111001100110100001011100010111001100110010100110011010100110011001011100010111001110011"
        },
        ports: {
            requiredAmount: 4,
            portList: [
                { portNumber: 1433, portType: "sql"},
                { portNumber: 22, portType: "ftp"},
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"}
            ]
        }
    },
    "circlbackupweb": {
        name: "Circl - Backup webserver",
        type: "web",
        fileSystem: {
            "/bin/circl_tracker.exe": constants.exe_codes.tracker,
            "/bin/javaw.exe": constants.exe_codes.java,
            "/logs/manual_tracker_placement": "Manually planted tracker on ^networkabuser^",
            "/home/circl_history.txt": "Circl was orginally made to be a social media for hackers but lowkey turned into a dataseller lol",
            "/home/RE-circl_history.txt": "Are you planning on posting random facts on every server?? Quit it man.",
            "/home/RE-RE-circl_history.txt": "fuck off",
            "/home/other/forgodsake.txt": "You guys are supposed to know the ip to the router. here it is and dont bother me again: ^circlrouter^",
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
            "/public/index.html": "<h1>Circl hacking network</h1><p>Invite only</p>",
        },
        ports: {
            requiredAmount: 4,
            portList: [
                { portNumber: 1433, portType: "sql"},
                { portNumber: 22, portType: "ftp"},
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"}
            ]
        }
    },
    "circlrouter": {
        name: "Circl - Staff Router",
        fileSystem: {
            "/bin/run.exe": constants.exe_codes.run,
            "/log": false,
            "/sys/firewall.rules": "whitelist:\n    local.*\n\nreverse_proxy: true",
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"}
            ]
        }
    },
    "circldocs": {
        name: "Circl - Documentation",
        fileSystem: {
            "/bin/sticky_notes.exe": constants.exe_codes.sticky,
            "/bin/mongodbcorrupt.exe": constants.exe_codes.mongo,
            "/log/blog.txt": "This server is to document the entirety of the code. but they moved everything to the code itself so this server is now empty. :(",
            "/sys/boot.sh": "cd *",
            "/home": false,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100",
        },
        ports: {
            requiredAmount: 3,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 1433, portType: "sql"},
                { portNumber: 22, portType: "ftp"}
            ]
        },
        linked: [
            "circlstaff"
        ]
    },
    "circlstaff": {
        name: "Circl - Staff Network",
        fileSystem: {
            "/bin/eliteporthack.exe": constants.exe_codes.eliteporthack,
            "/home/about_eliteporthack.txt": "Elite porthack is a special tool developed for Circl Staff, It can hack any server. Use it with caution.",
            "/home/slack/introduction.txt": "Hey guys, I'm now a part of your team :). I hope we can become a great cohesive bundle of amazing people xD. Contact me if wanna chat!\n\n    - Tressa",
            "/home/slack/RE-introduction.txt": "Go fuck yourself",
            "/home/slack/RE-RE-introduction.txt": "Uhm, I thought this was a nice team? I think I am misinformed\n\n    - tressa",
            "/home/slack/RE-RE-RE-introduction.txt": "Look, we are a bunch of nerds doing remote jobs for this. Don't expect nice people, We are all introverts anyway. Now bugger off.",
            "/home/slack/RE-RE-RE-RE-introduction.txt": "oh...",
            "/logs": false,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100"
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 27017, portType: "mongodb"}
            ]
        },
        linked: [
            "circlmain"
        ]
    },
    "circlmain": {
        name: "Circl - Main Server",
        fileSystem: {
            "/circl_selfdestruct.exe": constants.exe_codes.enddelete,
            "/circl_change_ownership.exe": constants.exe_codes.endowner,
        },
        ports: {
            requiredAmount: 99,
            portList: [
                { portNumber: 51, portType: "vseg"},
                { portNumber: 6324, portType: "adg"},
                { portNumber: 503, portType: "fsg"},
                { portNumber: 150, portType: "gsdf"},
                { portNumber: 1, portType: "gbs"}
            ]
        }
    },
    "bankwebsite": {
        name: "Bank of England - Website",
        type: "web",
        fileSystem: {
            "/bin/clock.exe": constants.exe_codes.clock,
            "/bin/sticky_notes.exe": constants.exe_codes.sticky,
            "/home/question.txt": "Are we corrupt?",
            "/home/RE-question.txt": "yes",
            "/logs": false,
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false",
            "/public/index.html": "<h1>Bank of england</h1><p>We print money</p>"
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"},
            ]
        },
        linked: [
            "bank"
        ]
    },
    "bank": {
        name: "Back of England - Vault",
        fileSystem: {
            "/bin/generatemoney.exe": constants.exe_codes.money,
            "/home/money.csv": "money, value\n52334,1.00\n87652,2,42",
            "/home/security.txt": "Have you guys thought about improving the security? This is really bad.",
            "/home/RE-security.txt": "No, its fine. Nobody will try to get in.",
            "/logs/changed_money.txt": "52334 = 1.00",
            "/sys/windows.bin": "01001101011000010110001100100000011010010111001100100000011000100110010101110100011101000110010101110010",
            "/sys/desktop.ini": "[desktop]\nbin: false"
        },
        ports: {
            requiredAmount: 0,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 99, portType: "backdoor"}
            ]
        },
    },
    "foodcompany": {
        name: "FoodForU",
        type: "web",
        fileSystem: {
            "/bin/clock.exe": constants.exe_codes.clock,
            "/home/recipes.txt": "Good sushi roll:\nhttps://makemysushi.com/Recipes/how-to-make-spicy-tuna-roll",
            "/logs": false,
            "/public/index.html": 
            `<h1>FoodForU</h1>
            <p>We sell lots of good food!</p>
            <ul>
                <li>Sushi</li>
                <li>Sushi rolls</li>
                <li>Sushi chefs</li>
            </ul>`,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100"
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"},
            ]
        },
    },
    "nsamain": {
        name: "NSA - Mainframe",
        fileSystem: {
            "/bin/sqlbreak.exe": constants.exe_codes.sql,
            "/home/whototrack.txt": "who to track:\n - Criminals\n - Illegal games downloaders\n - People who use light theme on Discord",
            "/logs": false,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100"
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"},
            ]
        },
        linked: [
            "nsadata"
        ]
    },
    "nsadata": {
        name: "NSA - Data Storage",
        fileSystem: {
            "/home/tracked_people.bin": "0100011101101111011011110110010000100000011101000111001001111001001011000010000001110100011010000110010101110010011001010010000001101001011100110010000001101110011011110111010001101000011010010110111001100111001000000110100001100101011100100110010100100000011101000110100001101111",
            "/home/directors.txt": "Osama Bin Laden\nmrjvs\nWilliam Oldham\nDeadlyFire\nJamesHawkinsss\nults"
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 1433, portType: "sql"}
            ]
        },
    },
    "facebooknode": {
        name: "Facebook - Node 001",
        fileSystem: {
            "/home": false,
            "/bin/clock.exe": constants.exe_codes.clock,
            "/logs": false,
            "/sys/debian.bin": "011100110111100101101110011101000110000101111000001000000110010101110010011100100110111101110010001110100010000001110011011110010111001101110100011001010110110101100100001000000110111001101111011101000010000001100100011001010110011001101001011011100110010101100100"
        },
        ports: {
            requiredAmount: 3,
            portList: [
                { portNumber: 1433, portType: "sql"},
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"},
            ]
        },
        linked: [
            "facebookrouter"
        ]
    },
    "facebookrouter": {
        name: "Facebook - Main Router",
        fileSystem: {
            "/bin/ftpoverload.exe": constants.exe_codes.ftp,
            "/logs": false,
            "/home/communities.txt": "communities we need to watch:\nFlat earthers\nAnti-vaxxers\nBinaryOverload fan club",
            "/sys/routeros.bin": "011101000111001001100001011000110110101101101001011011100110011100100000011010010111000001110011001000000110111101100110001000000110010101110110011001010111001001111001011011110110111001100101001000000110000101101110011001000010000001110011011101000110111101110010011010010110111001100111001000000111000001100001011100110111001101110111011011110111001001100100011100110010000001101001011011100010000001110000011011000110000101101001011011100010000001110100011001010111100001110100"
        },
        ports: {
            requiredAmount: 3,
            portList: [
                { portNumber: 1433, portType: "sql"},
                { portNumber: 21, portType: "ssh"},
                { portNumber: 80, portType: "web"},
            ]
        },
        linked: [
            "facebookaccounts"
        ]
    },
    "facebookaccounts": {
        name: "Facebook - Account Storage",
        fileSystem: {
            "/bin/facebook.exe": constants.exe_codes.facebook,
            "/home": false,
            "/logs": false,
            "/storage/user_accounts.db": "0111010001101000011010010111001100100000011010010111001100100000011011100110111101110100001000000111000001101100011000010110100101101110011101000110010101111000011101000010110000100000011000100110010101110100011101000110010101110010001000000111010001101000011000010110111000100000011100100110010101100001011011000010000001100110011000010110001101100101011000100110111101101111011010110010000001001001001000000110011101110101011001010111001101110011"
        },
        ports: {
            requiredAmount: 2,
            portList: [
                { portNumber: 22, portType: "ftp"},
                { portNumber: 21, portType: "ssh"}
            ]
        },
    },
    "fbiwebsite": {
        name: "FBI - Website",
        type: "web",
        fileSystem: {
            "/bin/tracker.exe": constants.exe_codes.tracker,
            "/bin/chess.exe": constants.exe_codes.chess,
            "/home/mentalhealth.txt": "How do we deal with people that are planning suicide?",
            "/home/RE-mentalhealth.txt": "We can't let them find them out that we are watching them so we can't stop them from suicide. Its like the Reichenbach fall episode in Sherlock.",
            "/logs": false,
            "/sys/raspbianjessie.bin": "010001100100001001001001001000000110111101101110001000000111001001100001011100110111000001100010011010010110000101101110001111110011111100100000010101110100100001000001010101000011111100111111",
            "/public/index.html": "<h1>FBI</h1><p>Open up!</p>",
        },
        ports: {
            requiredAmount: 4,
            portList: [
                { portNumber: 22, portType: "ftp"},
                { portNumber: 21, portType: "ssh"},
                { portNumber: 1433, portType: "sql"},
                { portNumber: 80, portType: "web"},
                { portNumber: 99, portType: "backdoor"}
            ]
        },
        linked: [
            "fbimain"
        ]
    },
    "fbimain": {
        name: "FBI - Main Server",
        fileSystem: {
            "/bin/startserver.exe": constants.exe_codes.fbistart,
            "/bin/rebootserver.exe": constants.exe_codes.fbireboot,
            "/bin/killserver.exe": constants.exe_codes.fbikill,
            "/home": false,
            "/logs/Your_package_arrived.txt": "Delivered to coords: 37°14′06″N 115°48′40″W",
            "/sys/raspbianjessie.bin": "010001100100001001001001001000000110111101101110001000000111001001100001011100110111000001100010011010010110000101101110001111110011111100100000010101110100100001000001010101000011111100111111",
        },
        ports: {
            requiredAmount: 3,
            portList: [
                { portNumber: 22, portType: "ftp"},
                { portNumber: 21, portType: "ssh"},
                { portNumber: 1433, portType: "sql"},
                { portNumber: 80, portType: "web"}
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
                    "bad"
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
                newValue: "volume: 3",
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
                newValue: "speed=10",
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
            linkedServerKey: "hospital"
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
    },
    { // quest 11 - team bad
        name: "Money go bye bye",
        description: "Excess money removal",
        start: {
            text: "I was told you would do anything; not caring about consequences. Are you the right person for the job? The bank has too much money. They take everyone's money and store it for themselves! Delete the banks virtual store of money; that should mess them up!",
            linkedServerKey: "bank"
        },
        end: {
            text: "Thanks! Now my ex's money will be all gone. Excellent...",
            condition: {
                type: "delete",
                value: questServers.bank.fileSystem["/home/money.csv"],
                server: "bank"
            }
        }
    }, 
    { // quest 12 - team bad
        name: "Food to go?",
        description: "The client had a fallout with another company, your job is to take down the company's webserver",
        start: {
            text: "Right so, I had a *really bad* falling out with my mate so I want to make him take me seriously. Here's his server, get in and take the website offline!",
            linkedServerKey: "foodcompany"
        },
        end: {
            text: "Thanks for nothing! He's now reported me to the police. Can't believe you hackers sometimes; you never know when to stop!",
            condition: {
                type: "delete",
                value: questServers.foodcompany.fileSystem["/public/index.html"],
                server: "foodcompany"
            }
        }
    },
    { // quest 13 - team bad
        name: "All the data",
        description: "Retrieving data from the NSA; simple enough?",
        start: {
            text: "I need the list of tracked people from the NSA data servers. I think this is the server you need. ",
            linkedServerKey: "nsamain"
        },
        end: {
            text: "GODDAMMIT there was a tracker in the file. I'm meant to be texting my lawyer but instead I wanted to let you know how much you sucked!",
            condition: {
                type: "download",
                server: "nsadata"
            }
        }
    },
    { // quest 14 - team bad
        name: "Employee information",
        description: "Background checking an employee",
        start: {
            text: "My client wants a background check on an employee. Could you download the facebook account database so I can have more information on them? Their profile is set to private...",
            linkedServerKey: "facebooknode"
        },
        required: [
            11,
            12,
            13
        ],
        end: {
            text: "w o a h, it's a good thing you did this. My client will be firing the employee shortly and contacting the police. Good work!",
            condition: {
                type: "download",
                server: "facebookaccounts"
            }
        }
    },
    { // quest 15 - team bad
        name: "Innocent destruction",
        description: "Just shutting down a random server; barely malicious really.",
        start: {
            text: "Hey there, I would like to shutdown this server. Permanently. Can you make it happen?",
            linkedServerKey: "fbiwebsite"
        },
        required: [
            14
        ],
        end: {
            text: "Perfect! Now they won't be able to spy on my basement anymore.",
            next: {
                type: "team",
                value: [
                    "circl"
                ]
            }
        }
    },
    {}, {}, {}, {}, {}, // 16-20 - these were pranksters
    { // quest 21 - team circl - explaination
        name: "We need your help",
        description: "It's best if you read this...",
        start: {
            text: "Circl started off in 2018 as a social network for hackers. It was great and allowed all of us to earn a bit of money on the side while staying completely anonymous. That was until they started to sell our data. " +
            "And not just to anyone. To the government. One by one, we started getting picked off by any agency you can name: FBI, CIA, MI6, SAS. This has continued to this day. I'm writing this from an internet Café with a VPN to make sure " + 
            "I don't fall victim either. You have to finish this once and for all. Delete the network that has caused us all our misery. Without you doing this, the hackers of the world will cease to exist in their current form." +
            "\n\nSubmit this quest and start hacking!"
        },
        end: {
            text: "Good luck, we are relying on you!",
            condition: {
                type: "progress"
            }
        }
    },
    { // quest 22 - team circl - Circl media proxy
        name: "Media disruption",
        description: "Disable Circl's media proxy",
        start: {
            text: "Circl have been disributing dodgy media for years, time to put a stop to that!",
            linkedServerKey: "circlmediaproxy"
        },
        required: [
            21
        ],
        end: {
            text: "You got them, the server is down!",
            condition: {
                type: "delete",
                value: questServers.circlmediaproxy["/proxy/program.bin"],
                server: "circlmediaproxy"
            }
        }
    }, 
    { // quest 23 - team circl - Backup webserver
        name: "Backups? Who needs backups?",
        description: "Disable Circl's backup server to make sure Circl cannot recover from an attack",
        start: {
            text: "Circl definitely don't! Let's make sure that when they go down, they stay down.",
            linkedServerKey: "circlbackupweb"
        },
        required: [
            21
        ],
        end: {
            text: "Good job. Now when their servers die, so will Circl!",
            condition: {
                type: "delete",
                value: questServers.circlbackupweb["/public/index.html"],
                server: "circlbackupweb"
            }
        }
    },
    { // quest 24 - team circl - blacklist internal ips
        name: "\"Accidentally\" locking everyone out",
        description: "Add the staff to the blacklist to keep them out of our business",
        start: {
            text: "Even though most of the staff are on holiday right now, we need to make sure none of them interfer with our fun. Make sure that none of them can connect by editing the firewall config `blacklist: local.*`! You will need to find the IP for the router in another one of Circl's servers. "
        },
        required: [
            21,
            23
        ],
        end: {
            text: "Great; the staff are now permanently locked out of their own system. Looks like they'll have to use their \"hacking skills\" to get back in.",
            condition: {
                type: "change",
                file: "/sys/firewall.rules",
                newValue: "blacklist: local.*",
                server: "circlrouter"
            }
        }
    },
    { // quest 25 - team circl
        name: "The final exe",
        description: "Destroy Circl once and for all!",
        start: {
            text: "Here's the link to the documentation server, you should be able to get to the main server from that. Make sure to run `circl_selfdestruct.exe` to take them down. Don't run anything else!",
            linkedServerKey: "circldocs"
        },
        required: [
            21,
            22,
            23,
            24
        ]
    }
];

module.exports = {
    newUserFS,
    questList,
    questServers,
    teams
}