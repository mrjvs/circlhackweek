![Circl Branding](https://raw.githubusercontent.com/mrjvs/circlhackweek/master/branding/banner.png)

# CirclHackweek 
A Discord bot for circl (a game-bot similar to Hacknet, concept by [@taydev](https://github.com/taydev/circl)) in [Node.js](https://nodejs.org/en/). This is our entry into the Discord Community Hack Week competition.

## Demo
If you want to see this in action, join [this discord server](https://discord.gg/tA6Tq9v);

## features
 - Unix-like navigation
 - Hack servers like a pro
 - Cool storyline with awesome ending
 - 1-2 hours of gameplay
 - Live **actual** webservers (which you can edit if you hack them)
 - Tons of files to explore
 - run `$signup` in any channel/dm to start

## screenshots
<img width="200" alt="screenshot1" src="https://i.imgur.com/1NOwpMd.png">
<img width="200" alt="screenshot2" src="https://i.imgur.com/ZAvJjo5.png">
<img width="200" alt="screenshot3" src="https://i.imgur.com/PTM3QFm.png">


## technical
The bot consists of four main parts. The statemachine, the filesystem, the quests and the scripts.


The statemachine is simple. Its a machine that tracks states. It's used for non permanent information like what server you're connected too or the file path of the current directory. Quite simple stuff but very powerfull.


The filesystem was a bit harder. We decided on a json structure like below. Because this system could get super deep. We made `fileUtils.explorePath()` to recursively convert a path to a file/dir (and returning false if invalid). This made working with files a whole lot easier. With both statemachine and the file system in place, all the commands were just a matter of combining the functions into the command.
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
                contents: "content here'
            }
        ]
    }
]
```


The scripts are quite interesting. The executable files aren't hardcoded to execute code. We made all executables files have the contents defined as a constants and that constant would then run the code defined in `scripts.js`. so technically if you copied the contents of the file on your clipboard. you could beat the game by making a file and copying over the contents of an end-game files.


The quests should of been easy. The idea was to just make a server list and a quest list. quests would have conditions to check if its done or not. The problem was at the file system. With the normal FS notation we made we would have 5 lines for every file/dir. That wasnt going to cut it if we wanted many quests. so we made a shortened file system thats parsed when a user makes an account. If its set to false then its an empty dir. if its set to something then its a file. all directories are made according to the path provided. That shortened the notation by aroudn 90%. much better!
```
[
"/bin": false,
"/home/readme.txt": "In case you're reading this, you've hacked my pc. Could you please not? kthxbye.",
"/home/secret/secret.txt": "SWYgeW91IHRyaWVkIGZpbmRpbmcgYSBzZWNyZXQuIHlvdSd2ZSBmYWlsZWQu",
"/sys/node_modules/index.js": "const sys = require('linux');\nsys.boot();",
"/logs": false
]
```

The quests are all generated per user so you won't interfere with other users. although its possible to give an ip to someone and they finish the quest for you. **That means 38 servers generated per user.**

## Collaboration
We've made everything in vscode live share. Every commit from @mrjvs is actually from all of us. We don't like merge conflicts so the live share thing was the best option.

Check out the official [Discord Hackweek server](https://discord.gg/hackweek) to find out more about the competition.

## Our Team
 - [mrjvs](https://github.com/mrjvs)
 - [BinaryOverload](https://github.com/BinaryOverload)
 - [JamesHawkinss](https://github.com/JamesHawkinss)
 - [DeadlyFirex](https://github.com/DeadlyFirex)
 - [taydev](https://github.com/taydev)

<img width="75" alt="hack_pirate_white" src="https://user-images.githubusercontent.com/40138757/60046101-6c832f00-96be-11e9-9306-4ee307fde1b2.png"> <img width="15"><img width="75" alt="hack_wumpus" src="https://user-images.githubusercontent.com/40138757/60046017-3940a000-96be-11e9-9031-3fbf186a7130.png">