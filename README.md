![Circl Branding](https://raw.githubusercontent.com/mrjvs/circlhackweek/master/branding/banner.png)

# CirclHackweek 
A Discord bot for circl (a game-bot similar to Hacknet, concept by [@taydev](https://github.com/taydev/circl)) in [Node.js](https://nodejs.org/en/). This is our entry for the Discord Community Hack Week competition.

## Demo
If you would like to see this in action, please join [discord server](https://discord.gg/tA6Tq9v);

## Our Team
 - [mrjvs](https://github.com/mrjvs)
 - [BinaryOverload](https://github.com/BinaryOverload)
 - [JamesHawkinss](https://github.com/JamesHawkinss)
 - [DeadlyFirex](https://github.com/DeadlyFirex)
 - [taydev](https://github.com/taydev)

## Features
 - Unix-like navigation
 - Hack servers like a pro
 - Cool storyline with awesome ending
 - 1-2 hours of gameplay
 - Live **actual** webservers (which you can edit if you hack them)
 - Tons of files to explore
 - Run `$signup` in any channel/DM to start

## Screenshots
<img width="2000" alt="screenshot1" src="https://i.imgur.com/1NOwpMd.png">
<img width="2000" alt="screenshot2" src="https://i.imgur.com/ZAvJjo5.png">
<img width="2000" alt="screenshot3" src="https://i.imgur.com/PTM3QFm.png">


## Technical
The bot consists of four main parts. The state machine, the filesystem, the quests and the scripts.


The state machine is simple. It's a machine that tracks states. It's used for non permanent information such as what server you're connected to or the file path of the current directory. Quite simple stuff but very powerful.


The filesystem was a bit harder. We decided on a JSON structure like below. We chose this system because it allowed us to go as deep as we wanted to, and allows us to have much more complex servers. We made `fileUtils.explorePath()` to recursively convert a path to a file/dir (and returning false if invalid). This made working with files a whole lot easier. With both statemachine and the file system in place, all the commands were just a matter of combining the functions into a .js file!

```
[
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
                contents: "content here"
            }
        ]
    }
]
```

The scripts are rather interesting. The executable files aren't hardcoded to execute code. Instead, we made all executable files have the contents defined by a constant and that constant would then run the code defined in `scripts.js`. So technically, if you copied the contents of the file on your clipboard, you could beat the game (by making a file and copying over the contents of an end-game files)!

The quests should have been easy; the idea was to just make a server list, and a quest list. Quests would have conditions to check if the requirements had been completed or not. The problem was with the filesystem - with the normal FS notation we made we would have 5 lines for every file/dir. That wasn't going to cut it if we wanted many quests. so we made a shortened file system that's parsed when a user makes an account. If it's set to false then it's an empty dir. If it's set to something then it's a file. All directories are made according to the path provided. This newly devised system shortened the notation by around 90%. Much better! You can view said notation below:

```
[
"/bin": false,
"/home/readme.txt": "In case you're reading this, you've hacked my pc. Could you please not? kthxbye.",
"/home/secret/secret.txt": "SWYgeW91IHRyaWVkIGZpbmRpbmcgYSBzZWNyZXQuIHlvdSd2ZSBmYWlsZWQu",
"/sys/node_modules/index.js": "const sys = require('linux');\nsys.boot();",
"/logs": false
]
```

The quests are all generated per user so you won't interfere with other users. This said, it is possible to give an IP to someone and they finish the quest for you. **That means 38 servers generated per user.**

## Collaboration
We've made everything in VSCode Live Share. Every commit from @mrjvs is actually from all of us - we don't like merge conflicts so using Live Share was the best option for us.

You can check out the official [Discord Hackweek server](https://discord.gg/hackweek) to find out more about the competition.

<img width="75" alt="hack_pirate_white" src="https://user-images.githubusercontent.com/40138757/60046101-6c832f00-96be-11e9-9306-4ee307fde1b2.png"> <img width="15"><img width="75" alt="hack_wumpus" src="https://user-images.githubusercontent.com/40138757/60046017-3940a000-96be-11e9-9031-3fbf186a7130.png">
