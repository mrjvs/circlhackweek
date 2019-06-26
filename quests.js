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
            },
            {
                type: "file",
                name: "clock.exe",
                contents: constants.exe_codes.clock
            },
            {
                type: "file",
                name: "sqlinject.exe",
                contents: constants.exe_codes.sql
            },
            {
                type: "file",
                name: "sshcrack.exe",
                contents: constants.exe_codes.ssh
            },
            {
                type: "file",
                name: "illegal_hack.exe",
                contents: constants.exe_codes.randomhack
            }
        ]
    },
    {
        type: "dir",
        name: "home",
        contents: [
            {
                type: "file",
                name: "welcome_to_circl.txt",
                contents: "hi :)"
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
        start: {
            text: 'Hey welcome to circl server system. Please delete a log of a server. see linked server',
            linkedServerKey: "tutorial1",
        },
        end: {
            text: 'Hey thanks, I left that there on accident. I was sloppy',
            condition: {
                type: "delete",
                value: "user has deleted file.",
                server: "tutorial1"
            },
            next: {
                type: "quest",
                value: 1
            }
        }
    },
    { // quest 1
        start: {
            text: 'Could you also delete a file named "illegalhack.exe", its somewhere on those servers.',
            linkedServerKey: "tutorial2",
        },
        end: {
            text: 'Hey thanks, That file was a illegal hack.',
            condition: {
                type: "delete",
                value: constants.exe_codes.randomhack,
                server: "tutorial3"
            }
        }
    }
]

const questServers = {
    "tutorial1": {
        name: "Tutorial 1",
        type: 'web',
        fileSystem: {
            "/bin": false,
            "/home": false,
            "/sys": false,
            "/log/removed_file.txt": "user has deleted file.",
            "/public/test/index.html": 
            `
            <style>body,html {background: black; padding: 1em; margin: 0;color: white}</style>
            <h1>Welcome to DogMart™</h1>
            We sell these types of dogs:
            <ul>
                <li>Poodle</li>
                <li>Labradoor</li>
                <li>Golder Ritrivar</li>
            </ul>
            `
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        }
    },
    "tutorial2": {
        name: "Tutorial 2",
        fileSystem: {
            "/bin": false,
            "/home/haha.txt": "Thought you could find the hack here? You're wrong. get rekt.",
            "/home/secret/nope.txt": "Not here either. maybe trying to scan the server.",
            "/sys": false,
            "/log": false,
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        },
        linked: [
            "tutorial3"
        ]
    },
    "tutorial3": {
        name: "Tutorial 3",
        fileSystem: {
            "/bin/illegal_hack.exe": constants.exe_codes.randomhack,
            "/home": false,
            "/sys": false,
            "/log": false,
        },
        ports: {
            requiredAmount: 1,
            portList: [
                { portNumber: 21, portType: "ssh" }
            ]
        }
    }
}

module.exports = {
    newUserFS,
    questList,
    questServers
}