const constants = require('./constants.js');

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
                contents: "get it here: IP"
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

const questList = [
    { // quest 0
        name: "First steps",
        start: {
            text: "Hey welcome to the hacking mailing group on geezmail! My name's Kathy! I was told you would be able to " + 
            "help me? Could you please wipe the logs of the attached server, I *really* don't" + 
            "want my boss to find out I deleted records from his private server...",
            linkedServerKey: "tutorial1",
        },
        end: {
            text: 'Hey thanks, I left that there by accident! I was sloppy...', // change "on" to "by"
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
    { // quest 1
        name: "Tool up",
        start: {
            text: "Since you're new to the system, as a thank you for deleting my logs, why don't you go ahead" +
            "and grab all the tools you need from the attached server!" // file has "tutorial2" ip
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
            text: "TODO",
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
                value: questServers.datasell.fileSystem["/home/leaked.txt"],
                server: "datasold"
            },
            next: {
                type: "quest",
                value: 5
            }
        }
    },
    { // quest 5
        name: "Team up",
        start: {
            text: "You seem quite good at hacking! Why don't you join up for a team? I've attached the IP for a initiation test " +
            "for a hacking network called Circl; it should be your cup of tea!",
            linkedServerKey: "teamtest"
        },
    }
];

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
    }
}

module.exports = {
    newUserFS,
    questList,
    questServers
}